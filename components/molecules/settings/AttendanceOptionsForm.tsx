import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  NEWAttendanceSchema,
  NEWIAttendance,
} from '@/lib/schema/hr/attendance/attendance';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const AttendanceForm = () => {
  const cols: string[] = [];

  // const {
  //   data: clientTypes,
  //   isError: clientTypessIsError,
  //   isLoading: ClientTypesIsLoading,
  //   error: currenciesError,
  // } = useData<Array<{ [key: string]: any }>>(
  //   ['currencies'],
  //   GET_ALL_CLIENT_TYPES
  // );

  const form = useForm<NEWIAttendance>({
    resolver: zodResolver(NEWAttendanceSchema),
  });

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Attendance options</h1>
        <FormField
          control={form.control}
          name="employeeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                // disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <></>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AttendanceForm;
