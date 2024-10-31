import { FormWrapper } from './form-wrapper';
import { getPlayerDetails } from '../hooks/use-player-details';

interface Params {
  player: string;
}

export default async function RankCalculatorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { player } = await params;
  const playerDetails = await getPlayerDetails(player);

  return <FormWrapper formData={playerDetails} />;
}
