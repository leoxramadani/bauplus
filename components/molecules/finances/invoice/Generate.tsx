import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IgeneratedInvoice, generatedInvoice } from "@/lib/schema/Finance/invoice/generateInvoice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

interface IGenerateProps{
  data:any
}
const Generate = ({data}:IGenerateProps) => {


  const form = useForm<IgeneratedInvoice>({
    resolver: zodResolver(generatedInvoice),
    values: {...data}
  });

  const onSubmit = useCallback(
    async (data: IgeneratedInvoice) => {
    
    },
    []
  );

  const onError = (error: any) => {
    console.log('Error Invoice ::', error);
  };
  
  return (
    <div className="z-0 flex w-full flex-col gap-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit,onError)} className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2">
          {/* Address */}
          <FormField
            control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="bank_accounts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Bank Accounts<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Bank Accounts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="contact_person"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Contact Person<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Contact Person" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Currency<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Currency" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Date<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="description_of_itemservice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descripton of item service<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Description of item service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="in_words"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    In Words<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="In words" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="invoice_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Company Id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="location_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Location Address<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Location Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="organization_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Organization Unit<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Organization Unit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
              name="payment_due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Payment due date<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Payment due date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
        </div>
          <Button className="w-max" type="submit">
            Submit
          </Button>
        </form>

      </Form>
    </div>
  );
};

export default Generate;
