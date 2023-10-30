import Topbar from '@/components/layout/Topbar';
import { Button } from '@/components/ui/button';
import { FileInput, Plus } from 'lucide-react';

const Appreciation = () => {
  return (
    <>
      <Topbar />
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Button variant="default" className="flex gap-2">
            <Plus size={20} /> <span>Add Appreciation</span>
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

export default Appreciation;
