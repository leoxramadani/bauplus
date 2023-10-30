import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  accountDetailSchema,
  iCreateAccountDetail,
} from '@/lib/schema/Clients/clients';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { SetStateAction, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { YourAccountDetailsType } from '../ClientsForm';

interface ICreateAccount {
  setAccoundModal: React.Dispatch<SetStateAction<boolean>>;
  accountDetails: YourAccountDetailsType[];
  setAccNr: any;
  setAccCon: any;
  setAccountDetails: any;
  accCon: any;
  accNr: any;
  isUpdate: any;
}

const CreateAccountDetails = ({
  setAccoundModal,
  setAccountDetails,
  setAccCon,
  setAccNr,
  accCon,
  accNr,
  isUpdate,
  accountDetails,
}: ICreateAccount) => {
  const isAccountNumberUnique = (
    accountNumber: string,
    accountDetails: any[]
  ) => {
    return !accountDetails.some(
      (account) => account.accountNumber === accountNumber
    );
  };

  const form = useForm<iCreateAccountDetail>({
    resolver: zodResolver(accountDetailSchema),
    defaultValues: {
      clientAccountNumbers: {
        accountNumber: accNr || '',
        country: accCon || '',
      },
      accountDetails,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const accountDetails: { accountNumber: string; country: string }[] = [];

  const onSubmit = useCallback(
    async (data: iCreateAccountDetail) => {
      if (
        data.clientAccountNumbers.country == undefined ||
        data.clientAccountNumbers.accountNumber == undefined
      ) {
        console.log('empty arrays');
      } else {
        if (isUpdate) {
          // Update the existing account details
          setAccountDetails((prev: any) =>
            prev.map((account: any) =>
              account.accountNumber === accNr
                ? {
                    accountNumber:
                      data.clientAccountNumbers.accountNumber ==
                        undefined || null
                        ? ''
                        : data.clientAccountNumbers.accountNumber,
                    country:
                      data.clientAccountNumbers.country ==
                        undefined || null
                        ? ''
                        : data.clientAccountNumbers.country,
                  }
                : account
            )
          );
        } else if (!isUpdate) {
          // Add a new account
          setAccountDetails((prev: any) => [
            ...prev,
            {
              accountNumber:
                data.clientAccountNumbers.accountNumber ==
                  undefined || null
                  ? ''
                  : data.clientAccountNumbers.accountNumber,
              country:
                data.clientAccountNumbers.country == undefined || null
                  ? ''
                  : data.clientAccountNumbers.country,
            },
          ]);
        }
      }

      setAccoundModal(false);
      setAccCon('');
      setAccNr('');
    },
    [isUpdate, accNr, setAccountDetails]
  );
  const onError = (error: any) => {
    console.log('EEERRROOR->', error);
  };

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-row  items-center justify-center  gap-4 ">
            {/* project */}

            <FormField
              control={form.control}
              name="clientAccountNumbers.accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Account Number"
                      {...field}
                      disabled={isSubmitting}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientAccountNumbers.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account country</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Account country"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outline"
              type="button"
              className="w-max"
              onClick={() => setAccoundModal(false)}
            >
              Cancel
            </Button>
            {isUpdate == true ? (
              <Button type="submit" className="w-max">
                Change
              </Button>
            ) : (
              <Button type="submit" className="w-max">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateAccountDetails;
