import Modal from '@/components/atoms/Modal';
import { DataTable } from '@/components/molecules/DataTable';
import AttendanceForm from '@/components/molecules/hr/attendance/AttendanceForm';
import { Button } from '@/components/ui/button';
import { GET_ALL_ATTENDANCE } from '@/lib/constants/endpoints/hr/attendance';
import useData from '@/lib/hooks/useData';
import { bankAccountColumnDef } from '@/lib/schema/Finance/bankaccounts';
import { IAttendance, attendanceColumnDef } from '@/lib/schema/hr/attendance/attendance';
import { FileInput, FileUp, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Attendance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();


  const {
    data,
    isLoading,
    isError,
    refetch: refetchAttendance,
  } = useData<IAttendance[]>(['attendance'],GET_ALL_ATTENDANCE );

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
        {data && !isLoading ? (
          <DataTable data={data} columns={attendanceColumnDef} pageCount={1}/>
        ) : (
          <>
          {isError ? (
            <div>No data.</div>
          ) : (
            <div>
              {' '}
              <p>Loading ...</p>
            </div>
          )}
        </>
      )}
        
      </section>
    </>
  );
};

export default Attendance;
