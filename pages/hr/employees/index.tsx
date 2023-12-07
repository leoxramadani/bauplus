import Modal from '@/components/atoms/Modal';
import { DataTable } from '@/components/molecules/DataTable';
import { DataTableLoading } from '@/components/molecules/DataTable/DataTableLoading';
import EmployeesForm from '@/components/molecules/hr/employees/EmployeesForm';
import { Button } from '@/components/ui/button';
import { GET_ALL_EMPLOYEES } from '@/lib/constants/endpoints/employee';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import {
  employeeColumnDef,
  IEmployee,
} from '@/lib/schema/hr/employee/employee';

import { FileInput, FileUp, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

const Employees = () => {
  const router = useRouter();
  const { open, setOpen } = useModal();

  const {
    data,
    metadata,
    isLoading,
    isError,
    refetch: refetchEmployees,
  } = useData<IEmployee[]>(['employees'], GET_ALL_EMPLOYEES);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button variant="default" className="flex gap-2">
                <Plus size={20} /> <span>Add employee</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add Employee"
              description="Fill all the fields to add employee"
            >
              <EmployeesForm
                setIsModalOpen={setOpen}
                employeeId={
                  router.isReady ? router.query.id?.toString() : ''
                }
                refetchEmployees={refetchEmployees}
              />
            </Modal.Content>
          </Modal>

          {/* This feature can be implemented in the future */}
          {/* <Button
            variant="outline"
            className="flex gap-2"
            onClick={() => toast.success('test')}
          >
            <Plus size={20} />
            <span>Invite Employee</span>
          </Button> */}

          <Button variant="outline" className="flex gap-2">
            <FileUp size={20} /> <span>Import</span>
          </Button>

          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        {data && !isLoading ? (
          <DataTable<IEmployee>
            data={data}
            metadata={metadata}
            columns={employeeColumnDef}
            searchVal="firstName"
          />
        ) : (
          <>
            {isError ? (
              <div>No data.</div>
            ) : (
              <DataTableLoading
                columnCount={employeeColumnDef.length}
              />
            )}
          </>
        )}
      </section>

      {/* <Modal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
      >
        <EstimatesCreate />
      </Modal>
    */}
    </>
  );
};

export default Employees;
