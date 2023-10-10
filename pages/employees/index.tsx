import Modal from '@/components/atoms/Modal';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { GET_ALL_EMPLOYEES } from '@/lib/constants/endpoints/employee';
import useData from '@/lib/hooks/useData';
import {
  employeeDef,
  employeeSchema,
  EmployeeType,
} from '@/lib/schema/employee/employee';
import { useQuery } from '@tanstack/react-query';
import { FileInput, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Employees = () => {
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
      const response = await fetch(GET_ALL_EMPLOYEES, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.log('error->', response);
          }
          return response.json();
        })
        .then((data) => {
          setEmployeeData(data);
          console.log('employeeData->', data);
        })
        .catch((error) => {
          console.log('error in fetch funx->', error);
        });

      return response;
    }
    getData();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Button
            variant="destructive"
            className="flex gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={20} /> <span>Add employee</span>
          </Button>

          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        {employeeData && (
          <DataTable
            data={employeeData}
            columns={employeeDef}
            searchVal="firstName"
          />
        )}
      </section>

      {/* <Modal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
      >
        <EstimatesCreate />
      </Modal>

      <Modal
        openModalOutside={isEditModalOpen}
        setOpenModalOutside={setIsEditModalOpen}
      >
        a
      </Modal> */}
    </>
  );
};

export default Employees;
