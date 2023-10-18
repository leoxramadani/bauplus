import { Button } from '@/components/ui/button';
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
  CREATE_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  UPDATE_DEPARTMENT,
} from '@/lib/constants/endpoints/hr/departments';
import useData from '@/lib/hooks/useData';
import {
  IDepartment,
  departmentSchema,
} from '@/lib/schema/hr/department';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useForm } from 'react-hook-form';

const DepartmentForm = ({
  setModalOpen,
  departmentId,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  departmentId?: string;
}) => {
  const router = useRouter();

  const { data } = useData<IDepartment>(
    ['department', departmentId],
    GET_ALL_DEPARTMENTS,
    !!departmentId
  );

  const form = useForm<IDepartment>({
    resolver: zodResolver(departmentSchema),
    values: data,
  });

  const { mutate: create } = useMutation({
    mutationFn: (data: IDepartment) =>
      axios.post(CREATE_DEPARTMENT, data),
  });

  const { mutate: update } = useMutation({
    mutationFn: (data: IDepartment) =>
      axios.post(UPDATE_DEPARTMENT, data),
  });

  const onSubmit = async (data: IDepartment) => {
    if (departmentId) {
      update(data);
    } else create(data);
  };

  const onError = (error: any) => console.error(error);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Id</FormLabel>
                <FormControl className="relative">
                  <Input placeholder="Department ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Name</FormLabel>
                <FormControl className="relative">
                  <Input placeholder="Department Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Id</FormLabel>
                <FormControl className="relative">
                  <Input placeholder="Company Id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentDepartmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent department Id </FormLabel>
                <FormControl className="relative">
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-max flex flex-none" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default DepartmentForm;
