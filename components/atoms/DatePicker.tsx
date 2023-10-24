'use client';
import {} from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

import { addDays, isAfter, isSameDay } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface IDatePicker {
  className?: string;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
}

export function DatePicker({ className, setDateRange }: IDatePicker) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const handleDateChange = () => {
    setDateRange({
      from: date?.from,
      to: date?.to,
    });
  };

  const maxAllowedDate = addDays(new Date(), 1);

  // Function to check if a date is after today or same as today
  const isDateDisabled = (day: Date) => {
    return (
      isAfter(day, maxAllowedDate) || isSameDay(day, maxAllowedDate)
    );
  };

  return (
    <div className={cn('relative grid gap-2', className)}>
      <Calendar
        initialFocus
        className="mb-12 bg-white"
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        disabled={isDateDisabled}
      />

      <input
        onClick={handleDateChange}
        type="button"
        value="Apply"
        className="text-bold absolute bottom-4 right-4 mt-8 w-max cursor-pointer rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 active:bg-blue-600"
      />
    </div>
  );
}
