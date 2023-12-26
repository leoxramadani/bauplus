import Modal from '@/components/atoms/Modal';
import NoticeCard from '@/components/atoms/NoticeCard';
import NoticeForm from '@/components/molecules/notices/NoticeForm';
import { Button } from '@/components/ui/button';
import { GET_ALL_NOTICES } from '@/lib/constants/endpoints/notices';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
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
  const { open, setOpen } = useModal();
  const { data: noticesData, refetch: noticesRefetch } = useData<
    Notice[]
  >(['notices'], GET_ALL_NOTICES);

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
                noticesRefetch={noticesRefetch}
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
          {noticesData ? (
            noticesData.map((item, index) => (
              <NoticeCard
                noticeData={item}
                key={index}
                noticesRefetch={noticesRefetch}
              />
            ))
          ) : (
            // <div className="flex items-center justify-center">
            <p>No Notices Found</p>
            // </div>
          )}
        </div>
      </section>
    </>
  );
};
export default Notices;
