import { X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
type ModalProps = {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const CandidatesModal: React.FC<ModalProps> = ({
  children,
  isModalOpen = false,
  setIsModalOpen,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);
  return (
    <>
      <MotionConfig
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: isModalOpen ? 0.5 : 0.4,
        }}
      >
        <AnimatePresence initial={false}>
          {isModalOpen && (
            <Dialog
              as={motion.div}
              initial="closed"
              animate="open"
              exit="closed"
              static
              className="fixed inset-0 z-[50]"
              onClose={() => setIsModalOpen(false)}
              open={isModalOpen}
              initialFocus={undefined}
              suppressHydrationWarning={true}
            >
              <motion.div
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 1 },
                }}
                className="fixed inset-0  bg-black bg-opacity-25 "
                onClick={() => setIsModalOpen(false)}
              />
              <div className="flex h-screen justify-end">
                <Dialog.Panel
                  as={motion.div}
                  variants={{
                    closed: {
                      opacity: 0,
                      scale: 0.8, // Adjust if needed
                      x: '100vw', // Start from outside the right side of the screen
                    },
                    open: {
                      opacity: 1,
                      scale: 1,
                      x: '0%', // Move to the center (fully visible)
                    },
                  }}
                  className="relative z-50 flex  min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-8 bg-white p-4 [--opacity-from:0%] [--opacity-to:100%] 
                    max-sm:[--y-from:16px] max-sm:[--y-to:0px] sm:[--scale-from:80%] sm:[--scale-to:100%] md:mt-0 md:min-h-max md:p-8"
                >
                  {children}

                  <X className='absolute right-8 top-4 hover:cursor-pointer' onClick={() => setIsModalOpen(false)}/>
                </Dialog.Panel>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
};

export default CandidatesModal;
