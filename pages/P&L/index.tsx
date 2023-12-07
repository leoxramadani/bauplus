import MasterDetailTable from '@/components/molecules/pnl/MasterDetailTable';
import { BarChart, Card, Title } from '@tremor/react';

const PnL = () => {
  const chartdata2 = [
    {
      name: 'January',
      'Last Year YTD': 35,
      'This Year YTD': 40,
    },
    {
      name: 'February',
      'Last Year YTD': 45,
      'This Year YTD': 50,
    },
    {
      name: 'March',
      'Last Year YTD': 55,
      'This Year YTD': 60,
    },
    {
      name: 'April',
      'Last Year YTD': 65,
      'This Year YTD': 70,
    },
    {
      name: 'May',
      'Last Year YTD': 75,
      'This Year YTD': 80,
    },
    {
      name: 'June',
      'Last Year YTD': 85,
      'This Year YTD': 90,
    },
    {
      name: 'July',
      'Last Year YTD': 95,
      'This Year YTD': 100,
    },
    {
      name: 'August',
      'Last Year YTD': 105,
      'This Year YTD': 110,
    },
    {
      name: 'September',
      'Last Year YTD': 115,
      'This Year YTD': 120,
    },
    {
      name: 'Octomber',
      'Last Year YTD': 125,
      'This Year YTD': 130,
    },
    {
      name: 'November',
      'Last Year YTD': 135,
      'This Year YTD': 140,
    },
    {
      name: 'December',
      'Last Year YTD': 145,
      'This Year YTD': 150,
    },
  ];

  const valueFormatter = (number: any) =>
    `$ ${new Intl.NumberFormat('us').format(number).toString()}`;

  return (
    <div className="flex flex-col gap-4">
      <MasterDetailTable />
      <Card>
        <Title>Net Profit over the Year</Title>
        <BarChart
          className="mt-6"
          data={chartdata2}
          index="name"
          categories={['Last Year YTD', 'This Year YTD']}
          colors={[
            'blue',
            'teal',
            'amber',
            'rose',
            'indigo',
            'emerald',
          ]}
          valueFormatter={valueFormatter}
          yAxisWidth={48}
        />
      </Card>
    </div>
  );
};

export default PnL;
