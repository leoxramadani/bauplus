import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import noticeBoardImage from '@/public/card-notice.png';
import logo from '@/public/user.png';
import { Card } from '@tremor/react';
import Image from 'next/image';
import { useState } from 'react';
import NoticeForm from './NoticeForm';

const NoticesCard = ({
  cardData,
  noticesRefetch,
}: {
  cardData: any;
  noticesRefetch: any;
}) => {
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
      <Card
        className="mx-auto flex max-h-[470px] min-h-[470px] min-w-[320px] max-w-[320px] flex-col gap-4 overflow-hidden rounded-2xl p-0 shadow-xl ring-0"
        key={cardData}
      >
        <div className="flex items-center justify-center">
          <Image
            src={noticeBoardImage}
            alt={'noticeBoardImage'}
            className="h-[170px] w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-2 px-4">
          <h1 className="flex-grow text-lg font-bold">
            {cardData.noticeTitle}
          </h1>
          <p className="text-xs font-medium text-indigo-500">
            {formattedDate}
          </p>
        </div>
        <div className="min-h-[100px] max-w-[300px] flex-grow px-4">
          <span className="text-sm text-slate-700">
            {cardData.noticeText.length > maxDescriptionLength
              ? `${cardData.noticeText.substring(
                  0,
                  maxDescriptionLength
                )}...`
              : cardData.noticeText}
          </span>
          {cardData.noticeText.length > maxDescriptionLength && (
            <span className="text-sm font-bold text-indigo-500">
              See more
            </span>
          )}
        </div>
        <div className="flex flex-none flex-row gap-10 border-t-2 border-t-indigo-500 p-4 pt-4">
          <div className="flex flex-grow flex-row items-center">
            <div className="flex flex-initial flex-col items-center justify-center sm:flex-row sm:justify-normal xl:w-14">
              <Image
                src={logo}
                alt={'logo'}
                className="flex h-10 w-10 cursor-pointer rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-medium">
                {cardData.employee
                  ? cardData.employee.employeeName
                  : ''}
              </h2>
              <p className="text-xs font-normal">
                {cardData.employee
                  ? cardData.employee.employeePosition
                  : ''}
              </p>
            </div>
          </div>
          <div className="flex flex-none flex-row items-center">
            <Modal open={open} onOpenChange={setOpen}>
              <Modal.Trigger asChild>
                <Button
                  variant="default"
                  className="flex items-center justify-center gap-1"
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
                  noticesRefetch={noticesRefetch}
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
