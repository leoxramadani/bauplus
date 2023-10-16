import Modal from '@/components/atoms/Modal';
import BankAccountCreate from '@/components/molecules/finances/bankaccount/BankAccountCreate';
import DepartmentCreate from '@/components/molecules/hr/departments/modals/DepartmentCreate';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { GET_ALL_DEPARTMENTS } from '@/lib/constants/endpoints/hr/departments';
import useData from '@/lib/hooks/useData';
import {
  IDepartment,
  departmentColumnDef,
} from '@/lib/schema/hr/department';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Departments = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading } = useData<IDepartment[]>(
    ['departments'],
    GET_ALL_DEPARTMENTS
  );

  useEffect(() => {
    if (router.query.id) {
      setOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);

  useEffect(() => {
    if (!open) {
      router.replace('/hr/employees', undefined, {
        shallow: true,
      });
    }
  }, [open]);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <Button
              variant="destructive"
              className="flex gap-1 justify-center items-center"
            >
              <Plus size={20} /> Add Department
            </Button>
          </Modal.Trigger>
          <Modal.Content title="Add another department">
            <DepartmentCreate />
          </Modal.Content>
        </Modal>

        <Button variant="outline" className="flex gap-2">
          <FileInput /> <span>Export</span>
        </Button>
      </div>
      {data && !isLoading ? (
        <DataTable data={data} columns={departmentColumnDef} />
      ) : (
        <>{isError ? <div>No data.</div> : <div>Loading...</div>}</>
      )}
    </section>
  );
};

export default Departments;
