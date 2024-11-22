import { z } from 'zod';
import { AcquiredItemMap } from './collection-log';
import { MiniQuest, Quest, Skill } from './osrs';
import { AchievementDiaryMap } from './rank-calculator';
import { LevelMap } from './wiki';

export const BaseItem = z.object({
  image: z.string(),
  name: z.string(),
  points: z.number(),
  /**
   * Automatic items can be updated by the form as the user fills it in
   *
   * e.g. achievement diary cape, max cape
   * */
  isAutomatic: z.literal(true).optional(),
});

export type BaseItem = z.infer<typeof BaseItem>;

export const RequiredItem = z.object({
  clogName: z.string(),
  amount: z.number(),
});

export type RequiredItem = z.infer<typeof RequiredItem>;

export const CollectionLogItem = BaseItem.extend({
  requiredLevels: z.record(Skill, z.number()).optional(),
  requiredItems: z.array(RequiredItem).nonempty(),
}).superRefine((item) => item.requiredItems !== undefined);

export type CollectionLogItem = z.infer<typeof CollectionLogItem>;

export const CombatAchievementItem = BaseItem.extend({
  requiredCombatAchievements: z.array(z.number()).nonempty(),
});

export type CombatAchievementItem = z.infer<typeof CombatAchievementItem>;

export const QuestItem = BaseItem.extend({
  requiredQuests: z.array(z.union([Quest, MiniQuest])).nonempty(),
});

export type QuestItem = z.infer<typeof QuestItem>;

export const CustomItem = BaseItem.extend({
  isAcquired: z
    .function()
    .args(
      z.object({
        achievementDiaries: AchievementDiaryMap.nullable(),
        acquiredItems: AcquiredItemMap.nullable(),
        levels: LevelMap.nullable().optional(),
        musicTracks: z.record(z.string(), z.boolean()).nullable().optional(),
        totalLevel: z.union([z.number(), z.string()]).nullable(),
      }),
    )
    .returns(z.boolean()),
});

export type CustomItem = z.infer<typeof CustomItem>;

export const Item = z.union([
  BaseItem,
  CollectionLogItem,
  CombatAchievementItem,
  QuestItem,
  CustomItem,
]);

export type Item = z.infer<typeof Item>;

export const ItemCategory = z.object({
  image: z.string().optional(),
  items: z.array(Item).nonempty(),
});

export const ItemCategoryMap = z.record(z.string(), ItemCategory);

export type ItemCategoryMap = z.infer<typeof ItemCategoryMap>;

export function isCollectionLogItem(item: unknown): item is CollectionLogItem {
  return CollectionLogItem.safeParse(item).success;
}

export function isCombatAchievementItem(
  item: unknown,
): item is CombatAchievementItem {
  return CombatAchievementItem.safeParse(item).success;
}

export function isQuestItem(item: unknown): item is QuestItem {
  return QuestItem.safeParse(item).success;
}

export function isCustomItem(item: unknown): item is CustomItem {
  return CustomItem.safeParse(item).success;
}
