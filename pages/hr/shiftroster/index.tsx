import { Button } from '@/components/ui/button';
import { FileInput, Plus } from 'lucide-react';

const ShiftRoster = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Button variant="default" className="flex gap-1">
          <Plus className='size-4' /> <span>Assign Bulk Shifts</span>
        </Button>

        <Button variant="outline" className="flex gap-1">
          <FileInput  className='size-4' /> <span>Export</span>
        </Button>
      </div>
      {/* <DataTable data={data} columns={financeColumnDef} /> */}
    </section>
  );
};

export default ShiftRoster;
