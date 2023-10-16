import { Button } from '@/components/ui/button';
import Btn from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  IBankAccount,
  IBankAccountCash,
  bankAccountSchema,
  bankAccountSchemaCash,
} from '@/lib/schema/Finance/finance';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Cash = () => {
  const [test, isTest] = useState(false);
  const form = useForm<IBankAccountCash>({
    resolver: zodResolver(bankAccountSchemaCash),
  });

  function onSubmitCash(data: IBankAccountCash) {
    isTest(true);
    setTimeout(() => {
      console.log('test');
      isTest(false);
    }, 3000);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitCash)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
          {/* holder name  */}

          <FormField
            control={form.control}
            name="cashAccountHolderName"
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
            name="cashCurrency"
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
            name="cashContactNumber"
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
            name="cashOpeningBalance"
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
            name="cashStatus"
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
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Btn
          isProgress={test}
          className="w-max"
          type="submit"
          disabled={test}
        >
          Submit
        </Btn>
      </form>
    </Form>
  );
};

export default Cash;
