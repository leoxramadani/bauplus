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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CREATE_DEPARTMENT,
  GET_SPECIFIC_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from '@/lib/constants/endpoints/hr/departments';
import { GET_ALL_DEPARTMENTS } from '@/lib/constants/endpoints/hr/departments';
import useData from '@/lib/hooks/useData';
import {
  DepartmentSchema,
  DepartmentType,
} from '@/lib/schema/hr/departments';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface DepartmentsFormProps {
  setIsModalOpen: any;
  departmentId?: string;
}

const DepartmentsForm = ({
  setIsModalOpen,
  departmentId,
}: DepartmentsFormProps) => {
  const router = useRouter();
  const [departmentData, setDepartmentData] = useState<any>();

  const {
    data: parentDepartments,
    isLoading,
    isError,
  } = useData<any>(['parentDepartments'], GET_ALL_DEPARTMENTS);

  useEffect(() => {
    console.log('inside getData');
    async function getData(Id: string) {
      await axios
        .get(GET_SPECIFIC_DEPARTMENT + `?Id=${Id}`)
        .then((res) => {
          console.log('setting employee data -->', res);
          setDepartmentData(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    if (departmentId) {
      getData(departmentId);
    }
  }, [departmentId]);

  const form = useForm<DepartmentType>({
    resolver: zodResolver(DepartmentSchema),
    values: { ...departmentData },
  });

  const onSubmit = useCallback(
    async (data: DepartmentType) => {
      console.log('form data ->', data);

      if (departmentData) {
        await axios
          .put(UPDATE_DEPARTMENT, {
            departmentName: data.departmentName,
            companyId: data.companyId,
            departmentId: data.departmentId,
            parentDepartmentId: data.parentDepartmentId,
          })
          .then((res) => {
            console.log('update department->', res);
            router.replace('/hr/departments', undefined, {
              shallow: true,
            });
          })
          .catch((error) => {
            console.log('Error UPDATING department:', error);
          });
      } else {
        await axios
          .post(CREATE_DEPARTMENT, {
            departmentName: data.departmentName,
            companyId: data.companyId,
            // departmentId: data.departmentId,
            parentDepartmentId: data.parentDepartmentId,
          })
          .then((res) => {
            console.log('Successfully created department->', res);
          })
          .catch((error) => {
            console.log('Error creating department:', error);
          });
      }
      setIsModalOpen(false);
    },
    [departmentData]
  );

  const onError = (error: any) => {
    console.log('Please check your input fields!', error);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4 w-full"
        >
          {/* <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4"> */}
          {/* <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                    Department Id<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="relative">
                      <Input placeholder="Department Id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

          {/* </div> */}
          <FormField
            control={form.control}
            name="departmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Department Name
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="relative">
                  <Input placeholder="Department Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company Id<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Company Id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="parentDepartmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Parent Department Id
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">

                    <Input
                      placeholder="Parent Department Id"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter department" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {parentDepartments ? (
                        <>
                          {parentDepartments.map((dep: any) => (
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
          <hr />
          <Button
            className="w-max flex flex-none"
            variant="outline"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DepartmentsForm;
