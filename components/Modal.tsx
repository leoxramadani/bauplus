import useTranslation from '@/lib/hooks/useTranslation';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Button } from './ui/button';
type ModalProps = {
  children: React.ReactNode;
  ButtonText?: string;
  value?: string;
  className?: string;
  done?: string;
  iconStyle?: string;
  modalStyle?: string;
  openModalOutside?: any;
  setOpenModalOutside?: any;
  handleButton?: () => void;
};

const Modal = ({
  children,
  ButtonText = '',
  iconStyle = '',
  modalStyle,
  openModalOutside = false,
  setOpenModalOutside,
  done,
  value,
  className,
  handleButton = () => {
    return;
  },
}: ModalProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);

    if (openModalOutside) setOpenModalOutside(false);

    handleButton();
  };
  return (
    <>
      {openModalOutside ? (
        <i
          className={iconStyle}
          key="preview"
          onClick={() => setOpen(true)}
        ></i>
      ) : (
        <Button
          type="button"
          variant={'outline'}
          onClick={() => setOpen(true)}
        >
          {value}
        </Button>
      )}

      <Transition.Root show={open || openModalOutside} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[50] overflow-y-scroll"
          onClose={handleClose}
        >
          <div className="flex min-h-screen items-center justify-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div
              className={
                modalStyle ??
                'relative z-50 mx-auto my-10 min-w-[70%] overflow-y-scroll rounded-3xl bg-white p-10 pb-20'
              }
            >
              {children}
              <Button
                variant={'secondary'}
                onClick={handleClose}
                className=""
              >
                {done ?? t('Done')}
              </Button>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;
