import Modal from '@/components/atoms/Modal';
import EmployeesCreate from '@/components/molecules/hr/employees/EmployeesForm';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { GET_ALL_EMPLOYEES } from '@/lib/constants/endpoints/employee';
import useData from '@/lib/hooks/useData';
import {
  employeeColumnDef,
  IEmployee,
} from '@/lib/schema/hr/employee/employee';

import { FileInput, FileUp, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Employees = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useData<IEmployee[]>(
    ['employees'],
    GET_ALL_EMPLOYEES
  );

  useEffect(() => {
    if (router.query.id) {
      setIsModalOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);

  useEffect(() => {
    if (!isModalOpen) {
      router.replace('/hr/employees', undefined, {
        shallow: true,
      });
    }
  }, [isModalOpen]);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Modal.Trigger asChild>
              <Button
                variant="destructive"
                className="flex gap-2"
                // onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus size={20} /> <span>Add employee</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content>
              <EmployeesCreate
                setIsModalOpen={setIsModalOpen}
                employeeId={
                  router.isReady ? router.query.id?.toString() : ''
                }
              />
            </Modal.Content>
          </Modal>

          <Button variant="outline" className="flex gap-2">
            <Plus size={20} /> <span>Invite Employee</span>
          </Button>
          <Button variant="outline" className="flex gap-2">
            <FileUp size={20} /> <span>Import</span>
          </Button>
          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        {data && !isLoading ? (
          <DataTable
            data={data}
            columns={employeeColumnDef}
            searchVal="firstName"
          />
        ) : (
          <>{isError ? <div>No data.</div> : <div>Loading...</div>}</>
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
