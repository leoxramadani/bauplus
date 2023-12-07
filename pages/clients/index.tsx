import Modal from '@/components/atoms/Modal';
import ClientsForm from '@/components/molecules/Clients/ClientsForm';
import { DataTable } from '@/components/molecules/DataTable';
import { DataTableLoading } from '@/components/molecules/DataTable/DataTableLoading';
// import { DataTable } from '@/components/molecules/table/DataTable';
// import { DataTableLoading } from '@/components/molecules/table/DataTableLoading';
import { Button } from '@/components/ui/button';
import { GET_ALL_CLIENTS } from '@/lib/constants/endpoints/clients';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import {
  IClients,
  clientSubColumnDef,
  clientsColumnDef,
} from '@/lib/schema/Clients/clients';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

const Clients = () => {
  const router = useRouter();
  const { open, setOpen } = useModal();
  const {
    data,
    metadata,
    isError,
    isLoading,
    error,
    refetch: refetchClients,
  } = useData<IClients[]>(['clients'], GET_ALL_CLIENTS);

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
                <Plus size={20} /> Add new client
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add New Client"
              description="Fill all the fields to add a new client"
            >
              <ClientsForm
                setModal={setOpen}
                clientId={
                  router.isReady ? router.query.id?.toString() : ''
                }
                refetchClients={refetchClients}
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
        {data && !isLoading && (
          <DataTable
            data={data}
            metadata={metadata}
            columns={clientsColumnDef}
            subcolumns={clientSubColumnDef}
            getRowCanExpand={() => true}
          />
        )}
        {isLoading && (
          <DataTableLoading columnCount={clientsColumnDef.length} />
        )}
        {isError && (
          <p>
            {' '}
            There are no records to show or there is some error.
            Please try again later.
          </p>
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
