import React, { useCallback, useEffect, useState } from 'react';
import {
  IEmployee,
  employeeColumnDef,
  employeeSchema,
} from '@/lib/schema/hr/employee/employee';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import axios from 'axios';
import {
  CREATE_EMPLOYEES,
  GET_BY_ID_EMPLOYEE,
  UPDATE_EMPLOYEES,
} from '@/lib/constants/endpoints/employee';
import { useRouter } from 'next/router';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GET_ALL_DEPARTMENTS } from '@/lib/constants/endpoints/department';
const EmployeesCreate = ({
  setIsCreateModalOpen,
  employeeId,
}: {
  setIsCreateModalOpen: any;
  employeeId?: string;
}) => {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<any>();
  const [departments, setDepartments] = useState<any>();

  useEffect(() => {
    async function getData(Id: string) {
      await axios
        .get(GET_BY_ID_EMPLOYEE + `?employeeId=${Id}`)
        .then((res) => {
          console.log('setting employee data -->', res);
          setEmployeeData(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    if (employeeId) {
      getData(employeeId);
    }
  }, [employeeId]);

  useEffect(() => {
    async function getDepartments() {
      await axios
        .get(GET_ALL_DEPARTMENTS)
        .then((res) => {
          setDepartments(res.data);

          console.log('Departments:', res.data);
        })
        .catch((error) => {
          console.log('error=', error);
        });
    }

    getDepartments();
  }, []);

  useEffect(() => {
    async function getDepartments() {
      await axios
        .get(GET_ALL_DEPARTMENTS)
        .then((res) => {
          setDepartments(res.data);

          console.log('Departments:', res.data);
        })
        .catch((error) => {
          console.log('error=', error);
        });
    }

    getDepartments();
  }, []);

  const form = useForm<IEmployee>({
    resolver: zodResolver(employeeSchema),
    values: { ...employeeData },
  });

  const onSubmit = useCallback(
    async (data: IEmployee) => {
      console.log('Employee data', employeeData);

      if (employeeData) {
        console.log('employeeData=>', employeeData);
        console.log('data=======>', data);
        await axios
          .put(UPDATE_EMPLOYEES, {
            ...data,
            // employeeId: employeeData.employeeId,
            // dateOfBirth: new Date(data.dateOfBirth).toISOString(),
          })
          .then((res) => {
            console.log('UPDATED employee->', res);
            router.replace('/hr/employees', undefined, {
              shallow: true,
            });
          })
          .catch((error) => {
            console.log('Error UPDATING employee:', error);
          });
      } else {
        console.log('No employee data');
        await axios
          .post(CREATE_EMPLOYEES, { ...data })
          .then((res) => {
            console.log('Successfully created employee->', res);
          })
          .catch((error) => {
            console.log('Error creating employee:', error);
          });
      }

      setIsCreateModalOpen(false);
    },
    [employeeData]
  );

  const onError = (error: any) => {
    console.log('Please check your input fields! ', error);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h2 className="text-3xl font-bold text-blue-500">
          Employees
        </h2>
        <h3 className="font-normal text-lg text-gray-900">
          Add an employee
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4 w-full"
        >
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
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Department Id
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="departmentId" {...field} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Email@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Date of birth{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full flex items-center gap-1 justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
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
                        disabled={(date) =>
                          date > new Date() ||
                          date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription> */}
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

export default EmployeesCreate;
