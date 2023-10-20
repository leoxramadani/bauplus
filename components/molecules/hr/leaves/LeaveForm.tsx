import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  CREATE_BANK_ACCOUNT,
  GET_ONE_BANKACCOUNT,
  UPDATE_BANK_ACCOUNT,
} from '@/lib/constants/endpoints/finance';
import { ILeaves, leavesSchema } from '@/lib/schema/hr/leaves/leaves';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Key, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import format from 'date-fns/format';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import Drop from '@/components/atoms/Drop';
import { CREATE_LEAVE, GET_SPECIFIC_LEAVE, UPDATE_LEAVE } from '@/lib/constants/endpoints/hr/leaves';
import { IEmployee } from '@/lib/schema/hr/employee/employee';
import useData from '@/lib/hooks/useData';
import { GET_EMPLOYEES_BY_COMPANY } from '@/lib/constants/endpoints/employee';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
interface ICreateLeave {
  setIsModalOpen(open: boolean): void;
  leaveId?: string;
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

const LeaveForm = ({ setIsModalOpen, leaveId }: ICreateLeave) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leave, setLeave] = useState<any>();

  const {
    data: employees,
    isError: employeesIsError,
    isLoading: employeesIsLoading,
    error: employeesError,
  } = useData<IEmployee[]>(['employees'],GET_EMPLOYEES_BY_COMPANY+`?companyId=${`145d8d93-7ff7-4a24-a184-aa4e010e7f37`}`);

  useEffect(() => {
    async function getData(id: string) {
      await axios
        .get(GET_SPECIFIC_LEAVE + `?leaveId=${id}`)
        .then((res) => {
          console.log('setting leave data -->', res);
          setLeave(res.data);
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
      console.log("form data=",data);
      
      setIsSubmitting(true);
        if (leave) {
          await axios.put(UPDATE_LEAVE, {
            ...data,
            companyId: "145d8d93-7ff7-4a24-a184-aa4e010e7f37",
            employeeId: "c8018547-7470-42d6-b1a7-269b0f4edb17",
            filePath:"",
              // employeeId
              // leaveType
              // leaveStatus
              // duration
              // reason
              // filePath
              // companyId
              // isDeleted
            
          }).then((res)=>{
            console.log("res from update =>",res);
            
          }).catch((error)=>{
            console.error('Error:', error);
            // toast.error('There was an issue! Please try again.');
            
          });
          setIsSubmitting(false);
          setIsModalOpen(false);
        } else {
          await axios.post(CREATE_LEAVE,{
            ...data,
            companyId: "145d8d93-7ff7-4a24-a184-aa4e010e7f37",
            filePath:"",
          }).then((res)=>{
            console.log("res from create=>",res);
            
          }).catch((error)=>{
            console.error('Error:', error);
            // toast.error('There was an issue! Please try again.');
          });
          
          setIsSubmitting(false);
          setIsModalOpen(false);
        }
      
      setIsSubmitting(false);
    },
    [leave]
  );

  const onError = (error:any)=>{
    console.log("Error in leaves->",error);
  }


  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit,onError)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
            {/* project */}
            {/* <FormField
              control={form.control}
              name="member"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Choose Member</FormLabel>
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
                            ? members.find(
                                (member) =>
                                  member.value === field.value
                              )?.label
                            : 'Choose member'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No member found.</CommandEmpty>
                        <CommandGroup>
                          {members.map((member) => (
                            <CommandItem
                              value={member.label}
                              key={member.value}
                              onSelect={() => {
                                form.setValue('member', member.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  member.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {member.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
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


            {/* duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col justify-start gap-6">
                  <FormLabel>Select Duration</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="flex flex-row gap-4"
                      disabled={isSubmitting}
                    >
                      {duration.map((s) => (
                        <FormItem
                          key={s.value}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <RadioGroupItem value={s.value} />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            {s.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'flex w-full items-center justify-between text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isSubmitting}
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
                        //   disabled={(date) =>
                        //     date < form.getValues('paidOn')
                        //   }
                        //   initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employee */}
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Employee Name</FormLabel>
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
                        <CommandInput placeholder="Search employee..." />
                        <CommandEmpty>No employees found.</CommandEmpty>
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