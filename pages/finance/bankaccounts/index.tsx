import React, { useState } from 'react';
import { FileInput, Plus } from 'lucide-react';
import { DataTable } from '@/components/molecules/table/DataTable';
import {
  financeColumnDef,
  IInvoice,
} from '@/lib/schema/Finance/bankaccounts';
import BankAccountCreate from '@/components/molecules/finances/bankaccount/BankAccountCreate';
import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import { GET_ALL_BANKACCOUNTS } from '@/lib/constants/endpoints/finance';
import useData from '@/lib/hooks/useData';

const BankAccounts = () => {
  const { data, isError, isLoading, error } = useData<IInvoice[]>(
    ['bank_accounts'],
    GET_ALL_BANKACCOUNTS
  );

  if (error) console.error(error);

  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="relative flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
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
              <BankAccountCreate setModal={setOpen} />
            </Modal.Content>
          </Modal>
          <Button
            variant="outline"
            className="flex gap-1 justify-center items-center "
          >
            <FileInput size={20} /> <span>Export</span>
          </Button>
        </div>
        {data && <DataTable data={data} columns={financeColumnDef} />}
        {isLoading && <p> Loading...</p>}
        {isError && (
          <p> There was something wrong, please try again later.</p>
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
