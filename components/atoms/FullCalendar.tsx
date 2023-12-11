import {
  DELETE_HOLIDAY,
  GET_ALL_HOLIDAYS,
} from '@/lib/constants/endpoints/hr/holiday';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import { IHoliday } from '@/lib/schema/hr/holiday/holiday';
import dayGridMonth from '@fullcalendar/daygrid';
import FC from '@fullcalendar/react';
import axios from 'axios';
import { addDays, format } from 'date-fns';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import Delete from './Delete';
import Modal from './Modal';

interface IFullCalendar {
  holidays: IHoliday[];
}

const FullCalendar = ({ holidays }: IFullCalendar) => {
  const { open, setOpen } = useModal();
  const [deleting, setDeleting] = useState(false);

  const { refetch: refetchHolidays } = useData<IHoliday[]>(
    ['holidays'],
    GET_ALL_HOLIDAYS
  );

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await axios.delete(DELETE_HOLIDAY, {
        params: {
          id: id,
        },
      });
      toast.success('Holiday deleted successfully.');
      refetchHolidays();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong! Please try again.');
    }
    setDeleting(false);
  };

  function renderEventContent(eventInfo: any) {
    return (
      <div className=" group flex flex-row justify-between p-2">
        <b>{eventInfo.event?.title}</b>
        <Modal>
          <Modal.Trigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="hidden h-max w-max p-1 group-hover:block"
            >
              <Trash size={10} className="text-gray-500" />
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="Delete a holiday"
            description="This will delete the selected holiday! Are you sure you want to continue?"
            className="max-w-xl"
          >
            <Delete
              handleDelete={() => handleDelete(eventInfo.event.id)}
              id={eventInfo.event.id}
              deleting={deleting}
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
  return (
    <>
      {holidays && (
        <FC
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            // right: 'dayGridMonth,dayGridWeek,dayGridDay', // user can switch between the two
            right: 'dayGridMonth', // user can switch between the two
          }}
          dayMaxEvents={3}
          plugins={[dayGridMonth]}
          initialView="dayGridMonth"
          weekends={true}
          contentHeight={'100vh'}
          events={holidays?.map((holiday) => ({
            id: holiday.holidayId,
            title: holiday.name,
            start: format(
              new Date(holiday.startDate),
              'yyyy-MM-dd HH:mm:ss'
            ),
            // make the end time start date + holiday.nrDays
            end: format(
              addDays(new Date(holiday.startDate), holiday.nrDays),

              'yyyy-MM-dd HH:mm:ss'
            ),

            // make the color a random color from the tailwind colors that end with 500
          }))}
          eventContent={renderEventContent}
          eventClick={(info) => {
            // setOpen(true);
            console.log(info);
          }}
          // height={'100vh'}
        />
      )}
    </>
  );
};

export default FullCalendar;
