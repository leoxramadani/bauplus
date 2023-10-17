import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import {
  Card,
  Text,
  Metric,
  LineChart,
  DonutChart,
} from '@tremor/react';
import DonutChartGrid from './DonutChartGrid';

const chartdata = [
  {
    year: 1970,
    'Export Growth Rate': 2.04,
    'Import Growth Rate': 1.53,
  },
  {
    year: 1971,
    'Export Growth Rate': 1.96,
    'Import Growth Rate': 1.58,
  },
  {
    year: 1972,
    'Export Growth Rate': 1.96,
    'Import Growth Rate': 1.61,
  },
  {
    year: 1973,
    'Export Growth Rate': 1.93,
    'Import Growth Rate': 1.61,
  },
  {
    year: 1974,
    'Export Growth Rate': 1.88,
    'Import Growth Rate': 1.67,
  },
  // ...
];

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}%`;

const GridLayout = () => {
  const layout = [
    {
      i: 'a',
      x: 0,
      y: 0,
      w: 2,
      h: 3,
      minW: 2,
      maxW: 2,
      maxH: 4,
      minH: 3,
    },
    { i: 'b', x: 1, y: 0, w: 6, h: 10 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <ReactGridLayout
      className="layout border-4"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      autoSize={true}
    >
      <Card
        key="a"
        className="w-auto h-auto flex justify-center items-center flex-col gap-2 "
      >
        <Text>Sales</Text>
        <Metric>34,743</Metric>
      </Card>
      <Card key="b" className="h-auto">
        <LineChart
          className="mt-6"
          data={chartdata}
          index="year"
          categories={['Export Growth Rate', 'Import Growth Rate']}
          colors={['emerald', 'gray']}
          valueFormatter={dataFormatter}
          yAxisWidth={40}
        />
      </Card>
      <div key="c" className="bg-blue-200">
        c
      </div>
    </ReactGridLayout>
  );
};

export default GridLayout;
