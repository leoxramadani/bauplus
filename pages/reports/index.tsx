import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
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

  const valueFormatter = (number: any) =>
    `${new Intl.NumberFormat('us').format(number).toString()}`;

  const handleSectionChange = (section: any) => {
    setSelectedSection(section);
  };

  const renderChartBasedOnSection = () => {
    if (selectedSection === 'Attendance') {
      return (
        <BarChart
          className="mt-6"
          data={chartdata}
          index="date"
          categories={['Work hours']}
          colors={['blue']}
          valueFormatter={valueFormatter}
          yAxisWidth={48}
        />
      );
    } else if (selectedSection === 'Leaves') {
      return <div>Leaves content goes here</div>;
    } else if (selectedSection === 'Salary') {
      return <div>Salary content goes here</div>;
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
