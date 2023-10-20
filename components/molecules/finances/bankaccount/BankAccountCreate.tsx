'use client';

import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { IBankAccountCash } from '@/lib/schema/Finance/finance';
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
    <div className=" flex w-full flex-col gap-4 ">
      <div>
        <RadioGroup
          className="flex flex-row gap-4"
          defaultValue={accountType}
        >
          <div className="flex flex-row items-center gap-1">
            <RadioGroupItem
              className=" items-center justify-center "
              value="Bank"
              id="Bank"
              onClick={() => setAccountType('Bank')}
            />
            <Label htmlFor="Bank">Bank</Label>
          </div>
          <div className="flex cursor-not-allowed flex-row items-center gap-1 disabled:text-gray-400">
            <RadioGroupItem
              value="Cash"
              id="Cash"
              onClick={() => setAccountType('Cash')}
              disabled
            />
            <Label
              htmlFor="Cash"
              className="cursor-not-allowed text-gray-400"
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
