import Modal from '@/components/atoms/Modal';
import { DataTable } from '@/components/molecules/DataTable';
import DepartmentsForm from '@/components/molecules/hr/departments/DepartmentsForm';
import { Button } from '@/components/ui/button';
import { GET_ALL_DEPARTMENTS } from '@/lib/constants/endpoints/hr/departments';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import {
  IDepartment,
  departmentColumnDef,
} from '@/lib/schema/hr/departments/departments';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

const Departments = () => {
  const router = useRouter();
  const { open, setOpen } = useModal();
  const {
    data,
    metadata,
    isError,
    isLoading,
    refetch: refetchDepartments,
  } = useData<IDepartment[]>(['departments'], GET_ALL_DEPARTMENTS);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button
                variant="default"
                className="flex items-center justify-center gap-1"
              >
                <Plus className="size-4" />
                Add Department
              </Button>
            </Modal.Trigger>
            <Modal.Content title="Add another department">
              {/* <DepartmentCreate /> */}
              <DepartmentsForm
                setIsModalOpen={setOpen}
                departmentId={
                  router.isReady ? router.query.id?.toString() : ''
                }
                refetchDepartments={refetchDepartments}
              />
            </Modal.Content>
          </Modal>

          <Button variant="outline" className="flex gap-1">
            <FileInput className="size-4" /> <span>Export</span>
          </Button>
        </div>
        {data && !isLoading ? (
          <DataTable<IDepartment>
            data={data}
            metadata={metadata}
            columns={departmentColumnDef}
            searchVal="departmentName"
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

export default Departments;
