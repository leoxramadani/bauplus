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
import NoticeForm from '@/components/molecules/notices/NoticeForm';
import useData from '@/lib/hooks/useData';
import NoticesCard from '@/components/molecules/notices/NoticesCard';

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
  // const [myData, setMyData] = useState<Notice[]>([]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const res = await axios.get(GET_ALL_NOTICES);
  //       setMyData(res.data);
  //     } catch (error) {
  //       console.log('Error fetching notices ->', error);
  //     }
  //   }
  //   getData();
  // }, []);

  const { data: noticesData } = useData<Notice[]>(
    ['notices'],
    GET_ALL_NOTICES
  );

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
              <NoticeForm setIsModalOpen={setOpen} />
            </Modal.Content>
          </Modal>
          <Button
            variant="outline"
            className="flex gap-1 justify-center items-center"
          >
            <FileInput size={20} /> <span>Export</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 gap-y-16 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {noticesData &&
            noticesData.map((item, index) => (
              <NoticesCard cardData={item} key={index} />
            ))}
        </div>
      </section>
    </>
  );
};

export default Notices;
