import { Card, Metric, Text } from '@tremor/react';
import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FileInput, MailCheck, Plus } from 'lucide-react';
import BankAccountCreate from '@/components/molecules/finances/bankaccount/BankAccountCreate';
import { DataTable } from '@/components/molecules/table/DataTable';
import { financeColumnDef } from '@/lib/schema/Finance/bankaccounts';
import Logo from '@/public/card-notice.png';
import Image from 'next/image';

const Notices = () => {
  const [open, setOpen] = useState(false);
  const [myData, setMyData] = useState<any>();

  const maxDescriptionLength = 100;

  const noticedata = [
    {
      Image: Logo,
      Title: 'Important Meeting',
      Date: '16 November 2023',
      Desc: 'There will be an important meeting on the specified date. Please make sure to attend on time. This meeting will cover various topics, including project updates, team collaborations, and upcoming goals. It is crucial for all team members to be present and actively participate. Your presence and input are highly valued, and your contributions will play a vital role in our collective success. We look forward to your attendance and meaningful contributions. See you there!',
      PersonPic: Logo,
      PersonName: 'John Smith',
      PersonPos: 'Manager',
    },
    {
      Image: Logo,
      Title: 'Upcoming Event',
      Date: '20 September 2023',
      Desc: "Join us for an exciting event happening on the given date. Don't miss out on the fun!",
      PersonPic: Logo,
      PersonName: 'Emily Johnson',
      PersonPos: 'Event Coordinator',
    },
    {
      Image: Logo,
      Title: 'New Project Announcement',
      Date: '25 December 2023',
      Desc: 'We are thrilled to announce a new project. Stay tuned for more details.',
      PersonPic: Logo,
      PersonName: 'Michael Brown',
      PersonPos: 'Project Manager',
    },
    {
      Image: Logo,
      Title: 'Employee Recognition',
      Date: '10 October 2023',
      Desc: 'We are proud to recognize outstanding employee contributions. Congratulations to the awardees!',
      PersonPic: Logo,
      PersonName: 'Sarah Davis',
      PersonPos: 'HR Manager',
    },
    {
      Image: Logo,
      Title: 'Company Picnic',
      Date: '1 July 2023',
      Desc: 'Join us for a day of fun and relaxation at our annual company picnic. Save the date!',
      PersonPic: Logo,
      PersonName: 'David Wilson',
      PersonPos: 'Event Coordinator',
    },
    {
      Image: Logo,
      Title: 'Office Closure',
      Date: '3 May 2023',
      Desc: 'The office will be closed on the mentioned date due to a public holiday. Enjoy your day off!',
      PersonPic: Logo,
      PersonName: 'Linda Martinez',
      PersonPos: 'Office Manager',
    },
    {
      Image: Logo,
      Title: 'IT Maintenance',
      Date: '5 August 2023',
      Desc: 'There will be scheduled IT maintenance on the given date. Expect minimal disruption.',
      PersonPic: Logo,
      PersonName: 'James Lee',
      PersonPos: 'IT Administrator',
    },
    {
      Image: Logo,
      Title: 'New Employee Welcome',
      Date: '12 October 2023',
      Desc: 'Let welcome our new employees to the team. Were excited to have them on board!',
      PersonPic: Logo,
      PersonName: 'Jessica White',
      PersonPos: 'HR Coordinator',
    },
  ];

  const renderedNotices = noticedata.map((item, index) => (
    <div key={index}>
      <Card className="max-w-xs mx-auto gap-4 flex flex-col p-0 overflow-hidden shadow-xl ring-0 rounded-2xl min-h-[400px]">
        <div className="flex items-center justify-center">
          <Image src={item.Image} alt={'test'} />{' '}
        </div>
        <div className="flex flex-col items-start px-6 gap-2">
          <h1 className="flex-grow text-xl font-bold">
            {item.Title}
          </h1>
          <p className="text-xs font-medium text-indigo-500">
            {item.Date}
          </p>
        </div>
        <div className="px-6 min-h-[60px]">
          <span className="text-sm text-slate-700">
            {item.Desc.length > maxDescriptionLength
              ? `${item.Desc.substring(0, maxDescriptionLength)}...`
              : item.Desc}
          </span>
          {item.Desc.length > maxDescriptionLength && (
            <span className="font-bold text-sm text-indigo-500">
              See more
            </span>
          )}
        </div>
        <div className="flex flex-row gap-10 border-t-2 border-t-indigo-500 pt-4 p-4 flex-grow">
          <div className="flex flex-row items-center flex-grow">
            <div className="flex flex-initial flex-col items-center justify-center sm:flex-row sm:justify-normal xl:w-14">
              <Image
                src={item.PersonPic}
                alt={'test'}
                className="h-10 w-10 cursor-pointer rounded-full object-cover flex"
              />{' '}
            </div>
            <div className="flex flex-col">
              <h2 className="font-medium text-base">
                {item.PersonName}
              </h2>
              <p className="font-normal text-xs">{item.PersonPos}</p>
            </div>
          </div>
          <div className="flex flex-row items-center flex-none">
            <p className="flex font-medium text-xs">Mark as read</p>
          </div>
        </div>
      </Card>
    </div>
  ));
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="relative flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button
                variant="destructive"
                className="flex gap-1 justify-center items-center"
              >
                <Plus size={20} /> Add Notice
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add New Notice"
              description="Notice Details"
            >
              <BankAccountCreate setModal={setOpen} />
            </Modal.Content>
          </Modal>
          <Button
            variant="outline"
            className="flex gap-1 justify-center items-center"
          >
            <FileInput size={20} /> <span>Export</span>
          </Button>
        </div>
        {myData ? (
          <DataTable data={myData} columns={financeColumnDef} />
        ) : (
          <p> Loading...</p>
        )}
      </section>
      <div className="grid grid-cols-4 gap-4">{renderedNotices}</div>
    </>
  );
};

export default Notices;
