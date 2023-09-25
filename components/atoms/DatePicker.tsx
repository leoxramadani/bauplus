"use client"
import { Dispatch, SetStateAction} from 'react';
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface IDatePicker {
    className?: string;
    setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;

}

export function DatePicker({
  className,
  setDateRange
}: IDatePicker) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })


  const handleDateChange = () => {
    setDateRange({
        from: date?.from,
        to: date?.to
    })
  }

  return (
    <div className={cn("grid gap-2 relative", className)}>
      
    
          <Calendar
            initialFocus
            className="bg-white mb-12"
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />

          <input onClick={handleDateChange} type="button" value="Apply" className='w-max px-3 py-1 cursor-pointer absolute right-4 bottom-4 mt-8 rounded-md bg-blue-500 text-white text-bold hover:bg-blue-600 active:bg-blue-600'  />
        
    </div>
  )
}
