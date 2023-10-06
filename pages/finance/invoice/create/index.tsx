"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IInvoiceSchema, invoiceSchema } from "@/lib/schema/finance"
import { Input } from "@/components/ui/input"
import { watch } from "fs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
// import { toast } from "@/components/ui/use-toast"



export default function DatePickerForm() {
  const form = useForm<IInvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
  })

  function onSubmit(data: IInvoiceSchema) {
    console.log('test')
  }
  console.log(form.watch('invoiceNumber'))
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center gap-4">
          {/* invoice number  */}
        <FormField
          control={form.control}
          name="invoiceNumber"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Invoice Number</FormLabel>
             
              <FormControl className="relative">
                <Input placeholder="Invoice Number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" autoComplete="off" {...field} />
              </FormControl>
             

           

             
              <FormMessage />
            </FormItem>
          )}
        />
    {/* invoice date  */}
<FormField
          control={form.control}
          name="invoiceDate"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Invoice Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick due date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < form.getValues('invoiceDate')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />



<FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mkd">Ден</SelectItem>
                  <SelectItem value="eur">Euro</SelectItem>
                  <SelectItem value="usd">$USD</SelectItem>
                </SelectContent>
              </Select>
            
              <FormMessage />
            </FormItem>
          )}
        />

        </div>

        
        
       
        <Button className="w-max" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
