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
  IDatabaseColumnsSchema,
  databaseColumnsSchema,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const AttendanceOptionsForm = () => {
  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  const attendanceOptions = [
    {
      SystemColumnName: 'employeeId',
      DatabaseColumnName: 'employeeId',
    },
    {
      SystemColumnName: 'date',
      DatabaseColumnName: 'date',
    },
    {
      SystemColumnName: 'timein',
      DatabaseColumnName: 'timein',
    },
    {
      SystemColumnName: 'timeout',
      DatabaseColumnName: 'timeout',
    },
    {
      SystemColumnName: 'status',
      DatabaseColumnName: 'status',
    },
    {
      SystemColumnName: 'note',
      DatabaseColumnName: 'note',
    },
    {
      SystemColumnName: 'employee.employeeId',
      DatabaseColumnName: 'employee.employeeId',
    },
    {
      SystemColumnName: 'employee.firstName',
      DatabaseColumnName: 'employee.firstName',
    },
    {
      SystemColumnName: 'employee.lastName',
      DatabaseColumnName: 'employee.lastName',
    },
  ];

  const form = useForm<IDatabaseColumnsSchema>({
    resolver: zodResolver(databaseColumnsSchema),
    // values: {
    //   ...client,
    //   clientBusinessIds: client?.clientBusinessIds,
    //   clientContactInfos: client?.clientContactInfos,
    // },
  });

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
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col gap-4 lg:w-[600px]">
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
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              department
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input
                              placeholder="Department"
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
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              check in
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input
                              placeholder="Check_in"
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
                      name="shift"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              shift
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input placeholder="Shift" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              status
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
                </div>
                <div className="flex flex-col gap-4 lg:w-[600px]">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Write your{' '}
                            <span className="font-bold underline">
                              full name
                            </span>{' '}
                            column name here:
                          </FormLabel>
                          <FormControl className="relative">
                            <Input
                              placeholder="Full name"
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
                            <Input placeholder="Date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
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
