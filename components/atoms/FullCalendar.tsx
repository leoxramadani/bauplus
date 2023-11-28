import { GET_ALL_HOLIDAYS } from '@/lib/constants/endpoints/hr/holiday';
import useData from '@/lib/hooks/useData';
import { IHoliday } from '@/lib/schema/hr/holiday/holiday';
import dayGridMonth from '@fullcalendar/daygrid';
import FC from '@fullcalendar/react';
import { addDays, format } from 'date-fns';
import { ScrollArea } from '../ui/scroll-area';

const FullCalendar = () => {
  const events = [
    { title: 'Meeting', start: new Date() },
    { title: 'Meeting', start: '2023-11-24T23:00' },
    { title: 'Meeting', start: new Date() },
    { title: 'Meeting', start: new Date() },
  ];

  const {
    data: holidays,
    isError: holidaysError,
    isLoading: holidaysLoading,
  } = useData<IHoliday[]>(['holidays'], GET_ALL_HOLIDAYS);

  console.log(holidays);
  return (
    holidays && (
      <ScrollArea className="relative h-screen w-full">
        <FC
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay', // user can switch between the two
          }}
          dayMaxEvents={3}
          plugins={[dayGridMonth]}
          initialView="dayGridMonth"
          weekends={false}
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
            display: 'auto',
          }))}
          eventContent={renderEventContent}
          height={'100vh'}
        />
      </ScrollArea>
    )
  );
};

function renderEventContent(eventInfo: any) {
  return (
    <div className=" flex flex-col p-0.5">
      <b>{eventInfo.event?.title} </b>
      <i>{format(eventInfo.event.start, 'hh:mm a')}</i>
    </div>
  );
}

export default FullCalendar;
