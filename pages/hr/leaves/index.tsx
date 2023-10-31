import Modal from '@/components/atoms/Modal';
import Topbar from '@/components/layout/Topbar';
import LeaveForm from '@/components/molecules/hr/leaves/LeaveForm';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { GET_ALL_LEAVES } from '@/lib/constants/endpoints/hr/leaves';
import useData from '@/lib/hooks/useData';
import {
  ILeaves,
  leavesColumnDef,
} from '@/lib/schema/hr/leaves/leaves';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Leaves = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isError, isLoading } = useData<ILeaves[]>(
    ['leaves'],
    GET_ALL_LEAVES
  );

  useEffect(() => {
    if (router.query.id) {
      setIsModalOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);
  useEffect(() => {
    if (!isModalOpen) {
      router.replace('/hr/leaves', undefined, {
        shallow: true,
      });
    }
  }, [isModalOpen]);

  console.log('Data;', data);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Modal.Trigger asChild>
              <Button variant="default" className="flex gap-2">
                <Plus size={20} /> <span>New Leave</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="New Leave"
              description="Assign Leave"
            >
              <LeaveForm
                setIsModalOpen={setIsModalOpen}
                leaveId={
                  router.isReady ? router.query.id?.toString() : ''
                }
              />
            </Modal.Content>
          </Modal>

          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        {data && !isLoading ? (
          <DataTable
            data={data}
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
