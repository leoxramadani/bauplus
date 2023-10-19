import { X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  forwardRef,
  ForwardedRef,
} from 'react';

type ModalProps = {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const RightModalNew: React.FC<ModalProps> = ({
  children,
  isModalOpen = false,
  setIsModalOpen,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsModalOpen(false);
      }
    };

    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <MotionConfig
        transition={{
          type: 'tween',
          duration: 0.25,
        }}
      >
        <AnimatePresence initial={false}>
          {isModalOpen && (
            <div className="fixed inset-0 z-10">
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 1 },
                }}
                className="fixed inset-0 w-full -z-10"
              />
              <div className="flex h-screen justify-end">
                <Dialog
                  as={motion.div}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  open={isModalOpen}
                  onClose={() => {
                    // You can leave this empty or use a null function to prevent auto-close
                  }}
                  initialFocus={undefined}
                >
                  <Dialog.Panel className="flex flex-col gap-4 z-50 h-full w-[500px] bg-white right-0 bottom-0 absolute shadow-2xl overflow-y-auto overflow-x-hidden">
                    {/* Add 'overflow-y-auto' to make the content scrollable */}
                    <div className="flex flex-row px-6 pt-4">
                      <p className="flex flex-grow"></p>
                      <X
                        className="flex flex-none"
                        onClick={() => {
                          console.log('X Icon Clicked!');
                          setIsModalOpen(false);
                        }}
                      />
                    </div>
                    {children}
                  </Dialog.Panel>
                </Dialog>
              </div>
            </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
};

export default RightModalNew;
