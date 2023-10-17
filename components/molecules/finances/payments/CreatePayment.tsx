'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
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
 
  IBankAccountCash,
  IInvoiceSchema,

  bankAccountSchemaCash,
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
import { useState } from 'react';
import {
  IPayment,
  paymentSchema,
} from '@/lib/schema/Finance/payment';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

// import { toast } from "@/components/ui/use-toast"

const CreatePayment = () => {
  //   const [accountType, setAccountType] = useState<'Bank' | 'Cash'>('Bank');

  const form = useForm<IPayment>({
    resolver: zodResolver(paymentSchema),
  });

  function onSubmitCash(data: IBankAccountCash) {
    console.log('test');
  }
  function onSubmit(data: IPayment) {
    console.log(data);
  }
  const projects = [
    { label: 'Thor1', value: 'thor' },
    { label: 'Thor Website', value: 'thorWebsite' },
    { label: 'Arkiva', value: 'arkiva' },
    { label: 'ProWork', value: 'prowork' },
    { label: 'Miniera', value: 'miniera' },
  ] as const;

  const invoice = [
    { label: 'INV#001', value: '001' },
    { label: 'INV#002', value: '002' },
    { label: 'INV#003', value: '003' },
    { label: 'INV#004', value: '004' },
    { label: 'INV#005', value: '005' },
  ] as const;

  const bankAccs = [
    { label: 'Besir Kurtishi Acc', value: '001' },
    { label: 'Besir Kurtishi Acc2', value: '002' },
    { label: 'Besir Kurtishi Acc3', value: '003' },
    { label: 'Besir Kurtishi Acc4', value: '004' },
    { label: 'Besir Kurtishi Acc5', value: '005' },
  ] as const;

  const currency = [
    { label: 'Ден.', value: 'mkd' },
    { label: '$USD', value: 'usd' },
    { label: 'Eur', value: 'eur' },
  ] as const;

  const payment = [
    { label: 'PAypal', value: 'paypal' },
    { label: 'Offline Payment', value: 'op' },
    { label: 'Bank', value: 'bank' },
  ] as const;

  return (
    <div className="z-0 flex flex-col gap-4 w-full  ">
      {/* <div>
        <h2 className="text-3xl font-bold text-blue-500">
            Add Payment
        </h2>
        <h3 className="font-normal text-lg text-gray-900">
            Payment Details
        </h3>
      </div> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
            {/* project */}
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Project</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full flex items-center gap-1 justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? projects.find(
                                (project) =>
                                  project.value === field.value
                              )?.label
                            : 'Select language'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No project found.</CommandEmpty>
                        <CommandGroup>
                          {projects.map((project) => (
                            <CommandItem
                              value={project.label}
                              key={project.value}
                              onSelect={() => {
                                form.setValue(
                                  'project',
                                  project.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  project.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {project.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoice"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invoice</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full flex items-center gap-1 justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? invoice.find(
                                (invoice) =>
                                  invoice.value === field.value
                              )?.label
                            : 'Select Invoice'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0 relative z-50 ">
                      <Command className="relative">
                        <CommandInput placeholder="Search invoice..." />
                        <CommandEmpty>No invoice found.</CommandEmpty>
                        <CommandGroup>
                          {invoice.map((invoice) => (
                            <CommandItem
                              value={invoice.label}
                              key={invoice.value}
                              onSelect={() => {
                                form.setValue(
                                  'invoice',
                                  invoice.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  invoice.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {invoice.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paidOn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid On</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full flex justify-between items-center text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick paid on date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        //   disabled={(date) =>
                        //     date < form.getValues('paidOn')
                        //   }
                        //   initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
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

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Currency</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full flex items-center gap-1 justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? currency.find(
                                (currency) =>
                                  currency.value === field.value
                              )?.label
                            : 'Select Currency'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search currency..." />
                        <CommandEmpty>No currency found</CommandEmpty>
                        <CommandGroup>
                          {currency.map((currency) => (
                            <CommandItem
                              value={currency.label}
                              key={currency.value}
                              onSelect={() => {
                                form.setValue(
                                  'currency',
                                  currency.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  currency.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {currency.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exchangeRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exchange Rate</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter exchange rate"
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
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Id</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter transaction id"
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
              name="paymentGateway"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Gateway</FormLabel>
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
                      <SelectItem value="paypal">Paypal</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cash">
                        Offline Payment
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankAccount"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Bank Account</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full flex items-center gap-1 justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? bankAccs.find(
                                (bankAcc) =>
                                  bankAcc.value === field.value
                              )?.label
                            : 'Select Invoice'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No invoice found.</CommandEmpty>
                        <CommandGroup>
                          {bankAccs.map((bankAcc) => (
                            <CommandItem
                              value={bankAcc.label}
                              key={bankAcc.value}
                              onSelect={() => {
                                form.setValue(
                                  'bankAccount',
                                  bankAcc.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  bankAcc.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {bankAcc.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

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

export default CreatePayment;
