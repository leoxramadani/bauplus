import Modal from '@/components/atoms/Modal';
import AttendanceImportForm from '@/components/molecules/settings/AttendanceImportForm';
import { Button } from '@/components/ui/button';
import {
  CREATE_ATTENDANCE_MAPPING,
  GET_ATTENDANCE_BY_BRANCH,
} from '@/lib/constants/endpoints/hr/attendance';
import useModal from '@/lib/hooks/useModal';
import {
  IAttendanceOptionsSchema,
  attendanceOptionsSchema,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FileUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

const AttendanceMappingForm = () => {
  const { open, setOpen } = useModal();
  const { open: openImport, setOpen: setOpenImport } = useModal();
  const { open: attendanceOptions, setOpen: setAttendanceOptions } =
    useModal();
  const [attendanceColumns, setAttendanceColumns] =
    useState<attendaceCols[]>();
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   refetch: refetchAttendance,
  // } = useData<any>(
  //   ['attendance'],
  //   GET_ATTENDANCE_BY_BRANCH +
  //     `?branchId=${'479a3b1a-51a8-46ab-9624-09f127ba5397'}`
  // );

  useEffect(() => {
    async function getData(Id: string) {
      console.log('inside getData');
      await axios
        .get(GET_ATTENDANCE_BY_BRANCH + `?branchId=${Id}`)
        .then((res) => {
          console.log('fetching mapping options -->', res.data);
          setAttendanceColumns(res.data);
        })
        .catch((error) => {
          console.log('error fetching mapping options->', error);
        });
    }
    // 1b6c79ae-1272-42f4-a2ba-63406cc84763
    // 479a3b1a-51a8-46ab-9624-09f127ba5397
    getData('1b6c79ae-1272-42f4-a2ba-63406cc84763');
  }, []);

  const form = useForm<IAttendanceOptionsSchema>({
    resolver: zodResolver(attendanceOptionsSchema),
    //@ts-expect-error
    values: attendanceColumns &&
      attendanceColumns?.length > 0 && {
        employeeId: attendanceColumns?.filter(
          (item: attendaceCols) =>
            item.databaseColumnName === 'employeeId'
        )[0].systemColumnName,

        checkType: attendanceColumns?.filter(
          (item: attendaceCols) =>
            item.databaseColumnName === 'checkType'
        )[0].systemColumnName,
        checkTime: attendanceColumns?.filter(
          (item: attendaceCols) =>
            item.databaseColumnName === 'checkTime'
        )[0].systemColumnName,
        dataSource: attendanceColumns?.filter(
          (item: attendaceCols) =>
            item.databaseColumnName === 'dataSource'
        )[0].systemColumnName,
        checkPoint: attendanceColumns?.filter(
          (item: attendaceCols) =>
            item.databaseColumnName === 'checkPoint'
        )[0].systemColumnName,
      },
  });

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
            databaseColumnName: key,
            systemColumnName: value,
            branchId: '479a3b1a-51a8-46ab-9624-09f127ba5397',
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
    console.log('Please check your input fields!', error);
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
        <div className="flex w-fit flex-col">
          <h1 className="text-lg font-semibold">
            Attendance configuration
          </h1>
          <p className="">
            Please upload your file below to begin the mapping
            process.
          </p>
        </div>
        <div className="flex w-fit flex-col">
          {/* Import attendance */}
          <Modal open={openImport} onOpenChange={setOpenImport}>
            <Modal.Trigger asChild>
              <Button variant="outline" className="flex gap-1">
                <FileUp className="size-4" /> <span>Import</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Import an example of attendance file"
              description="Make sure your Excel file contains the necessary columns for accurate mapping."
              className="max-w-lg"
            >
              <AttendanceImportForm
                setAttendanceOptions={setAttendanceOptions}
              />
            </Modal.Content>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AttendanceMappingForm;
