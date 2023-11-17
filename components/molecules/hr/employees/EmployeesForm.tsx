import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
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
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { Key, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const EmployeesForm = ({
  setIsModalOpen,
  employeeId,
  refetchEmployees,
}: {
  setIsModalOpen: any;
  employeeId?: string;
  refetchEmployees: any;
}) => {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
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
            setIsModalOpen(false);
            toast.success('Successfully updated employee');
            refetchEmployees();
          })
          .catch((error) => {
            console.log('Error UPDATING employee:', error);
            toast.error(
              'There was an issue updating employee! Please try again.'
            );
          });
      } else {
        console.log('Creating employee');
        await axios
          .post(CREATE_EMPLOYEES, { ...data })
          .then((res) => {
            console.log('Successfully created employee->', res);
            toast.success('Successfully added employee');
            setIsModalOpen(false);
            refetchEmployees();
          })
          .catch((error) => {
            console.error('Error creating employee:', error);
            toast.error(
              'There was an issue adding employee! Please try again.'
            );
          });
      }
      setIsLoading(false);
    },
    [employeeData]
  );

  const onError = (error: any) => {
    console.log('Please check your input fields! ', error);
  };

  const companies = [
    {
      label: 'Thor Industries',
      companyId: '145d8d93-7ff7-4a24-a184-aa4e010e7f37',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
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
                  <FormLabel>First Name</FormLabel>
                  <FormControl className="relative">
                    <Input
                      placeholder="First Name"
                      {...field}
                      disabled={isLoading}
                      pattern={'/^[A-Za-z]+$/'}
                      title="Please only use letters for the first name"
                    />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl className="relative">
                    <Input
                      placeholder="Last Name"
                      {...field}
                      disabled={isLoading}
                      pattern={'/^[A-Za-z]+$/'}
                      title="Please only use letters for the first name"
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            {/* Company Id */}
            {/* <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Id</FormLabel>
                  <FormControl className="relative">
                    <Input
                      placeholder="Company Id"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Company</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isLoading}
                        >
                          {field.value
                            ? companies?.find(
                                (company) =>
                                  company.companyId === field.value
                              )?.label
                            : 'Choose company'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search for a company..." />
                        <CommandEmpty>No member found.</CommandEmpty>
                        <CommandGroup className="flex h-full max-h-[200px] flex-col gap-4 overflow-y-auto">
                          {companies?.map((comp, i: Key) => (
                            <CommandItem
                              value={comp.label}
                              className="flex items-center"
                              key={i}
                              onSelect={() => {
                                comp.companyId &&
                                  form.setValue(
                                    'companyId',
                                    comp?.companyId
                                  );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  comp.companyId === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {`${comp.label}`}
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
                    disabled={isLoading}
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
                  <FormLabel>Email</FormLabel>
                  <FormControl className="relative">
                    <Input
                      placeholder="Email@email.com"
                      {...field}
                      type="email"
                      disabled={isLoading}
                    />
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
                  <FormLabel>Date of birth </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'group flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isLoading}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 group-disabled:cursor-not-allowed" />
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
          <Button
            className="flex w-max flex-none items-center justify-center"
            variant="default"
            loading={isLoading}
            type="submit"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmployeesForm;
