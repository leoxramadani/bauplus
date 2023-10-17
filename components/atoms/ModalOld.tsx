import { Dialog } from '@headlessui/react';

import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect } from 'react';

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  ButtonText?: string;
  handleOpener?: () => void;
  handleButton?: () => void;
  handleCloser?: () => void;
  hideButton?: string;
  buttonStyle?: string;
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hideX?: string;
};

const ModalOld = ({
  children,
  ButtonText = '',
  hideButton,
  buttonStyle = '',
  handleOpener = () => {
    return;
  },
  handleCloser = () => {
    return;
  },
  handleButton = () => {
    return;
  },
  open = false,
  setOpen,
  hideX = '',
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleClose = () => {
    handleButton();
    console.log('closing');
    setOpen(false);
  };

  return (
    <>
      {ButtonText ? (
        <input
          type="button"
          onClick={() => {
            setOpen(true);
            handleOpener();
          }}
          value={ButtonText}
          className={` button w-max ${buttonStyle}`}
        />
      ) : (
        <Plus
          className={`${buttonStyle}`}
          onClick={() => setOpen(true)}
        />
      )}

      <MotionConfig
        transition={{
          type: 'spring',
          bounce: 0.3,
          duration: open ? 0.5 : 0.4,
        }}
      >
        <AnimatePresence initial={false}>
          {open && (
            <Dialog
              as={motion.div}
              initial="closed"
              animate="open"
              exit="closed"
              static
              className="fixed inset-0 z-[50] overflow-y-scroll flex items-center justify-center "
              onClose={() => {
                handleCloser();
                setOpen(false);
              }}
              open={open}
              initialFocus={undefined}
              suppressHydrationWarning={true}
            >
              <motion.div
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 1 },
                }}
                className="fixed inset-0  bg-black bg-opacity-25"
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    handleCloser();
                    setOpen(false);
                  }
                }}
              />

              <Dialog.Panel
                as={motion.div}
                variants={{
                  closed: {
                    opacity: 'var(--opacity-from)',
                    scale: 'var(--scale-from, 1)',
                    y: 'var(--y-from, 0px)',
                  },
                  open: {
                    opacity: 'var(--opacity-to)',
                    scale: 'var(--scale-to, 1)',
                    y: 'var(--y-to, 0px)',
                  },
                }}
                className="relative z-50  flex w-full max-w-3xl flex-col items-center justify-start gap-8  rounded-3xl bg-white  [--opacity-from:0%] [--opacity-to:100%] 
                    max-sm:[--y-from:16px] max-sm:[--y-to:0px] sm:[--scale-from:80%] sm:[--scale-to:100%] md:mt-0  "
              >
                {children}
                <X
                  className="absolute right-8 top-4 hover:cursor-pointer"
                  onClick={() => {
                    handleCloser();
                    setOpen(false);
                  }}
                />
              </Dialog.Panel>
            </Dialog>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
};

export default ModalOld;
