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
import { CREATE_ATTENDANCE_MAPPING } from '@/lib/constants/endpoints/hr/attendance';
import {
  IAttendanceOptionsSchema,
  attendanceOptionsSchema,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AttendanceOptionsForm = () => {
  const attendanceOptions = [
    {
      SystemColumnName: '',
      DatabaseColumnName: 'employeeId',
    },
    {
      SystemColumnName: '',
      DatabaseColumnName: 'date',
    },
    {
      SystemColumnName: '',
      DatabaseColumnName: 'timein',
    },
    {
      SystemColumnName: '',
      DatabaseColumnName: 'timeout',
    },
    {
      SystemColumnName: '',
      DatabaseColumnName: 'status',
    },
    {
      SystemColumnName: '',
      DatabaseColumnName: 'note',
    },
    // {
    //   SystemColumnName: 'employee.employeeId',
    //   DatabaseColumnName: 'employee.employeeId',
    // },
    // {
    //   SystemColumnName: '',
    //   DatabaseColumnName: 'firstName',
    // },
    // {
    //   SystemColumnName: '',
    //   DatabaseColumnName: 'lastName',
    // },
  ];

  const form = useForm<IAttendanceOptionsSchema>({
    resolver: zodResolver(attendanceOptionsSchema),
    // values: {
    //   ...client,
    //   clientBusinessIds: client?.clientBusinessIds,
    //   clientContactInfos: client?.clientContactInfos,
    // },
  });

  interface OutputObject {
    DatabaseColumnName: string;
    SystemColumnName: string;
  }

  const onSubmit = useCallback(
    async (data: IAttendanceOptionsSchema) => {
      console.log('submited data', data);

      // const outputArray: OutputObject[] = [];

      // for (const key in data) {
      //   if (
      //     data.hasOwnProperty(key) &&
      //     data[key as keyof IAttendanceOptionsSchema] !== undefined
      //   ) {
      //     outputArray.push({
      //       DatabaseColumnName: key,
      //       SystemColumnName: data[
      //         key as keyof IAttendanceOptionsSchema
      //       ] as string,
      //     });
      //   }
      // }

      const mappedColumns: OutputObject[] = Object.entries(data).map(
        ([key, value]) => {
          return {
            DatabaseColumnName: key,
            SystemColumnName: value,
          };
        }
      );

      console.log('mappedColumns=>', mappedColumns);

      await axios
        .post(CREATE_ATTENDANCE_MAPPING, mappedColumns)
        .then(() => toast.success('Successfully mapped columns'))
        .catch((error) => {
          toast.error('Error mapping columns');
          console.log('error mapping return ->', error);
        });
    },
    []
  );

  const onError = (error: any) => {
    console.log('Please check your input fields! ', error);
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">
            Attendance options
          </h1>
        </div>

        <div>
          <Form {...form}>
            <form
              className="flex w-full max-w-7xl flex-col justify-between gap-4"
              onSubmit={form.handleSubmit(onSubmit, onError)}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col gap-4 lg:w-[600px]">
                  {/* employeeId */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="employeeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              employee id
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input
                              placeholder="Employee_id"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* date */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              date
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input placeholder="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* shiftIn */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="shiftId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              Shift Id
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input
                              placeholder="Shift Id"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* timeIn */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="timeIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              Time in
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input placeholder="Time in" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* timeOut */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="timeOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              Time Out
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input
                              placeholder="Time Out"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 lg:w-[600px]">
                  {/* status */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              Status
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input placeholder="Status" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* note */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              note
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input placeholder="note" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              check out
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input
                              placeholder="Check_out"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="attended"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              attended
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input
                              placeholder="Attended"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              note
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input placeholder="Note" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}
                </div>
              </div>
              <div>
                <Button className="flex flex-row items-center justify-center gap-1">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AttendanceOptionsForm;
