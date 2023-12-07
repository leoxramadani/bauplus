import FullCalendar from '@/components/atoms/FullCalendar';
import Modal from '@/components/atoms/Modal';
import HolidayForm from '@/components/molecules/hr/holiday/HolidayForm';
import { Button } from '@/components/ui/button';
import { GET_ALL_HOLIDAYS } from '@/lib/constants/endpoints/hr/holiday';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import { IHoliday } from '@/lib/schema/hr/holiday/holiday';
import { Check, Plus } from 'lucide-react';

const Holiday = () => {
  const { open, setOpen } = useModal();

  const {
    data: holidays,
    isError: holidaysError,
    isLoading: holidaysLoading,
    refetch: refetchHolidays,
  } = useData<IHoliday[]>(['holidays'], GET_ALL_HOLIDAYS);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button variant="default" className="flex gap-2">
                <Plus size={20} /> <span>Add Holiday</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add Employee"
              description="Fill all the fields to add employee"
            >
              <HolidayForm
                setIsModalOpen={setOpen}
                refetchHoliday={refetchHolidays}
              />
            </Modal.Content>
          </Modal>

          <Button variant="outline" className="flex gap-2">
            <Check size={20} /> <span>Mark Default Holidays</span>
          </Button>
        </div>
        {/* <DataTable data={data} columns={financeColumnDef} /> */}
        {holidays && !holidaysLoading && (
          <FullCalendar holidays={holidays} />
        )}
      </section>
    </>
  );
};

export default Holiday;
