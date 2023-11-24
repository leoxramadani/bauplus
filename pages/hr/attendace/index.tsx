import Modal from '@/components/atoms/Modal';
import { DataTable } from '@/components/molecules/DataTable';
import { DataTableLoading } from '@/components/molecules/DataTable/DataTableLoading';
import AttendanceForm from '@/components/molecules/hr/attendance/AttendanceForm';
// import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { GET_ALL_ATTENDANCE } from '@/lib/constants/endpoints/hr/attendance';
import useData from '@/lib/hooks/useData';
import { IAttendance } from '@/lib/schema/hr/attendance/attendance';
import { attendanceColumnDef } from '@/lib/schema/hr/attendance/attendanceTable';
import { FileInput, FileUp, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Attendance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setIsModalOpen(true);
    }
  }, [router.query.id]);

  const removeIdFromQuery = () => {
    const { id, ...queryWithoutId } = router.query;
    router.push(
      { pathname: router.pathname, query: queryWithoutId },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!isModalOpen) {
      removeIdFromQuery();
    }
  }, [isModalOpen]);

  const {
    data,
    isLoading,
    metadata,
    isError,
    refetch: refetchAttendance,
  } = useData<IAttendance[]>(['attendance'], GET_ALL_ATTENDANCE);

  console.log(data);
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                setIsModalOpen={setIsModalOpen}
                attendanceId={
                  router.isReady ? router.query.id?.toString() : ''
                }
                refetchAttendance={refetchAttendance}
              />
            </Modal.Content>
          </Modal>

          <Button variant="outline" className="flex gap-2">
            <FileUp size={20} /> <span>Import</span>
          </Button>
          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        {data && (
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
        )}
      </section>
    </>
  );
};

export default Attendance;
