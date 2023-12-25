import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  IMappingColumnsSchema,
  mappingColumnsSchema,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

const AttendanceTestUI = () => {
  const form = useForm<IMappingColumnsSchema>({
    resolver: zodResolver(mappingColumnsSchema),
    // values: {
    //   ...client,
    //   clientBusinessIds: client?.clientBusinessIds,
    //   clientContactInfos: client?.clientContactInfos,
    // },
  });
  const onSubmit = (data: IMappingColumnsSchema) => {
    // Array to hold transformed data
    const transformedData: any[] = [];

    console.log('Transformed Form Data:', data);
  };

  const attendanceOptions = [
    {
      SystemColumnName: 'Employee',
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

  console.log(form.watch('columns'));

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
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full max-w-7xl flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-4 lg:w-[600px]">
                {/* employee_id */}
                <div className=" gap-4">
                  <FormField
                    control={form.control}
                    name="columns"
                    render={({ field }) => {
                      return (
                        <div className="grid w-full grid-cols-2 gap-4">
                          {field.value &&
                            field.value.map((item, i) => (
                              <React.Fragment key={i}>
                                <FormField
                                  control={form.control}
                                  name={`columns.${i}.systemColumnName`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl className="relative">
                                        <Input
                                          placeholder="Employee_id"
                                          {...field}
                                          // disabled={isSubmitting}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`columns.${i}.databaseColumnName`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                        //   disabled={isSubmitting}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select an entity" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {attendanceOptions ? (
                                            <>
                                              {attendanceOptions.map(
                                                (x: any) => (
                                                  <SelectItem
                                                    key={
                                                      x.DatabaseColumnName
                                                    }
                                                    value={
                                                      x.DatabaseColumnName
                                                    }
                                                  >
                                                    {
                                                      x.DatabaseColumnName
                                                    }
                                                  </SelectItem>
                                                )
                                              )}
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
                              </React.Fragment>
                            ))}
                        </div>
                      );
                    }}
                  />
                </div>
                {/* check_in */}
              </div>

              <Button
                type="button"
                variant="link"
                onClick={() =>
                  form.setValue('columns', [
                    ...(form.getValues('columns') || []),
                    ...attendanceOptions.map((attendance) => ({
                      systemColumnName: attendance.SystemColumnName,
                      databaseColumnName: '',
                    })),
                  ])
                }
                className="flex flex-row gap-2"
              >
                {' '}
                test button for import
              </Button>

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

export default AttendanceTestUI;
