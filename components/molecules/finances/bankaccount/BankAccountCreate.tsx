'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  IBankAccount,
  IBankAccountCash,
  IInvoiceSchema,
  bankAccountSchema,
  bankAccountSchemaCash,
  invoiceSchema,
} from '@/lib/schema/Finance/finance';
import { Input } from '@/components/ui/input';
import { watch } from 'fs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import Bank from './type/Bank';
import Cash from './type/Cash';
// import { toast } from "@/components/ui/use-toast"

const BankAccountCreate = () => {
  
 
  const [accountType, setAccountType] = useState<'Bank' | 'Cash'>('Bank');

 

  function onSubmitCash(data: IBankAccountCash) {
    console.log('test');
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h2 className="text-3xl font-bold text-blue-500">
          Bank Account
        </h2>
        <h3 className="font-normal text-lg text-gray-900">
          Add a bank account
        </h3>
      </div>
      <div>
        <RadioGroup
          className="flex flex-row gap-4"
          defaultValue={accountType}
        
        >
          <div className="flex items-center flex-row gap-1">
            <RadioGroupItem
              className="accent-pink-300 md:accent-pink-500 "
              value="Bank"
              id="Bank"
              onClick={() => setAccountType('Bank')}
            />
            <Label htmlFor="Bank">Bank</Label>
          </div>
          <div className="flex items-center flex-row gap-1">
            <RadioGroupItem value="Cash" id="Cash" onClick={() => setAccountType('Cash')}/>
            <Label htmlFor="Cash">Cash</Label>
          </div>
        </RadioGroup>
      </div>

      {accountType == 'Bank' ? (
        <Bank />
      ): (
        <Cash />
      )}
    </div>
  );
};

export default BankAccountCreate;
