import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IGenerateInvoice, generateInvoiceSchema } from "@/lib/schema/Finance/invoice/generateInvoice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const GenerateInvoiceForm = () => {
  const [file,setFile]=useState<any>();


  const form = useForm<IGenerateInvoice>({
    resolver: zodResolver(generateInvoiceSchema),
  });

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Image file</Label>
      <Input id="picture" type="file"/>
    </div>
  );
};

export default GenerateInvoiceForm;
