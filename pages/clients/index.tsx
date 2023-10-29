import Modal from '@/components/atoms/Modal';
import ClientsForm from '@/components/molecules/Clients/ClientsForm';
import ClientsCreate from '@/components/molecules/Clients/ClientsForm';
import BankAccountCreate from '@/components/molecules/finances/bankaccount/BankAccountCreate';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { GET_ALL_CLIENTS } from '@/lib/constants/endpoints/clients';
import useData from '@/lib/hooks/useData';
import {
  IClients,
  clientSubColumnDef,
  clientsColumnDef,
} from '@/lib/schema/Clients/clients';
import { Row } from '@tanstack/react-table';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Clients = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isError, isLoading, error } = useData<IClients[]>(
    ['clients'],
    GET_ALL_CLIENTS
  );
  useEffect(() => {
    if (router.query.id) {
      setIsOpen(true);
    }
    // console.log('router==', router);
  }, [router.query.id]);

  useEffect(() => {
    if (!isOpen) {
      router.replace('/clients', undefined, {
        shallow: true,
      });
    }
  }, [isOpen]);

  const renderSubComponent = ({ row }: { row: Row<IClients> }) => {
    return (
      <pre style={{ fontSize: '10px' }}>
        <code>{JSON.stringify(row.original, null, 2)}</code>
      </pre>
    );
  };

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="relative flex flex-row gap-2">
          <Modal open={isOpen} onOpenChange={setIsOpen}>
            <Modal.Trigger asChild>
              <Button
                variant="destructive"
                className="flex items-center justify-center gap-1"
              >
                <Plus size={20} /> Add new client
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add New Client"
              description="Fill all the fields to add a new client"
            >
              <ClientsForm
                setModal={setIsOpen}
                clientId={
                  router.isReady ? router.query.id?.toString() : ''
                }
              />
            </Modal.Content>
          </Modal>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-1 "
          >
            <FileInput size={20} /> <span>Export</span>
          </Button>
        </div>
        {data && (
          <DataTable
            data={data}
            columns={clientsColumnDef}
            subcolumns={clientSubColumnDef}
            renderSubComponent={renderSubComponent}
            getRowCanExpand={() => true}
          />
        )}
        {isLoading && <p> Loading...</p>}
        {isError && (
          <p> There are no records to show or there is some error. Please try again later.</p>
        )}
      </section>
    </>
  );
};

export default Clients;

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};
