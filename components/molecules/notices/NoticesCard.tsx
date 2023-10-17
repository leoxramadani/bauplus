import React, { useState } from 'react';
import Logo from '@/public/card-notice.png';
import Image from 'next/image';
import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import { Card } from '@tremor/react';
import NoticeForm from './NoticeForm';

const NoticesCard = ({ cardData }: { cardData: any }) => {
  const [open, setOpen] = useState(false);
  const maxDescriptionLength = 100;

  const formattedDate = new Date(
    cardData.dateCreated
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div>
      <Card className="max-w-xs mx-auto gap-4 flex flex-col p-0 overflow-hidden shadow-xl ring-0 rounded-2xl min-h-[450px] max-h-[450px]">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt={'test'} />
        </div>
        <div className="flex flex-col items-start px-6 gap-2">
          <h1 className="flex-grow text-xl font-bold">
            {cardData.noticeTitle}
          </h1>
          <p className="text-xs font-medium text-indigo-500">
            {formattedDate}
          </p>
        </div>
        <div className="px-6 min-h-[80px] max-w-[300px]">
          <span className="text-sm text-slate-700">
            {cardData.noticeText.length > maxDescriptionLength
              ? `${cardData.noticeText.substring(
                  0,
                  maxDescriptionLength
                )}...`
              : cardData.noticeText}
          </span>
          {cardData.noticeText.length > maxDescriptionLength && (
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
                {cardData.employee
                  ? cardData.employee.employeeName
                  : ''}
              </h2>
              <p className="font-normal text-xs">
                {cardData.employee
                  ? cardData.employee.employeePosition
                  : ''}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center flex-none">
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
                <NoticeForm
                  setIsModalOpen={setOpen}
                  noticeId={cardData.noticeId}
                />
              </Modal.Content>
            </Modal>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NoticesCard;
