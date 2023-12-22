import Modal from '@/components/atoms/Modal';
import BankAccountCreate from '@/components/molecules/finances/bankaccount/BankAccountCreate';
import { DataTable } from '@/components/molecules/table/DataTable';
import { DataTableLoading } from '@/components/molecules/table/DataTableLoading';
import { Button } from '@/components/ui/button';
import { GET_ALL_BANKACCOUNTS } from '@/lib/constants/endpoints/finance';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import {
  IBank,
  bankAccountColumnDef,
} from '@/lib/schema/Finance/bankaccounts';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

const BankAccounts = () => {
  const router = useRouter();
  const { open, setOpen } = useModal();
  const {
    data,
    isError,
    isLoading,
    error,
    refetch: bankRefetch,
  } = useData<IBank[]>(['bank_accounts'], GET_ALL_BANKACCOUNTS);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="relative flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button
                variant="default"
                className="flex items-center justify-center gap-1"
              >
                <Plus className="size-4" /> Add Bank Account
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add Bank Account"
              description="Fill all the fields to add a bank account"
            >
              <BankAccountCreate
                bankAccountId={
                  router.isReady ? router.query.id?.toString() : ''
                }
                setModal={setOpen}
                bankRefetch={bankRefetch}
              />
            </Modal.Content>
          </Modal>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-1 "
          >
            <FileInput className="size-4" /> <span>Export</span>
          </Button>
        </div>
        {data && (
          <DataTable data={data} columns={bankAccountColumnDef} />
        )}
        {isLoading && (
          <DataTableLoading
            columnCount={bankAccountColumnDef.length}
          />
        )}
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
