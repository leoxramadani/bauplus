import { ReactNode } from "react";
import CreatePayment from "../molecules/finances/payments/CreatePayment"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"



interface IModal {
  className?: string;
  title?: string;
  children: ReactNode;
  description?: string;
}


const Modal = ({children} : IModal) => {
  return (
    <Dialog>
  {children}
  
</Dialog>
  )
}


const ModalContent = ({title, children, description, className}: IModal) => {

    return (
      <DialogContent className={className}>
    <DialogHeader>
      <DialogTitle className="font-bold text-lg">{title}</DialogTitle>
      {description && (<DialogDescription>
        {description}
      </DialogDescription>)}
    </DialogHeader>
    {children}
  </DialogContent>
    )
}

Modal.Trigger = DialogTrigger
Modal.Content = ModalContent

export default Modal