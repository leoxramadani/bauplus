import { Button } from '@/components/ui/button';
import { FileInput, Plus } from 'lucide-react';
import React from 'react';

const CreditNote = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Button variant="outline" className="flex gap-2">
          <FileInput /> <span>Export</span>
        </Button>
      </div>
      {/* <DataTable data={data} columns={financeColumnDef} /> */}
    </section>
  );
};

export default CreditNote;
