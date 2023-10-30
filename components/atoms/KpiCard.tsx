import { BadgeDelta, Card, Flex, Metric, Text } from '@tremor/react';

interface IKpiCard {
  title: string;
  metric: string;
  delta: 'increase' | 'decrease';
  percentage: string;
  icon: React.ReactNode; // Add the icon prop
}

const KpiCard = ({
  title,
  metric,
  delta,
  percentage,
  icon,
}: IKpiCard) => {
  return (
    <Card className="mx-auto max-w-sm">
      <Flex alignItems="start">
        <div>
          <Text>{title}</Text>
          <Metric>{metric}</Metric>
          <BadgeDelta className="mt-4" deltaType={delta}>
            {percentage}%
          </BadgeDelta>
        </div>
        <div className="rounded-full bg-[#6E71F1] p-3">{icon}</div>
      </Flex>
      {/* <Flex className="mt-4">
      <Text>68% ($ 149,940)</Text>
      <Text>$ 220,500</Text>
    </Flex> */}
      {/* <ProgressBar value={15.9} className="mt-2" /> */}
    </Card>
  );
};

export default KpiCard;
