import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { DateRange } from 'react-day-picker';

const Duration: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('Today');
  const [dropDown, setDropDown] = useState<boolean>(false);

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const todayRange = (): [string, string] => {
    const today = new Date();
    const formattedDate = formatDate(today);
    return [formattedDate, formattedDate];
  };

  const yesterdayRange = (): [string, string] => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = formatDate(yesterday);
    return [formattedDate, formattedDate];
  };

  const lastWeekRange = (): [string, string] => {
    const lastWeekEndDate = new Date();
    const lastWeekStartDate = new Date();
    lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);
    return [formatDate(lastWeekStartDate), formatDate(lastWeekEndDate)];
  };

  const lastMonthRange = (): [string, string] => {
    const lastMonthEndDate = new Date();
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
    return [formatDate(lastMonthStartDate), formatDate(lastMonthEndDate)];
  };

  const last3MonthsRange = (): [string, string] => {
    const last3MonthsEndDate = new Date();
    const last3MonthsStartDate = new Date();
    last3MonthsStartDate.setMonth(last3MonthsStartDate.getMonth() - 3);
    return [formatDate(last3MonthsStartDate), formatDate(last3MonthsEndDate)];
  };

  const handleDateRangeChange = (value: string) => {
    setSelectedRange(value);
   
    if (value !== 'Custom range') {
        setDropDown(false);
      }

    if (value === 'Custom range') {
      console.log("test")
    }
  };

  const dateRanges: Record<string, () => [string, string]> = {
    Today: todayRange,
    Yesterday: yesterdayRange,
    'Last 7 days': lastWeekRange,
    'Last month': lastMonthRange,
    'Last 3 months': last3MonthsRange,
  };

  const [startDate, endDate] = dateRanges[selectedRange] ? dateRanges[selectedRange]() : ['', ''];

  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: new Date()
  })

  const range = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last month',
    'Last 3 months',
    'Custom range',
  ];

  console.log(date)
  console.log("start: ",startDate)
  return (
    <div className='absolute right-4'>
      <div className='relative flex flex-col  w-max h-full'>
        <div
          onClick={() => setDropDown(!dropDown)}
          className='hover:bg-zinc-50 cursor-pointer min-w-[80px] w-max flex justify-center items-center px-3 py-1 bg-zinc-100 text-zinc-500 rounded-sm font-semibold'
        >
           {selectedRange === "Custom range" ? 
           (
            <p>
                    {date.from && date.to && `${formatDate(date.from)} - ${formatDate(date.to)}`}

            </p>
           ): (
            startDate && endDate && (
                <p>
                  {startDate} - {endDate}
                </p>
              )
           )}
         
        </div>
      </div>
      {dropDown && (
        <div className='absolute  flex flex-col  lg:flex-row gap-4 justify-center items-center z-50 mt-2 w-max right-0 bg-white shadow-md border rounded-sm font-semibold text-slate-500'>
          <ul className='flex flex-col justify-center items-center'>
            {range.map((range) => (
              <li
                className={`${selectedRange === range && 'bg-zinc-100'} w-full px-3 py-2 text-slate-500 hover:bg-zinc-100 justify-start cursor-pointer items-center flex`}
                key={range}
                onClick={() => handleDateRangeChange(range)}
              >
                {range}
              </li>
            ))}
          </ul>
          {/* date picker here */}
          {selectedRange === 'Custom range' && (
            <DatePicker setDateRange={setDate}  />
          )}
        </div>
      )}
    </div>
  );
};

export default Duration;
