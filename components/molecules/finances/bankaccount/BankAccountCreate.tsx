'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  IBankAccount,
  IInvoiceSchema,
  bankAccountSchema,
  invoiceSchema,
} from '@/lib/schema/Finance/finance';
import { Input } from '@/components/ui/input';
import { watch } from 'fs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
// import { toast } from "@/components/ui/use-toast"

const BankAccountCreate = () => {
  const form = useForm<IBankAccount>({
    resolver: zodResolver(bankAccountSchema),
  });

  function onSubmit(data: IBankAccount) {
    console.log('test');
  }
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h2 className="text-3xl font-bold text-blue-500">
          Bank Account
        </h2>
        <h3 className="font-normal text-lg text-gray-900">
          Add a bank account
        </h3>
      </div>
      <div>
        <RadioGroup
          className="flex flex-row gap-4"
          defaultValue="option-one"
        >
          <div className="flex items-center flex-row gap-1">
            <RadioGroupItem
              className="accent-pink-300 md:accent-pink-500 "
              value="option-one"
              id="option-one"
            />
            <Label htmlFor="option-one">Bank</Label>
          </div>
          <div className="flex items-center flex-row gap-1">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Cash</Label>
          </div>
        </RadioGroup>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
            {/* invoice number  */}
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>

                  <FormControl className="relative">
                    <Input placeholder="Bank Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter account holder name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter account number"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* invoice date  */}
            {/* <FormField
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
        /> */}

            {/* <FormField
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
        /> */}

            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="saving">Saving</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="creditcard">
                        Credit card
                      </SelectItem>
                      <SelectItem value="loans">Loans</SelectItem>
                      <SelectItem value="overdraft">
                        Overdraft
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter contact number"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="openingBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Balance</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter opening balance"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">
                        Inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-max" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BankAccountCreate;
