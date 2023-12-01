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
import { Textarea } from '@/components/ui/textarea';
import { GET_EMPLOYEES_BY_COMPANY } from '@/lib/constants/endpoints/employee';
import {
  CREATE_LEAVE,
  GET_SPECIFIC_LEAVE,
  UPDATE_LEAVE,
} from '@/lib/constants/endpoints/hr/leaves';
import useData from '@/lib/hooks/useData';
import { IEmployee } from '@/lib/schema/hr/employee/employee';
import { ILeaves, leavesSchema } from '@/lib/schema/hr/leaves/leaves';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import format from 'date-fns/format';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Key, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
interface ILeavesProps {
  setIsModalOpen(open: boolean): void;
  leaveId?: string;
  refetchLeaves: any;
}

const leaves = [
  { label: 'Casual', value: 'casual' },
  { label: 'Sick', value: 'sick' },
  { label: 'Earned', value: 'earned' },
] as const;

const status = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
] as const;

const duration = [
  { label: 'Full day', value: 'full' },
  { label: 'Multiple days', value: 'multiple' },
  { label: 'First Half', value: 'fh' },
  { label: 'Second Half', value: 'sh' },
];

const LeaveForm = ({
  setIsModalOpen,
  leaveId,
  refetchLeaves,
}: ILeavesProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leave, setLeave] = useState<any>();

  const {
    data: employees,
    isError: employeesIsError,
    isLoading: employeesIsLoading,
  } = useData<IEmployee[]>(
    ['employees'],
    GET_EMPLOYEES_BY_COMPANY +
      `?companyId=${`145d8d93-7ff7-4a24-a184-aa4e010e7f37`}`
  );

  useEffect(() => {
    async function getData(id: string) {
      await axios
        .get(GET_SPECIFIC_LEAVE + `?leaveId=${id}`)
        .then((res) => {
          console.log('setting leave data -->', res);
          setLeave({
            ...res.data,
            date: {
              dateFrom: new Date(res.data.dateFrom),
              dateTo: new Date(res.data.dateTo),
            },
          });
          // setLeave(res.data);
        })
        .catch((error) => {
          console.log('error fetching leave->', error);
        });
    }

    if (leaveId) {
      getData(leaveId);
    }
  }, [leaveId]);

  const form = useForm<ILeaves>({
    resolver: zodResolver(leavesSchema),
    values: { ...leave },
  });

  const onSubmit = useCallback(
    async (data: ILeaves) => {
      console.log('form data=', data);

      setIsSubmitting(true);
      if (leave) {
        await axios
          .put(UPDATE_LEAVE, {
            ...data,
            ...data.date,
            companyId: '145d8d93-7ff7-4a24-a184-aa4e010e7f37',
            filePath: '',
          })
          .then(() => {
            toast.success('Successfully updated leave');
            refetchLeaves();
          })
          .catch((error) => {
            console.error('Error:', error);
            toast.error(
              'There was an issue updating leave! Please try again.'
            );
          });
      } else {
        await axios
          .post(CREATE_LEAVE, {
            ...data,
            ...data.date,
            companyId: '145d8d93-7ff7-4a24-a184-aa4e010e7f37',
            filePath: '',
            // dateFrom: data.dateFrom,
            // dateTo: data.dateTo,
          })
          .then(() => {
            toast.success('Successfully created leave');
            refetchLeaves();
          })
          .catch((error) => {
            console.error('Error:', error);
            toast.error(
              'There was an issue creating leave! Please try again.'
            );
          });
      }
      setIsSubmitting(false);
      setIsModalOpen(false);

      setIsSubmitting(false);
    },
    [leave]
  );

  const onError = (error: any) => {
    console.log('Error in leaves->', error);
  };

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
            {/* project */}

            {/* Leave type */}
            <FormField
              control={form.control}
              name="leaveType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Leave Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leaves.map((leave) => (
                        <SelectItem
                          value={leave.value}
                          key={leave.value}
                        >
                          {leave.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Leave status */}
            <FormField
              control={form.control}
              name="leaveStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {status.map((status) => (
                        <SelectItem
                          value={status.value}
                          key={status.value}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.dateFrom ? (
                            field.value?.dateTo ? (
                              <>
                                {format(
                                  leaves
                                    ? new Date(field.value.dateFrom)
                                    : field.value.dateFrom,
                                  'LLL dd, y'
                                )}{' '}
                                -{' '}
                                {format(
                                  leaves
                                    ? new Date(field.value.dateTo)
                                    : field.value.dateTo,
                                  'LLL dd, y'
                                )}
                              </>
                            ) : (
                              format(
                                leaves
                                  ? new Date(field.value.dateFrom)
                                  : field.value.dateFrom,
                                'LLL dd, y'
                              )
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          initialFocus
                          mode="range"
                          selected={{
                            from: field.value?.dateFrom,
                            to: field.value?.dateTo,
                          }}
                          onSelect={(range) => {
                            field.onChange({
                              target: {
                                name: 'date',
                                value: {
                                  dateFrom: range?.from,
                                  dateTo: range?.to,
                                },
                              },
                            });
                          }}
                          numberOfMonths={1}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                );
              }}
            />

            {/* Employee */}
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Employee</FormLabel>
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
                          disabled={isSubmitting}
                        >
                          {field.value
                            ? employees?.find(
                                (employee) =>
                                  employee.employeeId === field.value
                              )?.firstName +
                              ' ' +
                              employees?.find(
                                (employee) =>
                                  employee.employeeId === field.value
                              )?.lastName
                            : 'Choose employee'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search for an employee..." />
                        <CommandEmpty>
                          No employee found.
                        </CommandEmpty>
                        <CommandGroup className="flex h-full max-h-[200px] flex-col gap-4 overflow-y-auto">
                          {employees?.map((employee, i: Key) => (
                            <CommandItem
                              value={
                                employee.firstName +
                                ' ' +
                                employee.lastName
                              }
                              className="flex items-center"
                              key={i}
                              onSelect={() => {
                                employee.employeeId &&
                                  form.setValue(
                                    'employeeId',
                                    employee?.employeeId
                                  );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  employee.employeeId === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {`${employee.firstName} ${employee.lastName}`}
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

            {/* Reason */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="w-full sm:col-span-2">
                  <FormLabel>Reason for absence</FormLabel>
                  <FormControl className="relative">
                    <Textarea
                      placeholder="Reason for absence..."
                      rows={5}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <Drop
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}

            /> */}
          </div>

          <Button
            // loading={isSubmitting}
            className="w-max"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LeaveForm;
