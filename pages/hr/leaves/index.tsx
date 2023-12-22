import Modal from '@/components/atoms/Modal';
import { DataTable } from '@/components/molecules/DataTable';
import LeaveForm from '@/components/molecules/hr/leaves/LeaveForm';
import { Button } from '@/components/ui/button';
import { GET_ALL_LEAVES } from '@/lib/constants/endpoints/hr/leaves';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import {
  ILeaves,
  leavesColumnDef,
} from '@/lib/schema/hr/leaves/leaves';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

const Leaves = () => {
  const router = useRouter();
  const { open, setOpen } = useModal();

  const {
    data,
    metadata,
    isError,
    isLoading,
    refetch: refetchLeaves,
  } = useData<ILeaves[]>(['leaves'], GET_ALL_LEAVES);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button variant="default" className="flex gap-1">
                <Plus  className='size-4' /> <span>New Leave</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="New Leave"
              description="Assign Leave"
            >
              <LeaveForm
                setIsModalOpen={setOpen}
                leaveId={
                  router.isReady ? router.query.id?.toString() : ''
                }
                refetchLeaves={refetchLeaves}
              />
            </Modal.Content>
          </Modal>

          <Button variant="outline" className="flex gap-1">
            <FileInput  className='size-4' /> <span>Export</span>
          </Button>
        </div>
        {data && !isLoading ? (
          <DataTable<ILeaves>
            data={data}
            metadata={metadata}
            columns={leavesColumnDef}
            searchVal="employee.firstName"
          />
        ) : (
          <>
            {isError ? <div>No data. </div> : <div>Loading...</div>}
          </>
        )}
      </section>
    </>
  );
};

export default Leaves;
