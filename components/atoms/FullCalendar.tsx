import { IHoliday } from '@/lib/schema/hr/holiday/holiday';
import dayGridMonth from '@fullcalendar/daygrid';
import FC from '@fullcalendar/react';
import { addDays, format } from 'date-fns';
import { ScrollArea } from '../ui/scroll-area';

interface IFullCalendar {
  holidays: IHoliday[];
}

const FullCalendar = ({ holidays }: IFullCalendar) => {
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
          weekends={true}
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
    </div>
  );
}

export default FullCalendar;
