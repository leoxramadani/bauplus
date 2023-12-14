import Modal from '@/components/atoms/Modal';
import { DataTable } from '@/components/molecules/DataTable';
import GenerateInvoiceForm from '@/components/molecules/finances/invoice/generateInvoice/GenerateInvoiceForm';
import InvoiceForm from '@/components/molecules/finances/invoice/invoiceForm/InvoiceForm';
import InvoiceForm2 from '@/components/molecules/finances/invoice/invoiceForm/InvoiceForm2';
import { DataTableLoading } from '@/components/molecules/table/DataTableLoading';
import { Button } from '@/components/ui/button';
import { INVOICE_GET_ALL } from '@/lib/constants/endpoints/finance/invoice';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import {
  IInvoice,
  invoiceColumnDef,
} from '@/lib/schema/Finance/invoice/invoice';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
const Invoice = () => {
  const router = useRouter();
  const { open, setOpen } = useModal();
  const { open: newInv, setOpen: setNewInv } = useModal();
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState(false);
  const {
    data,
    metadata,
    isLoading,
    isError,
    refetch: refetchInvoices,
  } = useData<IInvoice[]>(['invoices'], INVOICE_GET_ALL);

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
            className="h-auto w-auto"
          >
            <GenerateInvoiceForm
              setIsRegisterModalOpen={setIsRegisterModalOpen}
              refetchInvoices={refetchInvoices}
            />
          </Modal.Content>
        </Modal>

        {/* <Link href="./invoice/Register" className="flex">
          <Button variant="default" className="flex flex-row gap-2">
            <Plus size={20} /> Register Invoice
          </Button>
        </Link> */}

        {/* <Link href="./invoice/Create" className="flex">
          <Button variant="outline" className="flex flex-row gap-2">
            <Plus size={20} /> Create Invoice
          </Button>
        </Link> */}

        <Modal open={open} onOpenChange={setOpen}>
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
              setIsModalOpen={setOpen}
              invoiceId={
                router.isReady ? router.query.id?.toString() : ''
              }
              refetchInvoices={refetchInvoices}
            />
          </Modal.Content>
        </Modal>
        <Modal open={newInv} onOpenChange={setNewInv}>
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
            <InvoiceForm2
              setIsModalOpen={setOpen}
              invoiceId={
                router.isReady ? router.query.id?.toString() : ''
              }
              refetchInvoices={refetchInvoices}
            />
          </Modal.Content>
        </Modal>

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
        <DataTable<IInvoice>
          data={data}
          metadata={metadata}
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
