import Modal from '@/components/atoms/Modal';
import InvoiceForm from '@/components/molecules/finances/invoice/InvoiceForm';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import {
  IInvoice,
  invoiceColumnDef,
} from '@/lib/schema/Finance/invoice';
import { FileInput, Plus, RotateCw } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Invoice = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('Query changes here');

    if (router.query.id) {
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
        <Modal>
          <Modal.Trigger asChild>
            <Button
              variant="destructive"
              className="flex flex-row gap-2"
            >
              <Plus size={20} /> Add Invoice
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="Add Invoice"
            description="Fill all the fields to add an invoice"
          >
            <InvoiceForm
              setIsModalOpen={setIsModalOpen}
              invoiceNumber={
                router.isReady ? router.query.id?.toString() : ''
              }
            />
          </Modal.Content>
        </Modal>
        <Button variant="outline" className="flex gap-2">
          <RotateCw /> <span>Recurring Invoice</span>
        </Button>
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
      <DataTable data={data} columns={invoiceColumnDef} searchVal='invoiceNumber'/>
    </section>
  );
};

export default Invoice;

const data: IInvoice[] = [
  {
    invoiceId: 'INV-1234',
    invoiceType: 'Standard',
    invoiceNumber: '1',
    invoiceFor: 12345,
    dateInDocument: new Date('2023-01-15'),
    sumWithTax: 5000,
    taxValue: 1000,
    sumWithoutTax: 4000,
    dueDate: new Date('2023-02-15'),
    invoiceStatus: 'Paid',
    dossier: 'Dossier-1',
    description: 'Description for Invoice 1',
  },
  {
    invoiceId: 'INV-5678',
    invoiceType: 'Proforma',
    invoiceNumber: '2',
    invoiceFor: 67890,
    dateInDocument: new Date('2023-02-20'),
    sumWithTax: 4500,
    taxValue: 900,
    sumWithoutTax: 3600,
    dueDate: new Date('2023-03-20'),
    invoiceStatus: 'Unpaid',
    dossier: 'Dossier-2',
    description: 'Description for Invoice 2',
  },
  {
    invoiceId: 'INV-9012',
    invoiceType: 'Standard',
    invoiceNumber: '3',
    invoiceFor: 12345,
    dateInDocument: new Date('2023-03-10'),
    sumWithTax: 4000,
    taxValue: 800,
    sumWithoutTax: 3200,
    dueDate: new Date('2023-04-10'),
    invoiceStatus: 'Paid',
    dossier: 'Dossier-3',
    description: 'Description for Invoice 3',
  },
  {
    invoiceId: 'INV-3456',
    invoiceType: 'Proforma',
    invoiceNumber: '4',
    invoiceFor: 67890,
    dateInDocument: new Date('2023-04-05'),
    sumWithTax: 5500,
    taxValue: 1100,
    sumWithoutTax: 4400,
    dueDate: new Date('2023-05-05'),
    invoiceStatus: 'Unpaid',
    dossier: 'Dossier-4',
    description: 'Description for Invoice 4',
  },
  {
    invoiceId: 'INV-7890',
    invoiceType: 'Standard',
    invoiceNumber: '5',
    invoiceFor: 12345,
    dateInDocument: new Date('2023-05-20'),
    sumWithTax: 2800,
    taxValue: 560,
    sumWithoutTax: 2240,
    dueDate: new Date('2023-06-20'),
    invoiceStatus: 'Paid',
    dossier: 'Dossier-5',
    description: 'Description for Invoice 5',
  },
];
