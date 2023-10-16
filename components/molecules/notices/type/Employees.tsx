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
import { Textarea } from '@/components/ui/textarea';
import {
  INoticeSchema,
  noticeSchema,
} from '@/lib/schema/notices/noticeboard';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface EmployeesProps {
  setModal(open: boolean): void;
  onSubmit: (data: INoticeSchema) => void;
}

const Employees = ({ setModal, onSubmit }: EmployeesProps) => {
  const [test, isTest] = useState(false);
  const form = useForm<INoticeSchema>({
    resolver: zodResolver(noticeSchema),
  });

  function onSubmitCash(data: INoticeSchema) {
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
            name="noticeTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notice Heading</FormLabel>

                <FormControl className="relative">
                  <Input
                    placeholder="e.g. New year celebrations at office."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IT Solutions">
                      IT Solutions
                    </SelectItem>
                    <SelectItem value="test1">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="test2">
                      Backend Development
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="noticeTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notice Details</FormLabel>

              <FormControl className="relative">
                <Textarea />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Btn
          isProgress={test}
          className="w-max"
          type="submit"
          disabled={test}
        >
          Save
        </Btn>
      </form>
    </Form>
  );
};

export default Employees;
