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
import { GET_ALL_DEPARTMENTS } from '@/lib/constants/endpoints/department';
import {
  CREATE_NOTICE,
  UPDATE_NOTICE,
} from '@/lib/constants/endpoints/notices';
import useData from '@/lib/hooks/useData';
import {
  INoticeSchema,
  noticeSchema,
} from '@/lib/schema/notices/noticeboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export interface EditNoticeProps {
  setModal(open: boolean): void;
  onSubmit: (data: INoticeSchema) => void;
  initialData: INoticeSchema;
}

const EditNotice = ({
  setModal,
  onSubmit,
  initialData,
}: EditNoticeProps) => {
  const form = useForm<INoticeSchema>({
    resolver: zodResolver(noticeSchema),
    defaultValues: initialData,
  });

  const {
    data: departments,
    isLoading,
    isError,
  } = useData<any>(['departments'], GET_ALL_DEPARTMENTS);

  const onSubmitNotice = useCallback(async (data: INoticeSchema) => {
    console.log('dataaa', data);
    await axios
      .post(CREATE_NOTICE, {
        ...data,
      })
      .then((res: any) => {
        toast.success('Successfully created new notice schema!');
        setModal(false);
      })
      .catch((error) => {
        console.log('error=', error);
      });
  }, []);

  const onError = (error: any) => {
    console.log('Error=>', error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitNotice, onError)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-4">
          <FormField
            control={form.control}
            name="noticeTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notice Heading</FormLabel>
                <FormControl className="relative">
                  <Input
                    placeholder="e.g. New year celebrations at the office."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Set the initial value for the department field */}
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Enter department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments ? (
                      <>
                        {departments.map((dep: any) => (
                          <SelectItem
                            key={dep.departmentId}
                            value={dep.departmentId}
                          >
                            {dep.departmentName}
                          </SelectItem>
                        ))}
                      </>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Set the initial value for the noticeText field */}
        <FormField
          control={form.control}
          name="noticeText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notice Details</FormLabel>
              <FormControl className="relative">
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Btn className="w-max" type="submit">
          Save
        </Btn>
      </form>
    </Form>
  );
};

export default EditNotice;
