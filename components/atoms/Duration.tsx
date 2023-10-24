import { cn } from '@/lib/utils';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePicker } from './DatePicker';

interface IDuration {
  className?: string;
}

const Duration = ({ className }: IDuration) => {
  const [selectedRange, setSelectedRange] = useState<string>('Today');
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

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
    return [
      formatDate(lastWeekStartDate),
      formatDate(lastWeekEndDate),
    ];
  };

  const lastMonthRange = (): [string, string] => {
    const lastMonthEndDate = new Date();
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
    return [
      formatDate(lastMonthStartDate),
      formatDate(lastMonthEndDate),
    ];
  };

  const last3MonthsRange = (): [string, string] => {
    const last3MonthsEndDate = new Date();
    const last3MonthsStartDate = new Date();
    last3MonthsStartDate.setMonth(
      last3MonthsStartDate.getMonth() - 3
    );
    return [
      formatDate(last3MonthsStartDate),
      formatDate(last3MonthsEndDate),
    ];
  };

  const handleDateRangeChange = (value: string) => {
    setSelectedRange(value);

    if (value !== 'Custom range') {
      setDropDown(false);
    }

    if (value === 'Custom range') {
      setOpen(true);
    }
  };

  const dateRanges: Record<string, () => [string, string]> = {
    Today: todayRange,
    Yesterday: yesterdayRange,
    'Last 7 days': lastWeekRange,
    'Last month': lastMonthRange,
    'Last 3 months': last3MonthsRange,
  };

  const [startDate, endDate] = dateRanges[selectedRange]
    ? dateRanges[selectedRange]()
    : ['', ''];

  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const range = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last month',
    'Last 3 months',
    'Custom range',
  ];

  console.log(date);
  console.log('start: ', startDate);
  return (
    <div className={cn('absolute right-4', className)}>
      <div className="relative flex h-full  w-max flex-col">
        <div
          onClick={() => setDropDown(!dropDown)}
          className="flex w-max min-w-[80px] cursor-pointer items-center justify-center rounded-sm bg-zinc-100 px-3 py-1 font-semibold text-zinc-500 hover:bg-zinc-50"
        >
          {selectedRange === 'Custom range' ? (
            <p>
              {date.from &&
                date.to &&
                `${formatDate(date.from)} - ${formatDate(date.to)}`}
            </p>
          ) : (
            startDate &&
            endDate && (
              <p>
                {startDate} - {endDate}
              </p>
            )
          )}
        </div>
      </div>
      {dropDown && (
        <div className="absolute  right-0 z-50  mt-2 flex w-max flex-col items-center justify-center gap-4 rounded-sm border bg-white font-semibold text-slate-500 shadow-md lg:flex-row">
          <ul className="flex flex-col items-center justify-center">
            {range.map((range) => (
              <li
                className={`${
                  selectedRange === range && 'bg-zinc-100'
                } flex w-full cursor-pointer items-center justify-start px-3 py-2 text-slate-500 hover:bg-zinc-100`}
                key={range}
                onClick={() => handleDateRangeChange(range)}
              >
                {range}
              </li>
            ))}
          </ul>

          {open && (
            <DatePicker setDateRange={setDate} setOpen={setOpen} setDropDown={setDropDown} />
          )}
        </div>
      )}
    </div>
  );
};

export default Duration;
