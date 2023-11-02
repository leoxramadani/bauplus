import { dataFormatter } from '@/lib/helper/helperFunctions';
import {
  AreaChart,
  BarChart,
  Color,
  DonutChart,
  LineChart,
  ScatterChart,
} from '@tremor/react';
import React from 'react';

interface GraphBlockProps {
  type: 'pie' | 'line' | 'bar' | 'area' | 'scatter' | 'donut';
  data: any;
  colors?: Color[];
  className?: string;
  index: string;
}

const GraphBlock: React.FC<GraphBlockProps> = ({
  type,
  data,
  colors,
  index,
}) => {
  const renderGraphComponent = () => {
    if (!data || data.length === 0) {
      // Handle the case where data is empty or undefined
      return null;
    }

    const categories = Object.keys(data[0]).filter(
      (key) => !['year', 'date', 'time'].includes(key)
    );

    switch (type) {
      case 'pie':
        return (
          <DonutChart
            className="h-full w-full p-6"
            data={data}
            index={index}
            category="sales"
            valueFormatter={dataFormatter}
            colors={[
              'cyan',
              'lime',
              'teal',
              'indigo',
              'violet',
              'pink',
            ]}
            variant="pie"
          />
        );
      case 'donut':
        return (
          <DonutChart
            className="h-full w-full p-6 text-5xl font-medium"
            data={data}
            index={index}
            category="sales"
            valueFormatter={dataFormatter}
            colors={[
              'lime',
              'teal',
              'cyan',
              'indigo',
              'violet',
              'pink',
            ]}
            variant="donut"
          />
        );
      case 'line':
        return (
          <LineChart
            className="h-full min-h-[300px] min-w-[500px] p-6"
            data={data}
            index={index}
            categories={categories}
            colors={['indigo', 'red']}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
          />
        );
      case 'bar':
        return (
          <BarChart
            className="h-full min-h-[300px] min-w-[500px] p-6"
            data={data}
            index="name"
            categories={categories}
            colors={['amber', 'rose', 'blue']}
            valueFormatter={dataFormatter}
            // yAxisWidth={48}
          />
        );
      case 'area':
        return (
          <AreaChart
            className="h-full min-h-[300px] min-w-[500px] p-6"
            data={data}
            index="date"
            categories={categories}
            colors={['amber', 'rose', 'blue']}
            valueFormatter={dataFormatter}
          />
        );
      case 'scatter':
        return (
          <ScatterChart
            className=""
            yAxisWidth={50}
            data={data}
            category="Country"
            x="GDP"
            y="Life_expectancy"
            size="Population"
            showOpacity={true}
            minYValue={60}
            valueFormatter={{
              x: (amount) => `$${(amount / 1000).toFixed(1)}K`,
              y: (lifeExp) => `${lifeExp} yrs`,
              size: (population) =>
                `${(population / 1000000).toFixed(1)}M people`,
            }}
            showLegend={true}
          />
        );
      default:
        return null;
    }
  };

  const graphComponent = renderGraphComponent();

  if (!graphComponent) {
    return null;
  }

  return <>{graphComponent}</>;
};

export default GraphBlock;
