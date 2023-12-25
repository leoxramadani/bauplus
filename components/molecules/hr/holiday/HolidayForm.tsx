import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
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
import { GET_EMPLOYEES_BY_COMPANY } from '@/lib/constants/endpoints/employee';
import { CREATE_HOLIDAY } from '@/lib/constants/endpoints/hr/holiday';
import { GET_SPECIFIC_LEAVE } from '@/lib/constants/endpoints/hr/leaves';
import useData from '@/lib/hooks/useData';
import { IEmployee } from '@/lib/schema/hr/employee/employee';
import {
  IHoliday,
  holidaySchema,
} from '@/lib/schema/hr/holiday/holiday';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import format from 'date-fns/format';
import { CalendarIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { toast } from 'sonner';

interface IHolidayProps {
  setIsModalOpen(open: boolean): void;
  holidayId?: string;
  refetchHoliday?: any;
}

const types = [
  { label: 'Holiday', value: 1 },
  { label: 'None', value: 0 },
] as const;

const HolidayForm = ({
  setIsModalOpen,
  holidayId,
  refetchHoliday,
}: IHolidayProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [holiday, setHoliday] = useState<any>();

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
          setHoliday({
            ...res.data,
          });
          // setLeave(res.data);
        })
        .catch((error) => {
          console.log('error fetching leave->', error);
        });
    }

    if (holidayId) {
      getData(holidayId);
    }
  }, [holidayId]);

  const form = useForm<IHoliday>({
    resolver: zodResolver(holidaySchema),
    values: { ...holiday },
  });

  const onSubmit = useCallback(
    async (data: IHoliday) => {
      console.log('form data=', data);

      setIsSubmitting(true);
      //   if (holiday) {
      //     await axios
      //       .put(UPDATE_LEAVE, {
      //         ...data,
      //       })
      //       .then(() => {
      //         toast.success('Successfully updated leave');
      //         refetchHoliday();
      //       })
      //       .catch((error) => {
      //         console.error('Error:', error);
      //         toast.error(
      //           'There was an issue updating leave! Please try again.'
      //         );
      //       });
      //   } else {
      await axios
        .post(CREATE_HOLIDAY, {
          ...data,
          startDate: format(
            data.startDate,
            "yyyy-MM-dd'T'HH:mm:ss.SSSX"
          ),
        })
        .then(() => {
          toast.success('Successfully created holiday');
          refetchHoliday();
          setIsSubmitting(false);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error(
            'There was an issue creating holiday! Please try again.'
          );
          setIsSubmitting(false);
        });
      //   }
    },
    [holiday]
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
            {/* holiday name */}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Holiday Name</FormLabel>
                  <FormControl className="relative">
                    <Input
                      placeholder="Ex. New year's day"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Holiday Date</FormLabel>
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

            {/* nrdays */}
            <FormField
              control={form.control}
              name="nrDays"
              defaultValue={0}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Number of Days</FormLabel>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue('nrDays', field.value - 1)
                      }
                      className=" h-10 rounded-s-lg border bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        className="h-3 w-3 text-gray-900 dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <FormControl className="w-full">
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        className=" flex max-w-[3rem] items-center justify-center rounded-none border text-center hover:ring-transparent focus:ring-0  focus-visible:ring-0 focus-visible:ring-transparent"
                        type="number"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue('nrDays', field.value + 1)
                      }
                      className=" h-10 rounded-e-lg border  bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        className="h-3 w-3 text-gray-900 dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 self-start">
              <FormField
                control={form.control}
                name="holidayType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Holiday</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatAnnually"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Repeat Anually</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Reason */}
            {/* <FormField
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
            /> */}

            {/* <Drop
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}

            /> */}
          </div>

          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
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

export default HolidayForm;
