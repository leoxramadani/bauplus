import { Button } from '@/components/ui/button';
import { FileInput, Layers, Plus } from 'lucide-react';
import React from 'react';

const Proposal = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Button variant="destructive" className="flex gap-2">
          <Plus size={20} /> <span>Create Estimate</span>
        </Button>
        <Button variant="outline" className="flex gap-2">
          <Layers size={20} /> <span>Estimate Template</span>
        </Button>
        <Button variant="outline" className="flex gap-2">
          <FileInput /> <span>Export</span>
        </Button>
      </div>
      {/* <DataTable data={data} columns={financeColumnDef} /> */}
    </section>
  );
};

export default Proposal;
