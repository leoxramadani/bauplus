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
import { IBankAccountCash } from '@/lib/schema/Finance/finance';
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

export interface IBankAccountCreate {
  setModal(open: boolean): void;
  bankAccountId?: string;
}

const BankAccountCreate = ({
  setModal,
  bankAccountId,
}: IBankAccountCreate) => {
  const [accountType, setAccountType] = useState<'Bank' | 'Cash'>(
    'Bank'
  );

  function onSubmitCash(data: IBankAccountCash) {
    console.log('test');
  }

  return (
    <div className=" flex flex-col gap-4 w-full ">
      <div>
        <RadioGroup
          className="flex flex-row gap-4"
          defaultValue={accountType}
        >
          <div className="flex items-center flex-row gap-1">
            <RadioGroupItem
              className=" justify-center items-center "
              value="Bank"
              id="Bank"
              onClick={() => setAccountType('Bank')}
            />
            <Label htmlFor="Bank">Bank</Label>
          </div>
          <div className="flex items-center flex-row gap-1 disabled:text-gray-400 cursor-not-allowed">
            <RadioGroupItem
              value="Cash"
              id="Cash"
              onClick={() => setAccountType('Cash')}
              disabled
            />
            <Label
              htmlFor="Cash"
              className="text-gray-400 cursor-not-allowed"
            >
              Cash
            </Label>
          </div>
        </RadioGroup>
      </div>

      {accountType == 'Bank' ? (
        <Bank
          bankAccountId={bankAccountId ? bankAccountId : ''}
          setModal={setModal}
        />
      ) : (
        <Cash />
      )}
    </div>
  );
};

export default BankAccountCreate;
