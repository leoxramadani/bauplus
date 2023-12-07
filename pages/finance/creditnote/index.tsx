import Topbar from '@/components/layout/Topbar';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import {
  IInvoiceSchema,
  financeColumnDef,
} from '@/lib/schema/Finance/finance';
import { FileInput } from 'lucide-react';
const CreditNote = () => {
  const data: IInvoiceSchema[] = [
    {
      invoiceNumber: 1,
      invoiceDate: new Date('2023-01-15'),
      dueDate: new Date('2023-02-15'),
      currency: 'USD',
      exchangeRate: '1.25',
      client: 'Client A',
      project: 'Project X',
      calculateTax: 'Yes',
      bankAccount: 'Account 12345',
      billingAddress: '123 Main St, City, Country',
      shippingAddress: '456 Elm St, City, Country',
      generatedBy: 'User 1',
    },
    {
      invoiceNumber: 2,
      invoiceDate: new Date('2023-02-20'),
      dueDate: new Date('2023-03-20'),
      currency: 'EUR',
      exchangeRate: '0.95',
      client: 'Client B',
      project: 'Project Y',
      calculateTax: 'No',
      bankAccount: 'Account 67890',
      billingAddress: '789 Oak St, City, Country',
      shippingAddress: '101 Pine St, City, Country',
      generatedBy: 'User 2',
    },
    {
      invoiceNumber: 3,
      invoiceDate: new Date('2023-03-10'),
      dueDate: new Date('2023-04-10'),
      currency: 'GBP',
      exchangeRate: '0.80',
      client: 'Client C',
      project: 'Project Z',
      calculateTax: 'Yes',
      bankAccount: 'Account 54321',
      billingAddress: '321 Elm St, City, Country',
      shippingAddress: '789 Oak St, City, Country',
      generatedBy: 'User 3',
    },
    {
      invoiceNumber: 4,
      invoiceDate: new Date('2023-04-05'),
      dueDate: new Date('2023-05-05'),
      currency: 'CAD',
      exchangeRate: '1.10',
      client: 'Client D',
      project: 'Project W',
      calculateTax: 'No',
      bankAccount: 'Account 98765',
      billingAddress: '567 Maple St, City, Country',
      shippingAddress: '789 Birch St, City, Country',
      generatedBy: 'User 4',
    },
    {
      invoiceNumber: 5,
      invoiceDate: new Date('2023-05-20'),
      dueDate: new Date('2023-06-20'),
      currency: 'AUD',
      exchangeRate: '0.70',
      client: 'Client E',
      project: 'Project V',
      calculateTax: 'Yes',
      bankAccount: 'Account 24680',
      billingAddress: '901 Cedar St, City, Country',
      shippingAddress: '123 Redwood St, City, Country',
      generatedBy: 'User 5',
    },
  ];

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        <DataTable data={data} columns={financeColumnDef} />
      </section>
    </>
  );
};

export default CreditNote;
