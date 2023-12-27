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
  CREATE_ATTENDANCE_MAPPING,
  GET_ATTENDANCE_BY_BRANCH,
  UPDATE_ATTENDANCE_MAPPING,
} from '@/lib/constants/endpoints/hr/attendance';
import useData from '@/lib/hooks/useData';
import {
  IAttendanceOptionsSchema,
  attendanceOptionsSchema,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { toast } from 'sonner';

interface OutputObject {
  databaseColumnName: string;
  systemColumnName: string;
  branchId: string;
}

type attendaceCols = {
  templateAttendanceMappingId: string;
  systemColumnName: string;
  databaseColumnName: string;
  branchId: string;
};

// 1b6c79ae-1272-42f4-a2ba-63406cc84763 //--AlbArchitect
// 479a3b1a-51a8-46ab-9624-09f127ba5397 //--Thor

const BranchId = `1b6c79ae-1272-42f4-a2ba-63406cc84763`;

const AttendanceOptionsForm = () => {
  const {
    data: attendanceColumns,
    isLoading,
    isError,
    refetch: refetchAttendance,
  } = useData<attendaceCols[]>(
    ['attendance'],
    GET_ATTENDANCE_BY_BRANCH + `?branchId=${BranchId}`
  );

  console.log('attendanceColumns-->', attendanceColumns);

  const formValues: IAttendanceOptionsSchema =
    attendanceColumns && attendanceColumns?.length > 0
      ? attendanceColumns.reduce((values: any, item: any) => {
          switch (item.databaseColumnName) {
            case 'employeeId':
            case 'checkType':
            case 'checkTime':
            case 'dataSource':
            case 'checkPoint':
              values[
                item.databaseColumnName as keyof IAttendanceOptionsSchema
              ] = item.systemColumnName;
              break;
            default:
              break;
          }
          return values;
        }, {} as Partial<IAttendanceOptionsSchema>)
      : {};

  const form = useForm<IAttendanceOptionsSchema>({
    resolver: zodResolver(attendanceOptionsSchema),
    values: formValues,
  });

  const onSubmit = useCallback(
    async (data: IAttendanceOptionsSchema) => {
      console.log('submited data', data);
      const mappedColumns: OutputObject[] = Object.entries(data).map(
        ([key, value], index) => {
          if (attendanceColumns && attendanceColumns.length > 0) {
            console.log('there is data');
            return {
              templateAttendanceMappingId:
                attendanceColumns[index].templateAttendanceMappingId,
              databaseColumnName: key,
              systemColumnName: value,
              branchId: BranchId,
            };
          }

          return {
            databaseColumnName: key,
            systemColumnName: value,
            branchId: BranchId,
          };
        }
      );
      if (attendanceColumns && attendanceColumns.length > 0) {
        console.log('UUUUPPPDDDAAATTTEEE');

        await axios
          .put(UPDATE_ATTENDANCE_MAPPING, mappedColumns)
          .then(() =>
            toast.success('Successfully updated mapped columns')
          )
          .catch((error) => {
            toast.error('Error updating mapping columns');
            console.log('Error updating mapping return ->', error);
          });
      } else {
        console.log('CCCRREEEAAATTTEEE');

        await axios
          .post(CREATE_ATTENDANCE_MAPPING, mappedColumns)
          .then(() => toast.success('Successfully mapped columns'))
          .catch((error) => {
            toast.error('Error mapping columns');
            console.log('error mapping return ->', error);
          });
      }
    },
    [attendanceColumns]
  );

  const onError = (error: any) => {
    console.log('Please check your input fields!', error);
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
              <div className="grid grid-cols-2 gap-5">
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
                            placeholder="employee id"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* checkType */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Write your{' '}
                          <span className="font-bold underline">
                            Check Type
                          </span>{' '}
                          column name here:
                        </FormLabel>
                        <FormControl className="relative">
                          <Input
                            placeholder="Check Type"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* checkTime */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Write your{' '}
                          <span className="font-bold underline">
                            Check Time
                          </span>{' '}
                          column name here:
                        </FormLabel>
                        <FormControl className="relative">
                          <Input
                            placeholder="Check Time"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Data Source */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dataSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Write your{' '}
                          <span className="font-bold underline">
                            Data Source
                          </span>{' '}
                          column name here:
                        </FormLabel>
                        <FormControl className="relative">
                          <Input
                            placeholder="Data source ..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Work Type */}
                {/* <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="workType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Write your{' '}
                          <span className="font-bold underline">
                            Work Type
                          </span>{' '}
                          column name here:
                        </FormLabel>
                        <FormControl className="relative">
                          <Input placeholder="Work Type" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                {/* checkPoint */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Write your{' '}
                          <span className="font-bold underline">
                            Check Point
                          </span>{' '}
                          column name here:
                        </FormLabel>
                        <FormControl className="relative">
                          <Input
                            placeholder="Check Point"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* note */}
                {/* <div className="grid grid-cols-2 gap-4">
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
