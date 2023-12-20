import Modal from '@/components/atoms/Modal';
import AttendanceForm from '@/components/molecules/hr/attendance/AttendanceForm';
import ImportAttendanceForm from '@/components/molecules/hr/attendance/AttendanceImportForm';
import { DataTable } from '@/components/molecules/table/DataTable';
// import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import useModal from '@/lib/hooks/useModal';
import { NEWIAttendance } from '@/lib/schema/hr/attendance/attendance';
import { NEWattendanceColumnDef } from '@/lib/schema/hr/attendance/attendanceTable';
import { FileInput, FileUp, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

const Attendance = () => {
  const router = useRouter();
  const { open, setOpen } = useModal();
  const { open: openImport, setOpen: setOpenImport } = useModal();
  // const {
  //   data,
  //   isLoading,
  //   metadata,
  //   isError,
  //   refetch: refetchAttendance,
  // } = useData<IAttendance[]>(['attendance'], GET_ALL_ATTENDANCE);

  // console.log(data);
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          {/* Add new attendance */}
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button variant="default" className="flex gap-2">
                <Plus size={20} /> <span>New Attendance</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Register an Attendance"
              description="Fill all the fields to register an attendance"
            >
              <AttendanceForm
                setIsModalOpen={setOpen}
                attendanceId={
                  router.isReady ? router.query.id?.toString() : ''
                }
                // refetchAttendance={refetchAttendance}
              />
            </Modal.Content>
          </Modal>

          {/* Import attendance */}
          <Modal open={openImport} onOpenChange={setOpenImport}>
            <Modal.Trigger asChild>
              <Button variant="outline" className="flex gap-2">
                <FileUp size={20} /> <span>Import</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Import attendance"
              description="Upload the CSV file"
            >
              <ImportAttendanceForm />
            </Modal.Content>
          </Modal>

          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        {/* {data && (
          <DataTable<IAttendance>
            metadata={metadata}
            data={data}
            columns={attendanceColumnDef}
          />
        )}
        {isLoading && (
          <DataTableLoading
            columnCount={attendanceColumnDef.length}
          />
        )}
        {isError && (
          <p> There was something wrong, please try again later.</p>
        )} */}
        {temp && (
          <DataTable data={temp} columns={NEWattendanceColumnDef} />
        )}
      </section>
    </>
  );
};

export default Attendance;

const temp: NEWIAttendance[] = [
  {
    employeeName: 'Alice Smith',
    date: '2023-12-18T11:15:00.000Z',
    checkIn: '10:30 AM',
    checkOut: '04:45 PM',
    status: 'Pending',
  },
  {
    employeeName: 'Bob Johnson',
    date: '2023-12-18T09:00:00.000Z',
    checkIn: '08:45 AM',
    checkOut: '05:30 PM',
    status: 'Rejected',
  },
  {
    employeeName: 'Eva Williams',
    date: '2023-12-18T12:00:00.000Z',
    checkIn: '11:30 AM',
    checkOut: '07:00 PM',
    status: 'Approved',
  },
  {
    employeeName: 'Michael Davis',
    date: '2023-12-18T10:45:00.000Z',
    checkIn: '10:00 AM',
    checkOut: '05:45 PM',
    status: 'Pending',
  },
  {
    employeeName: 'Sophia Brown',
    date: '2023-12-18T08:30:00.000Z',
    checkIn: '08:15 AM',
    checkOut: '04:30 PM',
    status: 'Rejected',
  },
  {
    employeeName: 'David Miller',
    date: '2023-12-18T11:45:00.000Z',
    checkIn: '11:15 AM',
    checkOut: '06:30 PM',
    status: 'Approved',
  },
  {
    employeeName: 'Olivia Wilson',
    date: '2023-12-18T09:30:00.000Z',
    checkIn: '09:15 AM',
    checkOut: '05:45 PM',
    status: 'Pending',
  },
  {
    employeeName: 'William Taylor',
    date: '2023-12-18T12:30:00.000Z',
    checkIn: '12:15 PM',
    checkOut: '06:45 PM',
    status: 'Approved',
  },
  {
    employeeName: 'Ava Moore',
    date: '2023-12-18T10:00:00.000Z',
    checkIn: '09:30 AM',
    checkOut: '05:00 PM',
    status: 'Rejected',
  },
  {
    employeeName: 'James Anderson',
    date: '2023-12-18T08:45:00.000Z',
    checkIn: '08:30 AM',
    checkOut: '04:45 PM',
    status: 'Pending',
  },
];
