import Modal from '@/components/atoms/Modal';
import GenerateInvoiceForm from '@/components/molecules/finances/invoice/generateInvoice/GenerateInvoiceForm';
import { DataTable } from '@/components/molecules/table/DataTable';
import { DataTableLoading } from '@/components/molecules/table/DataTableLoading';
import { Button } from '@/components/ui/button';
import { INVOICE_GET_ALL } from '@/lib/constants/endpoints/finance/invoice';
import useData from '@/lib/hooks/useData';
import {
  IInvoice,
  invoiceColumnDef,
} from '@/lib/schema/Finance/invoice/invoice';
import { FileInput, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Invoice = () => {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch: refetchInvoices,
  } = useData<IInvoice[]>(['invoices'], INVOICE_GET_ALL);

  useEffect(() => {
    if (router.query.id) {
      console.log('Query changes here');
      setIsCreateModalOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);

  useEffect(() => {
    if (!isCreateModalOpen) {
      router.replace('/finance/invoice', undefined, {
        shallow: true,
      });
    }
  }, [isCreateModalOpen]);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Modal
          open={isRegisterModalOpen}
          onOpenChange={setIsRegisterModalOpen}
        >
          <Modal.Trigger asChild>
            <Button variant="default" className="flex flex-row gap-2">
              <Plus size={20} /> Register Invoice
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="Register Invoice"
            description="Fill all the fields to register an invoice"
            className="md:min-w-3xl md:max-w-[80%]"
          >
            <GenerateInvoiceForm
              setIsRegisterModalOpen={setIsRegisterModalOpen}
              refetchInvoices={refetchInvoices}
            />
          </Modal.Content>
        </Modal>
        <Link href="./invoice/CreateInvoice" className="flex">
          <Button variant="outline" className="flex flex-row gap-2">
            <Plus size={20} /> Create Invoice
          </Button>
        </Link>
        {/* <Modal

        <Link href="./invoice/Register">
          <Button variant="default" className="flex flex-row gap-2">
            <Plus size={20} /> Register Invoice
          </Button>
        </Link>

        <Modal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        >
          <Modal.Trigger asChild>
            <Button
              variant="outline"
              className="flex flex-row gap-2 text-primary"
            >
              <Plus size={20} /> Create Invoice
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="Create Invoice"
            description="Fill all the fields to create an invoice"
          >
            <InvoiceForm
              setIsModalOpen={setIsCreateModalOpen}
              invoiceId={
                router.isReady ? router.query.id?.toString() : ''
              }
              refetchInvoices={refetchInvoices}
            />
          </Modal.Content>
        </Modal> */}

        {/* <Button variant="outline" className="flex gap-2 ">
          <Plus size={20} /> <span>Create Time Log Invoice</span>
        </Button> */}

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
            <DataTableLoading columnCount={invoiceColumnDef.length} />
          )}
        </>
      )}
    </section>
  );
};

export default Invoice;
