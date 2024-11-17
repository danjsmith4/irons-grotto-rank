import { clientConstants } from '@/config/constants.client';
import { CollectionLogResponse } from '@/app/schemas/collection-log';
import * as Sentry from '@sentry/nextjs';

export async function getCollectionLog(player: string) {
  try {
    const collectionLogResponse = await fetch(
      `${clientConstants.collectionLog.baseUrl}/collectionlog/user/${player}`,
    );

    return CollectionLogResponse.parse(await collectionLogResponse.json());
  } catch {
    Sentry.captureMessage('Collection Log data not found', 'info');

    return null;
  }
}
