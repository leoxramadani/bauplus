import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileInput, Plus } from 'lucide-react';
import { DataTable } from '@/components/molecules/table/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  financeColumnDef,
  IInvoiceSchema,
} from '@/lib/schema/Finance/bankaccounts';
import RightModal from '@/components/atoms/RightModal';
// import { Button } from '@/components/ui/button';
import BankAccountCreate from '@/components/molecules/finances/bankaccount/BankAccountCreate';
import Modal from '@/components/atoms/Modal';
// import Button from '@/components/Button';
import ModalOld from '@/components/atoms/ModalOld';
import { Button } from '@/components/ui/button';
import { GET_ALL_BANKACCOUNTS } from '@/lib/constants/endpoints/finance';
// import Modal from '@/components/atoms/ModalOld';
const BankAccounts = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [myData, setMyData] = useState<any>();

  useEffect(() => {
    async function getData() {
      const response = await fetch(GET_ALL_BANKACCOUNTS, {
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
          setMyData(data.data);
          console.log('employeeData->', data);
        })
        .catch((error) => {
          console.log('error in fetch funx->', error);
        });

      return response;
    }
    getData();
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="relative flex flex-row gap-2">
          <Modal>
            <Modal.Trigger asChild>
              <Button
                variant="destructive"
                className="flex gap-1 justify-center items-center"
              >
                <Plus size={20} /> Add Bank Account
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add Bank Account"
              description="Fill all the fields to add a bank account"
            >
              <BankAccountCreate />
            </Modal.Content>
          </Modal>
          <Button
            variant="outline"
            className="flex gap-1 justify-center items-center "
          >
            <FileInput size={20} /> <span>Export</span>
          </Button>
        </div>
        {myData && (
          <DataTable data={myData} columns={financeColumnDef} />
        )}
      </section>
    </>
  );
};

export default BankAccounts;

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};
