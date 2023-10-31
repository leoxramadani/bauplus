import Modal from '@/components/atoms/Modal';
import Topbar from '@/components/layout/Topbar';
import NoticeForm from '@/components/molecules/notices/NoticeForm';
import NoticesCard from '@/components/molecules/notices/NoticesCard';
import { Button } from '@/components/ui/button';
import { GET_ALL_NOTICES } from '@/lib/constants/endpoints/notices';
import useData from '@/lib/hooks/useData';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: noticesData } = useData<Notice[]>(
    ['notices'],
    GET_ALL_NOTICES
  );
  useEffect(() => {
    if (router.query.id) {
      setOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="relative flex flex-row gap-2">
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
              <Button variant="default" className="flex gap-2">
                <Plus size={20} /> <span>Add New Notice</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add New Notice"
              description="Notice Details"
            >
              <NoticeForm
                setIsModalOpen={setOpen}
                noticeId={
                  router.isReady ? router.query.id?.toString() : ''
                }
              />
            </Modal.Content>
          </Modal>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-1"
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
