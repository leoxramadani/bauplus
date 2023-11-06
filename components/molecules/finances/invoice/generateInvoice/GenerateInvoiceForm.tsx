import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  IGenerateInvoice,
  IgeneratedInvoice,
  generateInvoiceSchema,
} from '@/lib/schema/Finance/invoice/generateInvoice';
import logoLoading from '@/public/video/loading-mimiro.gif';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import GeneratedForm from './GeneratedForm';

function isValidDate(dateString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

interface IGenerateInvoiceForm {
  setIsRegisterModalOpen: Dispatch<SetStateAction<boolean>>;
  refetchInvoices: any;
}

const GenerateInvoiceForm = ({
  setIsRegisterModalOpen,
  refetchInvoices,
}: IGenerateInvoiceForm) => {
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [file, setFile] = useState<any>();

  const [ocrData, setOcrData] = useState<IgeneratedInvoice>();
  const [ocrIsLoading, setOcrIsLoading] = useState(false);

  const form = useForm<IGenerateInvoice>({
    resolver: zodResolver(generateInvoiceSchema),
    mode: 'onChange',
  });

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    //TODO: Mund edhe te shtojme nje kusht per file size limit
    if (files && files.length > 0) {
      if (files[0].type.includes('image')) {
        setFile(files?.[0]);
        console.log(files?.[0]);
      } else {
        toast.error('Please upload only image files!');
      }
    }
  };

  const onSubmit = useCallback(async () => {
    setOcrIsLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    console.log('Inside of submit');
    axios
      .post(
        'https://mimiro-ai.azurewebsites.net/process-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        console.log('response=>', res.data);
        if (res.data) {
          res.data.date = isValidDate(res.data.date)
            ? new Date(res.data.date)
            : null;
          res.data.payment_due_date = isValidDate(
            res.data.payment_due_date
          )
            ? new Date(res.data.payment_due_date)
            : null;

          // if (isNaN(Number(res.data.total_amount))) {

          //   res.data.total_amount = 0;

          // }

          if (res.data.total_in_denars) {
            console.log(
              'res.data.total_in_denars->',
              res.data.total_in_denars
            );
            res.data.total_amount = swapCommaAndDot(
              res.data.total_in_denars
            );
          }
        }
        setOcrData(res.data);
        setGenerateModalOpen(true);
      })
      .catch((error) => {
        console.log('error=>', error);
        toast.error('Failed to retrieve data from the OCR');
      })
      .finally(() => {
        setOcrIsLoading(false);
      });
  }, [file]);

  const onError = (error: any) => {
    console.log('error generate->', error);
  };

  // const fileRef = form.register('image', { required: true });

  return (
    <div className="z-0 flex w-full flex-col gap-4">
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4"
      >
        {/* 
      <Input id="picture" type="file" value={file}/> */}
        <div className="flex flex-col gap-1">
          {/* <label htmlFor="fiscal.nrExtern">
              Image
              <span className="text-red-600">*</span>
            </label> */}
          <Label htmlFor="picture">Image</Label>
          <Input type="file" onChange={handleUpload} />
        </div>
        <Button type="submit" disabled={ocrIsLoading}>
          Submit
        </Button>
      </form>
      {/* <Modal open={ocrIsLoading} onOpenChange={setOcrIsLoading}>
          <Modal.Content className="w-full max-w-3xl">
          <Image
            src={logoLoading}
            layout={'responsive'}
            height={175}
            width={175}
            alt={`Thor logo`}
            unoptimized={true}
          />
          </Modal.Content>
        </Modal> */}
      {ocrIsLoading && (
        <div>
          <Image
            src={logoLoading}
            layout={'responsive'}
            height={175}
            width={175}
            alt={`Thor logo`}
            unoptimized={true}
          />
        </div>
      )}
      {ocrData && (
        <Modal
          open={generateModalOpen}
          onOpenChange={setGenerateModalOpen}
        >
          <Modal.Content className="w-full max-w-3xl">
            <GeneratedForm
              data={ocrData}
              setGenerateModalOpen={setGenerateModalOpen}
              refetchInvoices={refetchInvoices}
              setIsRegisterModalOpen={setIsRegisterModalOpen}
            />
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
};

export default GenerateInvoiceForm;

function swapCommaAndDot(inputString: string): number | null {
  let cleanedString = inputString.replace(/ /g, ''); // Remove spaces

  const dotIndex = cleanedString.indexOf('.');
  const commaIndex = cleanedString.indexOf(',');

  if (dotIndex !== -1 && commaIndex !== -1 && dotIndex < commaIndex) {
    // Case: 12.575,55 дen. => Swap comma and dot
    cleanedString = cleanedString
      .replace(/\./g, '') // Remove dots
      .replace(',', '.'); // Replace comma with dot
  } else if (commaIndex !== -1) {
    // Case: 12,575.55 => Replace comma with dot
    const reCleanString: string = cleanedString
      .replace(/,/g, '')
      .replace(' ', '');
    const floatValue: number = parseFloat(reCleanString);
    return floatValue;
  }

  const floatValue: number = parseFloat(cleanedString);
  return floatValue;
}
