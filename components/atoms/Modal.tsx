'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface IModal {
  className?: string;
  title?: string;
  children: ReactNode;
  description?: string;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}

const Modal = ({ children, open, onOpenChange }: IModal) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
};

const ModalContent = ({
  title,
  children,
  description,
  className,
}: IModal) => {
  return (
    <DialogContent
      className={cn(
        'max-sm:h-screen max-sm:overflow-y-scroll',
        className
      )}
    >
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">
          {title}
        </DialogTitle>
        {description && (
          <DialogDescription>{description}</DialogDescription>
        )}
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

Modal.Trigger = DialogTrigger;
Modal.Content = ModalContent;
Modal.Close = DialogClose;

export default Modal;
