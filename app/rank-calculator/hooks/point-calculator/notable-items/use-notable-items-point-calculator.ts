import { useWatch } from 'react-hook-form';
import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateNotableItemsPoints } from '@/app/rank-calculator/utils/calculators/calculate-notable-items-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export interface NotableItemsPointCalculatorData
  extends CommonPointCalculatorData {
  percentageCollected: number;
  itemsCollected: number;
  totalItems: number;
}

export function useNotableItemsPointCalculator() {
  const itemFields = useWatch<RankCalculatorSchema, 'acquiredItems'>({
    name: 'acquiredItems',
  });
  const scaling = useCalculatorScaling();

  return calculateNotableItemsPoints(itemFields, scaling);
}
