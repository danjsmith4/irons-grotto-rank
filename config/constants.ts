export const constants = {
  collectionLogBaseUrl: 'https://api.collectionlog.net' as const,
  publicUrl: process.env.NEXT_PUBLIC_URL,
  zeplo: {
    apiKey: process.env.ZEPLO_API_KEY,
    url: process.env.ZEPLO_URL,
  },
  temple: {
    groupName: process.env.TEMPLE_GROUP_NAME,
    groupId: process.env.TEMPLE_GROUP_ID,
    groupKey: process.env.TEMPLE_GROUP_KEY,
    baseUrl: 'https://templeosrs.com' as const,
    privateGroup: process.env.TEMPLE_PRIVATE_GROUP,
  },
  ranks: {
    leaders: ['Owner', 'Deputy Owner', 'Artisan'],
    unranked: 'Air',
  },
  wiki: {
    baseUrl: 'https://oldschool.runescape.wiki' as const,
  },
  wikiSync: {
    baseUrl: 'https://sync.runescape.wiki' as const,
  },
  redisUrl: process.env.KV_REST_API_URL,
  discord: {
    baseUrl: 'https://discord.com/api/v10' as const,
    clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    redirectUri: encodeURI(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI ?? ''),
    token: process.env.DISCORD_TOKEN,
    guildId: process.env.DISCORD_GUILD_ID,
    channelId: process.env.DISCORD_CHANNEL_ID,
  },
  collectionLogTotal: 1561 as const,
};
