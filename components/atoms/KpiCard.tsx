import { BadgeDelta, Card, Flex, Metric, ProgressBar, Text } from '@tremor/react'
import React from 'react'



interface IKpiCard {
    title: string;
    metric: string;
    delta: 'increase' | 'decrease';
    percentage: string;
    

}

const KpiCard = ({title, metric, delta, percentage} : IKpiCard) => {
  return (
    <Card className="max-w-sm mx-auto">
    <Flex alignItems="start">
      <div>
        <Text>{title}</Text>
        <Metric>${metric}</Metric>
      </div>
      <BadgeDelta deltaType={delta}>{percentage}%</BadgeDelta>
    </Flex>
    {/* <Flex className="mt-4">
      <Text>68% ($ 149,940)</Text>
      <Text>$ 220,500</Text>
    </Flex> */}
    {/* <ProgressBar value={15.9} className="mt-2" /> */}
  </Card>
  )
}

export default KpiCard