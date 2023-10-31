import Topbar from '@/components/layout/Topbar';
import { Button } from '@/components/ui/button';
import { FileInput, Plus } from 'lucide-react';

const Appreciation = () => {
  return (
    <>
<<<<<<< HEAD
      
=======
>>>>>>> a36543fdc74e5c1361b5fc27c114aa1ee05c5184
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
