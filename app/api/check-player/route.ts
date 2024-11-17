import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { clientConstants } from '@/config/constants.client';
import { PlayerInfoResponse } from '@/app/schemas/temple-api';
import * as Sentry from '@sentry/nextjs';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    throw new Error('No player provided');
  }

  const playerInfoRequest = await fetch(
    `${clientConstants.temple.baseUrl}/api/player_info.php?player=${player}`,
  );
  const playerInfo: PlayerInfoResponse = await playerInfoRequest.json();
  const shouldCheckPlayer = playerInfo.data['Datapoint Cooldown'] === '-';

  try {
    // If the player has a datapoint cooldown (i.e. a number),
    // this means they have been checked very recently,
    // hence we skip these players entirely to avoid triggering rate limits.
    if (shouldCheckPlayer) {
      // eslint-disable-next-line no-console
      console.log(`Checking ${player}`);

      await fetch(
        `${clientConstants.temple.baseUrl}/php/add_datapoint.php?player=${player}`,
      );
    }

    // Purge the cache to display the latest member data
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false });
  }
}
