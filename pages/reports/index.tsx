import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  IReports,
  reportsColumnDefBuilder,
} from '@/lib/schema/reports/reports';
import employeeImage from '@/public/user-reports.png';
import { BarChart, Card, Title } from '@tremor/react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Reports = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setisAdding] = useState(false);
  const [selectedSection, setSelectedSection] =
    useState('Attendance');
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [selectedFilter, setSelectedFilter] = useState('Yearly');
  const [selectedYears, setSelectedYears] = useState('2023');

  useEffect(() => {
    if (router.query.id) {
      setIsModalOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);
  useEffect(() => {
    if (!isModalOpen) {
      router.replace('/reports', undefined, {
        shallow: true,
      });
    }
  }, [isModalOpen]);

  console.log('Data;', data);

  const valueFormatter = (number: any) =>
    `${new Intl.NumberFormat('us').format(number).toString()}`;

  const handleSectionChange = (section: any) => {
    setSelectedSection(section);
  };

  const salaryData = [
    {
      month: 'Jan',
      Salary: 0,
    },
    {
      month: 'Feb',
      Salary: 0,
    },
    {
      month: 'Mar',
      Salary: 32750,
    },
    {
      month: 'Apr',
      Salary: 43750,
    },
    {
      month: 'May',
      Salary: 47750,
    },
    {
      month: 'Jun',
      Salary: 53750,
    },
    {
      month: 'Jul',
      Salary: 58750,
    },
    {
      month: 'Aug',
      Salary: 62750,
    },
    {
      month: 'Sep',
      Salary: 65750,
    },
    {
      month: 'Oct',
      Salary: 69750,
    },
    {
      month: 'Nov',
      Salary: 76750,
    },
    {
      month: 'Dec',
      Salary: 83750,
    },
  ];

  const leavesData = [
    {
      month: 'Jan',
      Leaves: 0,
    },
    {
      month: 'Feb',
      Leaves: 0,
    },
    {
      month: 'Mar',
      Leaves: 4,
    },
    {
      month: 'Apr',
      Leaves: 0,
    },
    {
      month: 'May',
      Leaves: 1,
    },
    {
      month: 'Jun',
      Leaves: 2,
    },
    {
      month: 'Jul',
      Leaves: 0,
    },
    {
      month: 'Aug',
      Leaves: 0,
    },
    {
      month: 'Sep',
      Leaves: 9,
    },
    {
      month: 'Oct',
      Leaves: 2,
    },
    {
      month: 'Nov',
      Leaves: 2,
    },
    {
      month: 'Dec',
      Leaves: 4,
    },
  ];

  const chartdata = [
    {
      date: '1',
      'Work hours': 8,
    },
    {
      date: '2',
      'Work hours': 7.5,
    },
    {
      date: '3',
      'Work hours': 0,
    },
    {
      date: '4',
      'Work hours': 0,
    },
    {
      date: '5',
      'Work hours': 8,
    },
    {
      date: '6',
      'Work hours': 7.5,
    },
    {
      date: '7',
      'Work hours': 8,
    },
    {
      date: '8',
      'Work hours': 8,
    },
    {
      date: '9',
      'Work hours': 9.5,
    },
    {
      date: '10',
      'Work hours': 0,
    },
    {
      date: '11',
      'Work hours': 0,
    },
    {
      date: '12',
      'Work hours': 8,
    },
    {
      date: '13',
      'Work hours': 8,
    },
    {
      date: '14',
      'Work hours': 8.5,
    },
    {
      date: '15',
      'Work hours': 8,
    },
    {
      date: '16',
      'Work hours': 8,
    },
    {
      date: '17',
      'Work hours': 0,
    },
    {
      date: '18',
      'Work hours': 0,
    },
    {
      date: '19',
      'Work hours': 8,
    },
    {
      date: '20',
      'Work hours': 10,
    },
    {
      date: '21',
      'Work hours': 8.5,
    },
    {
      date: '22',
      'Work hours': 8,
    },
    {
      date: '23',
      'Work hours': 8.5,
    },
    {
      date: '24',
      'Work hours': 0,
    },
    {
      date: '25',
      'Work hours': 0,
    },
    {
      date: '26',
      'Work hours': 8.5,
    },
    {
      date: '27',
      'Work hours': 8,
    },
    {
      date: '28',
      'Work hours': 8,
    },
    {
      date: '29',
      'Work hours': 8.5,
    },
    {
      date: '30',
      'Work hours': 8,
    },
  ];

  const chartMonthsdata = [
    {
      date: 'Jan',
      'Work hours': 0,
    },
    {
      date: 'Feb',
      'Work hours': 0,
    },
    {
      date: 'Mar',
      'Work hours': 180,
    },
    {
      date: 'Apr',
      'Work hours': 158,
    },
    {
      date: 'May',
      'Work hours': 162,
    },
    {
      date: 'Jun',
      'Work hours': 166,
    },
    {
      date: 'Jul',
      'Work hours': 157,
    },
    {
      date: 'Aug',
      'Work hours': 155,
    },
    {
      date: 'Sep',
      'Work hours': 170,
    },
    {
      date: 'Oct',
      'Work hours': 172,
    },
    {
      date: 'Nov',
      'Work hours': 175,
    },
    {
      date: 'Dec',
      'Work hours': 182,
    },
  ];

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const filters = ['Yearly', 'Monthly'];

  const years = ['2019', '2020', '2021', '2022', '2023'];

  const renderYears = () => {
    return (
      <div>
        <Select
          onValueChange={(value) => {
            setSelectedYears(value);
          }}
          value={selectedYears}
        >
          <SelectTrigger>
            <SelectValue>{selectedYears}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {years.map((filter) => (
              <SelectItem
                key={filter}
                value={filter}
                onClick={() => setSelectedYears(filter)}
              >
                {filter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  const renderFilters = () => {
    return (
      <div>
        <Select
          onValueChange={(value) => {
            setSelectedFilter(value);
          }}
          value={selectedFilter}
        >
          <SelectTrigger>
            <SelectValue>{selectedFilter}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem
                key={filter}
                value={filter}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      // <button
      //   key={month}
      //   className={`rounded px-4 py-2 font-medium ${
      //     selectedMonth === month ? 'bg-blue-100' : ''
      //   }`}
      //   onClick={() => setSelectedMonth(month)}
      // >
      //   {month}
      // </button>
    );
  };

  const renderMonthButtons = () => {
    return (
      <div>
        <Select
          onValueChange={(value) => {
            setSelectedMonth(value);
          }}
          value={selectedMonth}
        >
          <SelectTrigger>
            <SelectValue>{selectedMonth}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem
                key={month}
                value={month}
                onClick={() => setSelectedMonth(month)}
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      // <button
      //   key={month}
      //   className={`rounded px-4 py-2 font-medium ${
      //     selectedMonth === month ? 'bg-blue-100' : ''
      //   }`}
      //   onClick={() => setSelectedMonth(month)}
      // >
      //   {month}
      // </button>
    );
  };

  const renderChartBasedOnSection = () => {
    if (selectedSection === 'Attendance') {
      if (selectedFilter === 'Yearly') {
        const yearlyChartData = months.map((month) => {
          const dataPoint = chartMonthsdata.find(
            (data) => data.date === month
          );
          return {
            date: month,
            'Work hours': dataPoint ? dataPoint['Work hours'] : 0,
          };
        });

        return (
          <>
            <div className="flex flex-row gap-4 pt-2">
              <Title className="w-32">{renderFilters()}</Title>
              <Title className="w-32">{renderYears()}</Title>
            </div>
            <BarChart
              className="mt-6"
              data={yearlyChartData}
              index="date"
              categories={['Work hours']}
              colors={['blue']}
              valueFormatter={valueFormatter}
              yAxisWidth={48}
            />
          </>
        );
      } else {
        const daysInMonth = new Date(
          new Date().getFullYear(),
          months.indexOf(selectedMonth) + 1,
          0
        ).getDate();

        const monthlyWorkHours = Array.from(
          { length: daysInMonth },
          (_, i) => ({
            date: `${i + 1}`,
            'Work hours': i < 31 ? (i + 1) * 0.5 : 0,
          })
        );

        return (
          <>
            <div className="flex flex-row gap-4 pt-2">
              <Title className="w-32">{renderFilters()}</Title>
              <Title className="w-32">{renderMonthButtons()}</Title>
            </div>
            <BarChart
              className="mt-6"
              data={monthlyWorkHours}
              index="date"
              categories={['Work hours']}
              colors={['blue']}
              valueFormatter={valueFormatter}
              yAxisWidth={48}
            />
          </>
        );
      }
    } else if (selectedSection === 'Leaves') {
      return (
        <>
          <BarChart
            className="mt-6"
            data={leavesData}
            index="month"
            categories={['Leaves']}
            colors={['red']}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
          />
        </>
      );
    } else if (selectedSection === 'Salary') {
      return (
        <>
          <BarChart
            className="mt-6"
            data={salaryData}
            index="month"
            categories={['Salary']}
            colors={['emerald']}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
          />
        </>
      );
    }
  };

  const renderButton = (section: any) => {
    const isSelected = selectedSection === section;
    const buttonClass = isSelected
      ? 'bg-blue-100 font-medium'
      : 'font-medium';
    return (
      <button
        className={`rounded px-4 py-2 ${buttonClass}`}
        onClick={() => handleSectionChange(section)}
      >
        {section}
      </button>
    );
  };

  return (
    <div>
      {data ? (
        <DataTable
          data={data}
          columns={reportsColumnDefBuilder(setisAdding)}
          searchVal="fullName"
        />
      ) : (
        <>{data ? <div>No data. </div> : <div>Loading...</div>}</>
      )}

      {isAdding && (
        <div
          id="rightmodal"
          className="fixed bottom-0 right-0 z-50 flex h-screen w-[800px] flex-col gap-4 overflow-y-auto overflow-x-hidden bg-white pt-5 shadow-2xl"
        >
          <div className="flex px-4">
            <div className="flex flex-grow"></div>
            <div className="flex flex-none">
              <Button
                variant="ghost"
                className="flex w-fit items-center gap-2"
                onClick={() => {
                  setisAdding(false);
                }}
              >
                <X />
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 px-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16">
                <Image
                  src={employeeImage}
                  alt="employeeImage"
                  width={100}
                  height={100}
                  className="flex rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Amar Alimi</h2>
                <p className="text-sm font-medium text-gray-500">
                  UI/UX Designer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              {renderButton('Attendance')}
              {renderButton('Leaves')}
              {renderButton('Salary')}
            </div>

            <Card>
              <Title>{selectedSection}</Title>
              {renderChartBasedOnSection()}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;

const data: IReports[] = [
  {
    reportId: 'REP-5678',
    dateOfBirth: '28.11.2001',
    department: 'IT Solutions',
    employeeId: '1',
    fullName: 'Amar Alimi',
    employeeType: 'Full-time',
    email: 'amar@gmail.com',
  },
  {
    reportId: 'REP-5679',
    dateOfBirth: '02.01.2002',
    department: 'IT Solutions',
    employeeId: '2',
    fullName: 'Besir Kurtishi',
    employeeType: 'Part-time',
    email: 'besir@gmail.com',
  },
  {
    reportId: 'REP-5680',
    dateOfBirth: '22.07.1999',
    department: 'IT Solutions',
    employeeId: '3',
    fullName: 'Leotrim Ramadani',
    employeeType: 'Full-time',
    email: 'leotrim@gmail.com',
  },
  {
    reportId: 'REP-5681',
    dateOfBirth: '18.03.2000',
    department: 'IT Solutions',
    employeeId: '4',
    fullName: 'Taulant Avdili',
    employeeType: 'Part-time',
    email: 'taulant@gmail.com',
  },
];
