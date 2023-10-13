import Modal from '@/components/atoms/Modal';
import EmployeesCreate from '@/components/molecules/hr/employees/EmployeesCreate';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { GET_ALL_EMPLOYEES } from '@/lib/constants/endpoints/employee';
import {
  employeeDef,
  employeeSchema,
  EmployeeType,
} from '@/lib/schema/hr/employee/employee';
import axios from 'axios';
import { FileInput, FileUp, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Employees = () => {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<any>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // const { data, isLoading, isError, error }: any = useData(
  //   ['employees'],
  //   GET_ALL_EMPLOYEES
  // );
  // useEffect(() => {
  //   console.log('Employees-a->\n', data);

  //   if (isError) {
  //     console.log('Error from query:', isError);
  //   }
  // }, [data]);

  useEffect(() => {
    async function getData() {
      await axios
        .get(GET_ALL_EMPLOYEES)
        .then((res) => {
          console.log('response -->', res);
          setEmployeeData(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    getData();
  }, []);

  useEffect(() => {
    if (router.query.id) {
      setIsCreateModalOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal
            open={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
          >
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
                setIsCreateModalOpen={setIsCreateModalOpen}
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
        {employeeData ? (
          <DataTable
            data={employeeData}
            columns={employeeDef}
            searchVal="firstName"
          />
        ) : (
          <>No data.</>
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
