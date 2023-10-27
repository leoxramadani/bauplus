import { Button } from '@/components/ui/button';
import { FileInput, FileUp, Plus } from 'lucide-react';

const Attendance = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Button variant="default" className="flex gap-2">
          <Plus size={20} /> <span>Mark Attendance</span>
        </Button>

        <Button variant="outline" className="flex gap-2">
          <FileUp size={20} /> <span>Import</span>
        </Button>
        <Button variant="outline" className="flex gap-2">
          <FileInput /> <span>Export</span>
        </Button>
      </div>
      {/* <DataTable data={data} columns={financeColumnDef} /> */}
    </section>
  );
};

export default Attendance;
