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
  IDatabaseColumnsSchema,
  databaseColumnsSchema,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const AttendanceTestUI = () => {
  const form = useForm<IDatabaseColumnsSchema>({
    resolver: zodResolver(databaseColumnsSchema),
    // values: {
    //   ...client,
    //   clientBusinessIds: client?.clientBusinessIds,
    //   clientContactInfos: client?.clientContactInfos,
    // },
  });
  const onSubmit = (data: any) => {
    // Array to hold transformed data
    const transformedData: any[] = [];

    // Loop through the keys in form data
    Object.keys(data).forEach((key) => {
      const inputValue = data[key];
      const matchingOption = attendanceOptions.find(
        (option: any) => option.DatabaseColumnName === inputValue
      );

      if (matchingOption) {
        transformedData.push({
          DatabaseColumnName: inputValue,
          SystemColumnName: matchingOption.SystemColumnName,
        });
      }
    });

    console.log('Transformed Form Data:', transformedData);
  };

  const attendanceOptions = [
    {
      SystemColumnName: '',
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
              className="flex w-full max-w-7xl flex-col justify-between gap-4 lg:flex-row"
            >
              <div className="flex flex-col gap-4 lg:w-[600px]">
                {/* employee_id */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="employeeId"
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
                    name="employeeId"
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
                                {attendanceOptions.map((x: any) => (
                                  <SelectItem
                                    key={x.DatabaseColumnName}
                                    value={x.DatabaseColumnName}
                                  >
                                    {x.DatabaseColumnName}
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
                {/* check_in */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="timeIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Check in"
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
                    name="timeIn"
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
                                {attendanceOptions.map((x: any) => (
                                  <SelectItem
                                    key={x.DatabaseColumnName}
                                    value={x.DatabaseColumnName}
                                  >
                                    {x.DatabaseColumnName}
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
                {/* shift */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="shiftId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Shift"
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
                    name="shiftId"
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
                                {attendanceOptions.map((x: any) => (
                                  <SelectItem
                                    key={x.DatabaseColumnName}
                                    value={x.DatabaseColumnName}
                                  >
                                    {x.DatabaseColumnName}
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
                {/* status */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Status"
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
                    name="status"
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
                                {attendanceOptions.map((x: any) => (
                                  <SelectItem
                                    key={x.DatabaseColumnName}
                                    value={x.DatabaseColumnName}
                                  >
                                    {x.DatabaseColumnName}
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
              </div>
              <div className="flex flex-col gap-4 lg:w-[600px]">
                {/* date */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Date"
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
                    name="date"
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
                                {attendanceOptions.map((x: any) => (
                                  <SelectItem
                                    key={x.DatabaseColumnName}
                                    value={x.DatabaseColumnName}
                                  >
                                    {x.DatabaseColumnName}
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
                {/* check_out */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="timeOut"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Check out"
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
                    name="timeOut"
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
                                {attendanceOptions.map((x: any) => (
                                  <SelectItem
                                    key={x.DatabaseColumnName}
                                    value={x.DatabaseColumnName}
                                  >
                                    {x.DatabaseColumnName}
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
                {/* note */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Note"
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
                    name="note"
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
                                {attendanceOptions.map((x: any) => (
                                  <SelectItem
                                    key={x.DatabaseColumnName}
                                    value={x.DatabaseColumnName}
                                  >
                                    {x.DatabaseColumnName}
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

export default AttendanceTestUI;
