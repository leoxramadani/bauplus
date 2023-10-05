import { IInvoiceSchema, invoiceSchema } from '@/lib/schema/finance';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

const Invoice = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IInvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
  });

  const handleInvoiceAdd = () => {
    console.log('hello');
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleInvoiceAdd)}
        className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 justify-center w-full h-full"
      >
        <div className="flex flex-row justify-center items-center ">
          <div className="bg-gray-100 h-full">
            <span>INV#00</span>
          </div>
          <Input
            className=" rounded-l-none outline-none border-0"
            {...register('invoiceNumber')}
          />
        </div>
      </form>
    </div>
  );
};

export default Invoice;
