'use client';
import {} from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';

import { addDays, isAfter, isSameDay } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface IDatePicker {
  className?: string;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setDropDown: Dispatch<SetStateAction<boolean>>;
}

export function DatePicker({
  className,
  setDateRange,
  setOpen,
  setDropDown,
}: IDatePicker) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const handleDateChange = () => {
    setDateRange({
      from: date?.from,
      to: date?.to,
    });
    setOpen(false);
    setDropDown(false);
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
        className="text-bold absolute bottom-4 right-4 mt-8 w-max cursor-pointer rounded-md bg-primary px-3 py-1 text-white hover:opacity-80"
      />

      {/* <Button
        onClick={handleDateChange}
        variant="destructive"
        className="absolute bottom-4 right-4 flex w-max flex-col items-center justify-center gap-2"
        // size="sm"
      >
        Apply
      </Button> */}
    </div>
  );
}
