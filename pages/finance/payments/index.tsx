import { Button } from '@/components/ui/button';
import { FileInput, Plus } from 'lucide-react';
import React from 'react';

const Payments = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Button variant="destructive" className="flex gap-2">
          <Plus size={20} /> <span>Add Payment</span>
        </Button>
        <Button variant="destructive" className="flex gap-2">
          <Plus size={20} /> <span>Add Bulk Payment</span>
        </Button>
        <Button variant="outline" className="flex gap-2">
          <FileInput /> <span>Export</span>
        </Button>
      </div>
      {/* <DataTable data={data} columns={financeColumnDef} /> */}
    </section>
  );
};

export default Payments;
