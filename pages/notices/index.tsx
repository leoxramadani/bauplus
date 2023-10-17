import { Card, Text } from '@tremor/react';
import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { FileInput } from 'lucide-react';
import BankAccountCreate from '@/components/molecules/finances/bankaccount/BankAccountCreate';
import Logo from '@/public/card-notice.png';
import Image from 'next/image';
import {
  CREATE_NOTICE,
  GET_ALL_NOTICES,
  UPDATE_NOTICE,
} from '@/lib/constants/endpoints/notices';
import axios from 'axios';
import NoticeCreate, {
  INoticeCreate,
} from '@/components/molecules/notices/NoticeCreate';
import { useMutation } from '@tanstack/react-query';

interface Notice {
  noticeId: string;
  dateCreated: string;
  noticeTitle: string;
  noticeText: string;
  isRead: boolean;
  employeeId: string;
  companyId: string;
  employee: {
    employeeName: string;
    employeePosition: string;
  } | null;
}

const Notices = () => {
  const [open, setOpen] = useState(false);
  const [myData, setMyData] = useState<Notice[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(GET_ALL_NOTICES);
        setMyData(res.data);
      } catch (error) {
        console.log('Error fetching notices ->', error);
      }
    }
    getData();
  }, []);

  const maxDescriptionLength = 100;

  console.log('myData', myData);

  const renderedNotices = myData.map((item, index) => {
    const formattedDate = new Date(
      item.dateCreated
    ).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return (
      <div key={index}>
        <Card className="max-w-xs mx-auto gap-4 flex flex-col p-0 overflow-hidden shadow-xl ring-0 rounded-2xl min-h-[400px]">
          <div className="flex items-center justify-center">
            <Image src={Logo} alt={'test'} />
          </div>
          <div className="flex flex-col items-start px-6 gap-2">
            <h1 className="flex-grow text-xl font-bold">
              {item.noticeTitle}
            </h1>
            <p className="text-xs font-medium text-indigo-500">
              {formattedDate}
            </p>
          </div>
          <div className="px-6 min-h-[60px]">
            <span className="text-sm text-slate-700">
              {item.noticeText.length > maxDescriptionLength
                ? `${item.noticeText.substring(
                    0,
                    maxDescriptionLength
                  )}...`
                : item.noticeText}
            </span>
            {item.noticeText.length > maxDescriptionLength && (
              <span className="font-bold text-sm text-indigo-500">
                See more
              </span>
            )}
          </div>
          <div className="flex flex-row gap-10 border-t-2 border-t-indigo-500 pt-4 p-4 flex-grow">
            <div className="flex flex-row items-center flex-grow">
              <div className="flex flex-initial flex-col items-center justify-center sm:flex-row sm:justify-normal xl:w-14">
                <Image
                  src={Logo}
                  alt={'test'}
                  className="h-10 w-10 cursor-pointer rounded-full object-cover flex"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-medium text-base">
                  {item.employee ? item.employee.employeeName : ''}
                </h2>
                <p className="font-normal text-xs">
                  {item.employee
                    ? item.employee.employeePosition
                    : ''}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center flex-none">
              <p className="flex font-medium text-xs">
                <Modal open={open} onOpenChange={setOpen}>
                  <Modal.Trigger asChild>
                    <Button
                      variant="default"
                      className="flex gap-1 justify-center items-center"
                    >
                      Edit
                    </Button>
                  </Modal.Trigger>
                  <Modal.Content
                    title="Edit Notice"
                    description="Notice Details"
                  >
                    <NoticeCreate setModal={setOpen} />
                  </Modal.Content>
                </Modal>
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  });

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="relative flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button
                variant="default"
                className="flex gap-1 justify-center items-center"
              >
                Add Notice
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add New Notice"
              description="Notice Details"
            >
              <NoticeCreate setModal={setOpen} />
            </Modal.Content>
          </Modal>
          <Button
            variant="outline"
            className="flex gap-1 justify-center items-center"
          >
            <FileInput size={20} /> <span>Export</span>
          </Button>
        </div>
        {myData.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 gap-y-16 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {renderedNotices}
          </div>
        ) : (
          <p> Loading...</p>
        )}
      </section>
    </>
  );
};

export default Notices;
