import { Button } from '@/components/ui/button';
import { FileInput, Plus, RefreshCcw } from 'lucide-react';
import React from 'react';

const Expenses = () => {
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Button variant="destructive" className="flex gap-2">
            <Plus size={20} /> <span>Add Expense</span>
          </Button>
          <Button variant="outline" className="flex gap-2">
            <RefreshCcw size={20} /> <span>Recurring Expenses</span>
          </Button>
          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        {/* <DataTable data={data} columns={financeColumnDef} /> */}
      </section>
    </>
  );
};

export default Expenses;
