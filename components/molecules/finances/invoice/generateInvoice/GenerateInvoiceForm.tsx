import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  IGenerateInvoice,
  IgeneratedInvoice,
  generateInvoiceSchema,
} from '@/lib/schema/Finance/invoice/generateInvoice';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
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
    <div className="z-0 flex w-full flex-col gap-2">
      {ocrIsLoading && (
        <div className="absolute inset-0 z-50 flex h-full w-full items-center justify-center rounded-lg bg-black/20">
          <Loader2 className="h-14 w-14 animate-spin text-zinc-100" />
        </div>
      )}

      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4"
      >
        {/* 
      <Input id="picture" type="file" value={file}/> */}
        {/* <div className="flex flex-col gap-2">
          
          <Label htmlFor="picture">Image - Use our OCR</Label>
          <Input type="file" onChange={handleUpload} />
        </div> */}

        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-row items-center justify-center gap-2  ">
              {file ? (
                <p className=" text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{file.name}</span>{' '}
                </p>
              ) : (
                <>
                  <svg
                    className=" h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className=" text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click to upload
                    </span>{' '}
                  </p>
                </>
              )}
              {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p> */}
            </div>
            <Input
              type="file"
              id="dropzone-file"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
        <Button
          type="submit"
          disabled={ocrIsLoading}
          className="w-max"
        >
          Submit
        </Button>
      </form>

      <div className="relative flex w-full items-center justify-center">
        <hr className="my-8 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
          or
        </span>
      </div>

      <GeneratedForm
        data={ocrData && ocrData}
        setGenerateModalOpen={setGenerateModalOpen}
        refetchInvoices={refetchInvoices}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
      />
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
    //
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
