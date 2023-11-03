import Modal from '@/components/atoms/Modal';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROCESS_INVOICE } from "@/lib/constants/endpoints/ocr/ocr";
import { IGenerateInvoice, IgeneratedInvoice, generateInvoiceSchema } from "@/lib/schema/Finance/invoice/generateInvoice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FILE } from "dns";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Generate from './Generate';
import Image from 'next/image';
import logoLoading from '@/public/video/loading-mimiro.gif';

const GenerateInvoiceForm = () => {
  const [generateModalOpen,setGenerateModalOpen]=useState(false)
  const [file,setFile]=useState<any>();

  const [ocrData,setOcrData]=useState<IgeneratedInvoice>()
  const [ocrIsLoading,setOcrIsLoading]=useState(false);

  const form = useForm<IGenerateInvoice>({
    resolver: zodResolver(generateInvoiceSchema),
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


  const onSubmit = useCallback(
    async () => {
      setOcrIsLoading(true);
      const formData = new FormData();

      if (file) {
        formData.append('image', file);
      }

      console.log("Inside on submit")
      axios.post("https://mimiro-ai.azurewebsites.net/process-image",formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res)=>{
        console.log("response=>",res.data);

        if (res.data) {
          console.log(new Date(res.data.date ) ?? new Date(''));        
          res.data.date = new Date(res.data.date );
          res.data.payment_due_date= new Date(res.data.payment_due_date ?? new Date('') );
        }
        setOcrData(res.data)
        // setOcrIsLoading(false)
        setGenerateModalOpen(true)
      }).catch((error)=>{
        console.log("error=>",error);        
      })
      // setOcrIsLoading(false)
    },
    [file]
  );

  // useEffect(()=>{
  //   if (!ocrIsLoading) {
  //     console.log("Inside useEffect");
      
  //     setOcrIsLoading(true)
  //   }
  // },[onSubmit])

  const onError=(error:any)=>{
    console.log("error generate->",error);
  }

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <form onSubmit={form.handleSubmit(onSubmit,onError)} className="flex flex-col gap-4">
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
        <Button type="submit" disabled={ocrIsLoading}>Submit</Button>
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
        {
          ocrIsLoading &&
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
        }
      {
        ocrData &&
      <Modal open={generateModalOpen} onOpenChange={setGenerateModalOpen}>
        <Modal.Content className="w-full max-w-3xl">
          <Generate data={ocrData}/>
        </Modal.Content>
      </Modal>
      }
    </div>
  );
};

export default GenerateInvoiceForm;
