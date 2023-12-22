import Modal from '@/components/atoms/Modal';
import ExpensesCreate from '@/components/molecules/finances/expenses/ExpensesCreate';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import {
  expensesDef,
  expensesType,
} from '@/lib/schema/Finance/expenses';
import { FileInput, Plus, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
const Expenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Modal.Trigger asChild>
              <Button
                variant="default"
                className="flex items-center justify-center gap-1"
              >
                <Plus className="size-4" /> Add Expenses
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add an Expense"
              description="Fill all the fields to add an expense"
            >
              <ExpensesCreate />
            </Modal.Content>
          </Modal>
          <Button variant="outline" className="flex gap-1">
            <RefreshCcw className="size-4" />{' '}
            <span>Recurring Expenses</span>
          </Button>
          <Button variant="outline" className="flex gap-1">
            <FileInput className="size-4" /> <span>Export</span>
          </Button>
        </div>
        <DataTable
          data={expensesData}
          columns={expensesDef}
          searchVal="itemName"
        />
      </section>

      {/* <RightModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <ExpensesCreate />
      </RightModal> */}
    </>
  );
};

export default Expenses;

const expensesData: expensesType[] = [
  {
    id: 'valon ahmeti',
    itemName: 'Item 1',
    currency: 'USD',
    exchangeRate: 1.25,
    price: 100.0,
    purchaseDate: '2023-01-15',
    employee: 'Employee 1',
    project: 'Project X',
    expenseCategory: 'Category 1',
    purchasedFrom: 'Vendor 1',
    bankAccount: 'Account 12345',
    description: 'Expense 1 description',
  },
  {
    id: '2',
    itemName: 'Item 2',
    currency: 'EUR',
    exchangeRate: 0.95,
    price: 75.0,
    purchaseDate: '2023-02-20',
    employee: 'Employee 2',
    project: 'Project Y',
    expenseCategory: 'Category 2',
    purchasedFrom: 'Vendor 2',
    bankAccount: 'Account 67890',
    description: 'Expense 2 description',
  },
  {
    id: '3',
    itemName: 'Item 3',
    currency: 'GBP',
    exchangeRate: 0.8,
    price: 120.0,
    purchaseDate: '2023-03-10',
    employee: 'Employee 3',
    project: 'Project Z',
    expenseCategory: 'Category 3',
    purchasedFrom: 'Vendor 3',
    bankAccount: 'Account 54321',
    description: 'Expense 3 description',
  },
  // Add more expense data here as needed
];
