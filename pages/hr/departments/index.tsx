import { Button } from '@/components/ui/button';
import { FileInput, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DepartmentType,DepartmentDef } from '@/lib/schema/Finance/departments';
import { GET_ALL_DEPARTMENTS } from '@/lib/constants/endpoints/department';
import axios from 'axios';
import { DataTable } from '@/components/molecules/table/DataTable';
import Modal from '@/components/atoms/Modal';
import DepartmentsForm from '@/components/molecules/hr/departments/DepartmentsForm';
import { useRouter } from 'next/router';

const Departments = () => {
  const router=useRouter();
  const [departmentsData,setDepartmentsData]=useState<any>();
  const [isModalOpen,setIsModalOpen]=useState(false);
  useEffect(() => {
    async function getData() {
      await axios
        .get(GET_ALL_DEPARTMENTS)
        .then((res) => {
          console.log('response -->', res);
          setDepartmentsData(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    getData();
  }, []);


  useEffect(() => {
    if (router.query.id) {
      setIsModalOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);


  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        
        <Modal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        >
          <Modal.Trigger asChild>
            <Button variant="destructive" className="flex gap-2">
              <Plus size={20} /> <span>Add Department</span>
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <DepartmentsForm  
              departmentId={
                router.isReady ? router.query.id?.toString() : ''
              }
              setIsModalOpen={setIsModalOpen}
            />
          </Modal.Content>
        </Modal>

        <Button variant="outline" className="flex gap-2">
          <FileInput /> <span>Export</span>
        </Button>
      </div>
      {
        departmentsData?
        <DataTable data={departmentsData} columns={DepartmentDef} searchVal='departmentId'/> :
        <div>Loading ...</div>
      }
    </section>
  );
};

export default Departments;
