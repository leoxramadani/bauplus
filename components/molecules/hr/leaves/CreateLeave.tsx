import Drop from '@/components/atoms/Drop';
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
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ILeaves, leavesSchema } from '@/lib/schema/hr/leaves';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ICreateLeave {
  setCloseModal(open: boolean): void;
}

const CreateLeave = ({ setCloseModal }: ICreateLeave) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const members = [
    { label: 'Besir Kurtishi ', value: '001' },
    { label: 'Besir Bossi ', value: '002' },
    { label: 'Besir ronaldo Acc3', value: '003' },
    { label: 'Besir Messi Acc4', value: '004' },
    { label: 'Besir leo Acc5', value: '005' },
  ] as const;

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
    { label: 'Multiple', value: 'multiple' },
    { label: 'First Half', value: 'fh' },
    { label: 'Second Half', value: 'sh' },
  ];

  const form = useForm<ILeaves>({
    resolver: zodResolver(leavesSchema),
  });

  function onSubmit(data: ILeaves) {
    console.log(data);
  }

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
            {/* project */}
            <FormField
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
            />

            <FormField
              control={form.control}
              name="leaveType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Leave Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                      className="flex flex-row gap-4"
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
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick leave date</span>
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

            <div></div>

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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Drop
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>

          <Button className="w-max" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateLeave;
