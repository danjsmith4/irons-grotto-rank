import 'next-auth/jwt';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Discord, { DiscordProfile } from 'next-auth/providers/discord';
import * as Sentry from '@sentry/nextjs';
import { APIGuild, Routes } from 'discord-api-types/v10';
import { discordUserClient } from './discord';
import { serverConstants } from './config/constants.server';

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Profile extends DiscordProfile {}

  interface User {
    permissions: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  // eslint-disable-next-line no-shadow
  interface JWT {
    id: string;
    permissions: string;
  }
}

export const config = {
  debug: /\*|nextauth/.test(process.env.DEBUG ?? ''),
  callbacks: {
    async signIn({ account }) {
      if (!account?.access_token) {
        throw new Error('Access token not found');
      }

      const { guildId } = serverConstants.discord;

      const userGuildsResponse = (await discordUserClient(
        account.access_token,
      ).get(Routes.userGuilds(), {
        authPrefix: 'Bearer',
      })) as APIGuild[];

      const guild = userGuildsResponse.find(({ id }) => id === guildId);

      if (!guild) {
        throw new Error(
          'You must be a member of Irons Tavern to use this application!',
        );
      }

      return true;
    },
    /* eslint-disable no-param-reassign */
    async jwt({ profile, token, account }) {
      const { guildId } = serverConstants.discord;

      if (profile?.id) {
        token.id = profile.id;
      }

      if (account?.access_token) {
        try {
          const userGuildsResponse = (await discordUserClient(
            account.access_token,
          ).get(Routes.userGuilds(), {
            authPrefix: 'Bearer',
          })) as APIGuild[];

          const { permissions } =
            userGuildsResponse.find(({ id }) => id === guildId) ?? {};

          if (!permissions) {
            throw new Error('No permissions found for user');
          }

          token.permissions = permissions;
        } catch (error) {
          console.error(error);

          Sentry.captureException(error);
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.permissions = token.permissions;

      Sentry.setUser({
        id: token.id,
        username: token.name ?? undefined,
      });

      return session;
    },
  },
  /* eslint-enable no-param-reassign */
  logger: {
    error: (error) => {
      console.error(error);

      Sentry.captureException(error);
    },
  },
  providers: [
    Discord<DiscordProfile>({
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+guilds+guilds.members.read',
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
