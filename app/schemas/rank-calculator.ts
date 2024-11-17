import { z } from 'zod';
import { DiaryLocation, DiaryTier } from './osrs';

export const RankStructure = z.enum([
  'Standard',
  'Bingo Winner',
  'Legacy',
  'Inviter',
  'Admin',
  'Moderator',
  'Deputy Owner',
  'Owner',
]);

export type RankStructure = z.infer<typeof RankStructure>;

export const AchievementDiaryMap = z.record(DiaryLocation, DiaryTier);

export type AchievementDiaryMap = z.infer<typeof AchievementDiaryMap>;

export interface CommonPointCalculatorData {
  pointsAwarded: number;
  pointsAwardedPercentage: number;
  pointsRemaining: number;
}

export const achievementDiaryTierPoints = {
  get None() {
    return this.Elite * 0;
  },
  get Easy() {
    return this.Elite * 0.1;
  },
  get Medium() {
    return this.Elite * 0.3;
  },
  get Hard() {
    return this.Elite * 0.6;
  },
  get Elite() {
    return 1000;
  },
} satisfies Record<DiaryTier, number>;

export const RankSubmissionStatus = z.enum(['Pending', 'Approved', 'Rejected']);

export type RankSubmissionStatus = z.infer<typeof RankSubmissionStatus>;

export const RankSubmissionMetadata = z.object({
  status: RankSubmissionStatus,
  discordMessageId: z.string(),
  submittedBy: z.string(),
  submittedAt: z.date(),
  actionedBy: z.string(),
});

export type RankSubmissionMetadata = z.infer<typeof RankSubmissionMetadata>;
