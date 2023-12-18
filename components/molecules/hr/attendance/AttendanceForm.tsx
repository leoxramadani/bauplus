'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
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
import { GET_ALL_EMPLOYEES } from '@/lib/constants/endpoints/employee';
import {
  CREATE_ATTENDANCE,
  GET_ALL_SHIFTS,
  GET_SPECIFIC_ATTENDANCE,
  UPDATE_ATTENDANCE,
} from '@/lib/constants/endpoints/hr/attendance';
import { GET_ALL_LEAVES_TYPE } from '@/lib/constants/endpoints/hr/leaves';
import { weekdays } from '@/lib/helper/helper';
import useData from '@/lib/hooks/useData';
import {
  AttendanceSchema,
  IAttendance,
  IShifts,
} from '@/lib/schema/hr/attendance/attendance';
import { IEmployee } from '@/lib/schema/hr/employee/employee';
import { ILeavesType } from '@/lib/schema/hr/leaves/leaves';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import format from 'date-fns/format';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Key, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
interface ICreateAttendance {
  setIsModalOpen(open: boolean): void;
  attendanceId?: string;
  refetchAttendance?: any;
}

const AttendanceForm = ({
  setIsModalOpen,
  attendanceId,
  refetchAttendance,
}: ICreateAttendance) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendance, setAttendance] = useState<any>();
  const [attendanceLoading, setAttendanceLoading] = useState(false);

  const {
    data: employees,
    isError: employeesIsError,
    isLoading: employeesIsLoading,
  } = useData<IEmployee[]>(
    ['employees'],
    //TODO: employes by company is not working in attendance branch
    // GET_EMPLOYEES_BY_COMPANY +
    //   `?companyId=${`145d8d93-7ff7-4a24-a184-aa4e010e7f37`}`
    GET_ALL_EMPLOYEES
  );

  const {
    data: leaveTypes,
    isError: leaveTypesError,
    isLoading: leaveTypesLoading,
  } = useData<ILeavesType[]>(['leavesType'], GET_ALL_LEAVES_TYPE);
  const {
    data: shifts,
    isError: shiftsError,
    isLoading: shiftsLoading,
  } = useData<IShifts[]>(['shifts'], GET_ALL_SHIFTS);

  useEffect(() => {
    async function getData(id: string) {
      setAttendanceLoading(true);
      await axios
        .get(GET_SPECIFIC_ATTENDANCE + `?AttendanceRecordId=${id}`)
        .then((res) => {
          setAttendanceLoading(false);
          setAttendance(res.data);
        })
        .catch(() => {
          toast.error(
            'There was an issue getting the selected attendance!'
          );
        });
    }

    if (attendanceId) {
      getData(attendanceId);
    }
  }, [attendanceId]);

  const form = useForm<IAttendance>({
    resolver: zodResolver(AttendanceSchema),
    values: {
      ...attendance,
      date: attendance?.date ? new Date(attendance?.date) : undefined,
      checkIn: attendance?.checkIn || '00:00:00',
      checkOut: attendance?.checkOut || '00:00:00',
      late: attendance?.late == 1 ? true : false,
      earlyLeave: attendance?.earlyLeave == 1 ? true : false,
      attended: attendance?.attended == 1 ? true : false,
      worked: attendance?.worked == 1 ? true : false,
      break: attendance?.break == 1 ? true : false,
    },
  });

  console.log(attendanceLoading);

  const onSubmit = useCallback(
    async (data: IAttendance) => {
      console.log('form data=', data);

      const updatedAttendanceData = {
        ...data,
        attendanceRecordId: attendanceId,
        date: format(data.date, "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
        checkIn: format(
          new Date(`1970-01-01T${data.checkIn}`),
          'HH:mm:ss'
        ),
        checkOut: format(
          new Date(`1970-01-01T${data.checkOut}`),
          'HH:mm:ss'
        ),
        earlyLeave: data.earlyLeave ? 1 : 0,
        attended: data.attended ? 1 : 0,
        worked: data.worked ? 1 : 0,
        break: data.break ? 1 : 0,
        late: data.late ? 1 : 0,
      };

      console.log('update:', updatedAttendanceData);
      setIsSubmitting(true);
      if (attendance) {
        await axios
          .put(UPDATE_ATTENDANCE, updatedAttendanceData)
          .then((res) => {
            console.log('res from update =>', res);
            toast.success('Attendance updated successfully!');
            setIsModalOpen(false);
            refetchAttendance();
          })
          .catch((error) => {
            console.error('Error:', error.response);
            toast.error(
              'There was an issue updating attendance! Please try again.'
            );
          });
        setIsSubmitting(false);
      } else {
        await axios
          .post(CREATE_ATTENDANCE, {
            ...data,
            date: format(data.date, "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
            checkIn: format(
              new Date(`1970-01-01T${data.checkIn}`),
              'HH:mm:ss'
            ),
            checkOut: format(
              new Date(`1970-01-01T${data.checkOut}`),
              'HH:mm:ss'
            ),
            late: data.late ? 1 : 0,

            earlyLeave: data.earlyLeave ? 1 : 0,
            attended: data.attended ? 1 : 0,
            worked: data.worked ? 1 : 0,
            break: data.break ? 1 : 0,
          })
          .then((res) => {
            console.log('res from create=>', res);
            toast.success('Attendance registered successfully!');
            setIsModalOpen(false);
            refetchAttendance();
          })
          .catch((error) => {
            console.error('Error:', error);
            toast.error(
              'There was an issue registering attendance! Please try again.'
            );
          });

        setIsSubmitting(false);
      }

      setIsSubmitting(false);
    },
    [attendance]
  );

  const onError = (error: any) => {
    console.log('Error in leaves->', error);
  };

  return (
    !employeesIsLoading &&
    !leaveTypesLoading &&
    !shiftsLoading && (
      <div className="z-0 flex w-full flex-col gap-4  ">
        {/* {attendance &&
        attendanceLoading === true &&
        !leaveTypesLoading &&
        !shiftsLoading && (
          <div
            tabIndex={0}
            className="absolute inset-0 z-50 flex h-full w-full items-center justify-center rounded-lg bg-black/30"
          >
            <Loader2 className="h-16 w-16 animate-spin text-slate-100" />
          </div>
        )} */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
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
                                    employee.employeeId ===
                                    field.value
                                )?.firstName +
                                ' ' +
                                employees?.find(
                                  (employee) =>
                                    employee.employeeId ===
                                    field.value
                                )?.lastName
                              : 'Choose employee'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search employee..." />
                          <CommandEmpty>
                            No employees found.
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
                                  form.setValue(
                                    'employeeName',
                                    `${employee.firstName} ${employee.lastName}`
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4 transition-all',
                                    employee.employeeId ===
                                      field.value
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

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'group flex w-full items-center justify-between gap-1',
                              !field.value && 'text-muted-foreground'
                            )}
                            disabled={isSubmitting}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 group-disabled:cursor-not-allowed" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date('2017-01-01')
                          }
                          fromYear={1960}
                          toYear={2030}
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

              {/* Shifts */}
              <FormField
                control={form.control}
                name="shiftId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Shift</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shifts?.map((shift) => (
                          <SelectItem
                            value={shift.shiftId}
                            key={shift.shiftId}
                          >
                            {shift.shiftName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="col-span-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"> */}
              <FormField
                control={form.control}
                name="weekDay"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Week day</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select week day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {weekdays?.map((day, i: Key) => (
                          <SelectItem value={day.short} key={i}>
                            {day.day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Check In</FormLabel>
                    <FormControl className="relative">
                      <Input
                        placeholder="time"
                        type="time"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Check Out</FormLabel>
                    <FormControl className="relative">
                      <Input
                        placeholder="time"
                        type="time"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* </div> */}
              {/* different */}
              <div className="col-span-2 grid w-full grid-cols-2 items-center gap-4 py-4 sm:grid-cols-5 sm:gap-2">
                <FormField
                  control={form.control}
                  name="late"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormLabel className="flex w-full cursor-pointer flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        Late
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="earlyLeave"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormLabel className="flex w-full cursor-pointer flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        Early Leave
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attended"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormLabel className="flex w-full cursor-pointer flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        Attended
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="worked"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormLabel className="flex w-full cursor-pointer flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        Worked
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="break"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormLabel className="flex w-full cursor-pointer flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        Break
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Leave type */}
              <FormField
                control={form.control}
                name="leaveTypeId"
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
                        {leaveTypes?.map((leave) => (
                          <SelectItem
                            value={leave.leaveTypeId}
                            key={leave.leaveTypeId}
                          >
                            {leave.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              className="mt-8 w-max"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    )
  );
};

export default AttendanceForm;
