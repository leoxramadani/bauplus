import { Button } from '@/components/ui/button';
import { Check, Plus } from 'lucide-react';
import React from 'react';

const Holiday = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Button variant="destructive" className="flex gap-2">
          <Plus size={20} /> <span>Add holiday</span>
        </Button>

        <Button variant="outline" className="flex gap-2">
          <Check size={20} /> <span>Mark Default Holidays</span>
        </Button>
      </div>
      {/* <DataTable data={data} columns={financeColumnDef} /> */}
    </section>
  );
};

export default Holiday;