import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useTranslation from '@/lib/hooks/useTranslation';
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
          className="fixed z-[50] inset-0 overflow-y-scroll"
          onClose={handleClose}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div
              className={
                modalStyle ??
                'relative mx-auto min-w-[70%] overflow-y-scroll pb-20 bg-white z-50 p-10 my-10 rounded-3xl'
              }
            >
              {children}
              <Button variant={'secondary'} onClick={handleClose} className=''>
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
