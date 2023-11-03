import Modal from '@/components/atoms/Modal';
import CreateInvoiceForm from '@/components/molecules/finances/invoice/CreateInvoiceForm';
import InvoiceForm from '@/components/molecules/finances/invoice/CreateInvoiceForm';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { INVOICE_GET_ALL } from '@/lib/constants/endpoints/finance/invoice';
import useData from '@/lib/hooks/useData';
import {
  IInvoice,
  invoiceColumnDef,
} from '@/lib/schema/Finance/invoice/invoice';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Invoice = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch: refetchInvoices,
  } = useData<IInvoice[]>(['invoices'], INVOICE_GET_ALL);

  useEffect(() => {
    if (router.query.id) {
      console.log('Query changes here');
      setIsModalOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);

  useEffect(() => {
    if (!isModalOpen) {
      router.replace('/finance/invoice', undefined, {
        shallow: true,
      });
    }
  }, [isModalOpen]);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Modal.Trigger asChild>
            <Button variant="default" className="flex flex-row gap-2">
              <Plus size={20} /> Create Invoice
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="Create Invoice"
            description="Fill all the fields to create an invoice"
          >
            <CreateInvoiceForm
              setIsModalOpen={setIsModalOpen}
              invoiceNumber={
                router.isReady ? router.query.id?.toString() : ''
              }
              refetchInvoices={refetchInvoices}
            />
          </Modal.Content>
        </Modal>


        <Modal open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
          <Modal.Trigger asChild>
            <Button
              variant="outline"
              className="flex flex-row gap-2 text-indigo-600"
            >
              <Plus size={20} /> Register Invoice
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="Register Invoice"
            description="Fill all the fields to register an invoice"
          >
            {/* <InvoiceForm
              setIsModalOpen={setIsModalOpen}
              invoiceNumber={
                router.isReady ? router.query.id?.toString() : ''
              }
            /> */}
            a
          </Modal.Content>
        </Modal>

        
        <Button variant="outline" className="flex gap-2 ">
          <Plus size={20} /> <span>Create Time Log Invoice</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-row items-center gap-2"
        >
          <FileInput /> <span>Export</span>
        </Button>
      </div>

      {data && !isLoading ? (
        <DataTable
          data={data}
          columns={invoiceColumnDef}
          searchVal="invoiceNumber"
        />
      ) : (
        <>
          {isError ? (
            <div>No data.</div>
          ) : (
            <div>
              {' '}
              <p>Loading ...</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Invoice;
