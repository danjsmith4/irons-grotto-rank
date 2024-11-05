'use server';

import { userOSRSAccountsKey } from '@/config/redis';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { Player } from '@/types/player';
import { returnValidationErrors } from 'next-safe-action';
import * as Sentry from '@sentry/nextjs';
import { fetchPlayerMeta } from '../../data-sources/fetch-player-meta';
import { fetchTemplePlayerStats } from '../../data-sources/temple-osrs';
import { addPlayerSchema } from './add-player-validation';

async function assertUniquePlayerRecord(userId: string, playerName: string) {
  if (!userId) {
    return false;
  }

  try {
    const count = await redis.hexists(
      userOSRSAccountsKey(userId),
      playerName.toLowerCase(),
    );

    return count === 0;
  } catch (error) {
    Sentry.captureException(error);

    return false;
  }
}

export const addPlayerAction = authActionClient
  .metadata({
    actionName: 'add-player-to-account',
  })
  .schema(addPlayerSchema)
  .action(
    async ({ parsedInput: { joinDate, playerName }, ctx: { userId } }) => {
      const isUsernameUnique = await assertUniquePlayerRecord(
        userId,
        playerName,
      );

      if (!isUsernameUnique) {
        returnValidationErrors(addPlayerSchema, {
          playerName: {
            _errors: ['You have already registered this account'],
          },
        });
      }

      const [playerMeta, playerStats] = await Promise.all([
        fetchPlayerMeta(playerName),
        fetchTemplePlayerStats(playerName, false),
      ]);

      const maybeFormattedPlayerName =
        playerMeta?.rsn ?? playerStats?.info.Username ?? playerName;

      const result = await redis.hsetnx<Player>(
        userOSRSAccountsKey(userId),
        maybeFormattedPlayerName.toLowerCase(),
        {
          joinDate,
          rsn: maybeFormattedPlayerName,
        },
      );

      if (!result) {
        throw new Error('Error creating player account record');
      }

      return {
        playerName,
      };
    },
  );
