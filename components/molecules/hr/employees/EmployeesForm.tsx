import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CREATE_EMPLOYEES,
  GET_BY_ID_EMPLOYEE,
  UPDATE_EMPLOYEES,
} from '@/lib/constants/endpoints/employee';
import { GET_ALL_DEPATRMENTS_OF_COMAPNY } from '@/lib/constants/endpoints/hr/departments';
import useData from '@/lib/hooks/useData';
import {
  ICreateEmployee,
  createEmployeeSchema,
} from '@/lib/schema/hr/employee/employee';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
const EmployeesForm = ({
  setIsModalOpen,
  employeeId,
}: {
  setIsModalOpen: any;
  employeeId?: string;
}) => {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<any>();
  // const [departments, setDepartments] = useState<any>();

  const {
    data: departments,
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useData<any>(
    ['departments'],
    GET_ALL_DEPATRMENTS_OF_COMAPNY +
      `?companyId=${'145d8d93-7ff7-4a24-a184-aa4e010e7f37'}`
  );

  //TODO: handle null when there isn't an employee id
  // const {
  //   data: employeeData,
  //   isLoading: employeeLoading,
  //   isError: employeeError,
  // } = useData<any>(
  //   ['employee'],
  //   GET_BY_ID_EMPLOYEE + `?employeeId=${employeeId}`
  // );

  useEffect(() => {
    async function getData(Id: string) {
      console.log('inside getData');
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

  const form = useForm<ICreateEmployee>({
    resolver: zodResolver(createEmployeeSchema),
    values: { ...employeeData },
  });

  const onSubmit = useCallback(
    async (data: ICreateEmployee) => {
      console.log('form data->', data);

      if (employeeData) {
        console.log('Updating employee');
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
        console.log('Creating employee');
        await axios
          .post(CREATE_EMPLOYEES, { ...data })
          .then((res) => {
            console.log('Successfully created employee->', res);
          })
          .catch((error) => {
            console.log('Error creating employee:', error);
          });
      }

      setIsModalOpen(false);
    },
    [employeeData]
  );

  const onError = (error: any) => {
    console.log('Please check your input fields! ', error);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold text-blue-500">
          Employees
        </h2>
        <h3 className="text-lg font-normal text-gray-900">
          Add an employee
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full flex-col gap-4"
        >
          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            {/* First name */}
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
            {/* Last name */}
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

          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            {/* Company Id */}
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

            {/* Department Id */}
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

          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            {/* Email */}
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

            {/* Date of birth */}
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
                            'flex w-full items-center justify-between gap-1',
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
            className="flex w-max flex-none"
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

export default EmployeesForm;
