'use client';
import KpiCard from '@/components/atoms/KpiCard';
import { DataTable } from '@/components/molecules/table/DataTable';
import {
  GET_PAYABLE_CURRENT_MONTH,
  GET_PAYABLE_PAST_MONTH,
  GET_RECIEVABLE_CURRENT_MONTH,
  GET_RECIEVABLE_PAST_MONTH,
} from '@/lib/constants/endpoints/finance/invoice';
import {
  IProject,
  projectColumnDef,
} from '@/lib/schema/projects/projects';
import {
  AreaChart,
  BarChart,
  Card,
  DonutChart,
  Subtitle,
  Title,
} from '@tremor/react';
import axios from 'axios';
import {
  BarChart3,
  ShoppingCart,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const projects = [
  {
    name: 'Product Launch',
    sales: 250000,
  },
  {
    name: 'Ad Campaign',
    sales: 120000,
  },
  {
    name: 'Market Study',
    sales: 85000,
  },
  {
    name: 'Client Advisory',
    sales: 75000,
  },
  {
    name: 'Financial Analysis',
    sales: 90000,
  },
  {
    name: 'ERP Implementation',
    sales: 35000,
  },
];

const chartdataBar = [
  {
    category: 'Q1',
    Revenue: 250000,
    Expenses: 180000,
  },
  {
    category: 'Q2',
    Revenue: 280000,
    Expenses: 190000,
  },
  {
    category: 'Q3',
    Revenue: 300000,
    Expenses: 200000,
  },
  {
    category: 'Q4',
    Revenue: 270000,
    Expenses: 195000,
  },
];

const chartdata = [
  {
    date: 'Jan 22',
    Income: 2890,
    Expenses: 2338,
  },
  {
    date: 'Feb 22',
    Income: 2756,
    Expenses: 2103,
  },
  {
    date: 'Mar 22',
    Income: 3322,
    Expenses: 2194,
  },
  {
    date: 'Apr 22',
    Income: 3470,
    Expenses: 2108,
  },
  {
    date: 'May 22',
    Income: 3475,
    Expenses: 1812,
  },
  {
    date: 'Jun 22',
    Income: 3129,
    Expenses: 1726,
  },
];

const valueFormatter = function (number: any) {
  return '€' + new Intl.NumberFormat('us').format(number).toString();
};

const Main = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.id) {
      setIsOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);

  const [AmountPayableCurrentMonth, setAmountPayableCurrentMonth] =
    useState<number>();
  useEffect(() => {
    async function getData() {
      await axios
        .get(GET_PAYABLE_CURRENT_MONTH)
        .then((res) => {
          setAmountPayableCurrentMonth(res.data);
        })
        .catch((error) => {
          console.log('error fetching finances->', error);
        });
    }
    getData();
  }, []);

  const [AmountPayablePastMonth, setAmountPayablePastMonth] =
    useState<number>();
  useEffect(() => {
    async function getData() {
      await axios
        .get(GET_PAYABLE_PAST_MONTH)
        .then((res) => {
          setAmountPayablePastMonth(res.data);
        })
        .catch((error) => {
          console.log('error fetching finances->', error);
        });
    }
    getData();
  }, []);

  const [AmountRecievablePastMonth, setAmountRecievablePastMonth] =
    useState<number>();
  useEffect(() => {
    async function getData() {
      await axios
        .get(GET_RECIEVABLE_PAST_MONTH)
        .then((res) => {
          setAmountRecievablePastMonth(res.data);
        })
        .catch((error) => {
          console.log('error fetching finances->', error);
        });
    }
    getData();
  }, []);

  const [
    AmountRecievableCurrentMonth,
    setAmountRecievableCurrentMonth,
  ] = useState<number>();
  useEffect(() => {
    async function getData() {
      await axios
        .get(GET_RECIEVABLE_CURRENT_MONTH)
        .then((res) => {
          setAmountRecievableCurrentMonth(res.data);
        })
        .catch((error) => {
          console.log('error fetching finances->', error);
        });
    }
    getData();
  }, []);
  const [COGsCalculatedCurrentMonth, setCOGsCalculatedCurrentMonth] =
    useState<number>(0);
  const [COGsCalculatedPastMonth, setCOGsCalculatedPastMonth] =
    useState<number>(0);
  useEffect(() => {
    if (
      AmountRecievableCurrentMonth != undefined ||
      AmountPayableCurrentMonth != undefined
    ) {
      const x1 = AmountRecievableCurrentMonth;
      const x2 = AmountPayableCurrentMonth;
      const y =
        (x2 != undefined ? x2 : 0) - (x1 != undefined ? x1 : 0);
      setCOGsCalculatedCurrentMonth(y);
    }
    if (
      AmountRecievableCurrentMonth != undefined ||
      AmountPayableCurrentMonth != undefined
    ) {
      const x1 = AmountRecievablePastMonth;
      const x2 = AmountPayablePastMonth;
      const y =
        (x2 != undefined ? x2 : 0) - (x1 != undefined ? x1 : 0);
      setCOGsCalculatedPastMonth(y);
    }
  }, [
    AmountRecievableCurrentMonth,
    AmountPayableCurrentMonth,
    AmountRecievablePastMonth,
    AmountPayablePastMonth,
  ]);

  return (
    <>
      <Head>
        <title>Mimiro</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-col gap-4">
        <div className="grid w-full gap-4 rounded-lg bg-gradient-to-b from-indigo-500 to-[#F5F7FA] to-85% p-8 pb-[200px] sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
          <KpiCard
            title="Gross Revenue"
            metric={
              AmountPayableCurrentMonth?.toString() != undefined
                ? AmountPayableCurrentMonth?.toString()
                : ''
            }
            pastMonth={
              AmountPayablePastMonth != undefined
                ? AmountPayablePastMonth
                : 0
            }
            percentage="7.5"
            delta="increase"
            icon={<ShoppingCart color="#fff" size={32} />}
          />
          <KpiCard
            title="COGs"
            metric={
              AmountRecievableCurrentMonth?.toString() != undefined
                ? AmountRecievableCurrentMonth?.toString()
                : '0'
            }
            pastMonth={
              AmountRecievablePastMonth != undefined
                ? AmountRecievablePastMonth
                : 0
            }
            percentage="3.0"
            delta="increase"
            icon={<TrendingUp color="#fff" size={32} />}
          />
          <KpiCard
            title="EBIT"
            metric={
              COGsCalculatedCurrentMonth.toString() != undefined
                ? COGsCalculatedCurrentMonth.toString()
                : '0'
            }
            pastMonth={
              COGsCalculatedPastMonth != undefined
                ? COGsCalculatedPastMonth
                : 0
            }
            percentage="10.2"
            delta="increase"
            icon={<Wallet color="#fff" size={32} />}
          />
          <KpiCard
            title="EBITDA"
            metric="532"
            pastMonth={0}
            percentage="1.8"
            delta="increase"
            icon={<BarChart3 color="#fff" size={32} />}
          />
          {/* <KpiCard
            title="Net Income"
            metric="0"
            pastMonth={0}
            percentage="1.8"
            delta="increase"
            icon={<Wallet2 color="#fff" size={32} />}
          /> */}
        </div>

        <div className="mt-[-170px] flex h-max w-full flex-col gap-10 px-8 pb-10">
          <div className="flex w-full flex-col gap-4 2xl:flex-row">
            <Card className="shadow-xl">
              <Title>Income and Expenses</Title>
              <div className="test"></div>
              <AreaChart
                className="mt-4 h-72"
                data={chartdata}
                index="date"
                categories={['Income', 'Expenses']}
                colors={['indigo', 'red']}
                valueFormatter={valueFormatter}
              />
            </Card>
            <Card className="shadow-xl 2xl:max-w-lg">
              <Title>Gross Revenue of Projects</Title>
              <div className="test"></div>
              <DonutChart
                className="h-[400px] w-full p-6 text-3xl font-medium tracking-tight md:text-5xl"
                data={projects}
                category="sales"
                index="name"
                valueFormatter={valueFormatter}
                colors={[
                  'cyan',
                  'lime',
                  'teal',
                  'indigo',
                  'violet',
                  'pink',
                ]}
              />
            </Card>
          </div>
          <div className="flex w-full flex-col gap-4 2xl:flex-row">
            <Card className="shadow-xl 2xl:max-w-2xl">
              <Title>Financial Performance</Title>
              <Subtitle>
                Revenue and Expenses by Quarter (2023)
              </Subtitle>
              <div className="test"></div>
              <BarChart
                className="mt-6"
                data={chartdataBar}
                index="name"
                categories={['Revenue', 'Expenses']}
                colors={['sky', 'pink']}
                valueFormatter={valueFormatter}
                yAxisWidth={48}
              />
            </Card>
            <div className="h-fit w-full shadow-xl">
              {data && (
                <DataTable
                  data={data}
                  columns={projectColumnDef}
                  showPagination={false}
                  showViewoptions={false}
                  showSearchBar={false}
                  showTitle={true}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;

const data: IProject[] = [
  {
    projectId: 'PRO-5678',
    projectType: 'development',
    projectName: 'Product Launch',
    projectStatus: 'in progress',
    projectIncome: '€250,000',
    projectOutcome: '€180,000',
    projectCompletion: 60,
  },
  {
    projectId: 'PRO-9012',
    projectType: 'marketing',
    projectName: 'Ad Campaign',
    projectStatus: 'completed',
    projectIncome: '€120,000',
    projectOutcome: '€80,000',
    projectCompletion: 100,
  },
  {
    projectId: 'PRO-3456',
    projectType: 'research',
    projectName: 'Market Study',
    projectStatus: 'in progress',
    projectIncome: '€85,000',
    projectOutcome: '€65,000',
    projectCompletion: 38,
  },
  {
    projectId: 'PRO-7890',
    projectType: 'consulting',
    projectName: 'Client Advisory',
    projectStatus: 'in progress',
    projectIncome: '€75,000',
    projectOutcome: '€60,000',
    projectCompletion: 82,
  },
  {
    projectId: 'PRO-1234',
    projectType: 'finance',
    projectName: 'Financial Analysis',
    projectStatus: 'completed',
    projectIncome: '€90,000',
    projectOutcome: '€70,000',
    projectCompletion: 23,
  },
  {
    projectId: 'PRO-6789',
    projectType: 'erp',
    projectName: 'ERP Implementation',
    projectStatus: 'in progress',
    projectIncome: '€350,000',
    projectOutcome: '€260,000',
    projectCompletion: 56,
  },
  {
    projectId: 'PRO-2345',
    projectType: 'crm',
    projectName: 'CRM Integration',
    projectStatus: 'in progress',
    projectIncome: '€120,000',
    projectOutcome: '€90,000',
    projectCompletion: 73,
  },
  {
    projectId: 'PRO-4567',
    projectType: 'crm',
    projectName: 'Customer Database',
    projectStatus: 'completed',
    projectIncome: '€60,000',
    projectOutcome: '€45,000',
    projectCompletion: 45,
  },
];
