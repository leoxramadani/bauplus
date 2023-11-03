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
import { YourAccountDetailsType } from '../ClientsForm1';

interface ICreateAccount {
  setAccoundModal: React.Dispatch<SetStateAction<boolean>>;
  accountDetails: YourAccountDetailsType[];
  accountDetail: any;

  setAccountDetails: any;
  setAccountDetail: any;
  isUpdate: any;
}

const CreateAccountDetails = ({
  setAccoundModal,
  setAccountDetails,
  isUpdate,
  accountDetails,
  accountDetail,
  setAccountDetail,
}: ICreateAccount) => {
  const form = useForm<iCreateAccountDetail>({
    resolver: zodResolver(accountDetailSchema),
    defaultValues: {
      clientAccountNumbers: {
        accountNumber: accountDetail?.accountNumber || '',
        country: accountDetail?.country || '',
      },
      accountDetails,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (data: iCreateAccountDetail) => {
      if (isUpdate) {
        // Update the existing account details
        setAccountDetails((prev: any) =>
          prev.map((account: any) =>
            account.accountNumber === accountDetail?.accountNumber
              ? {
                  accountNumber:
                    data.clientAccountNumbers.accountNumber,
                  country: data.clientAccountNumbers.country,
                }
              : account
          )
        );
      } else if (!isUpdate) {
        // Add a new account
        setAccountDetails((prev: any) => [
          ...prev,
          {
            accountNumber: data.clientAccountNumbers.accountNumber,
            country: data.clientAccountNumbers.country,
          },
        ]);
      }

      setAccoundModal(false);
      setAccountDetail({
        accountNumber: '',
        country: '',
      });
    },
    [isUpdate, accountDetails, accountDetail]
  );
  const onError = (error: any) => {
    console.log('EEERRROOR->', error);
  };

  return (
    <div className="z-0 flex w-full flex-col justify-start gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex w-full flex-col   items-center justify-start gap-4  sm:flex-row ">
            {/* project */}

            <FormField
              control={form.control}
              name="clientAccountNumbers.accountNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Account Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Account Number"
                      {...field}
                      disabled={isSubmitting}
                      type="number"
                      
                      className="w-full"
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
                <FormItem className="w-full">
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

          <div className="flex w-full flex-row items-center gap-2 sm:w-max">
            <Button type="submit" className="w-full sm:w-max">
              Submit
            </Button>
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-max"
              onClick={() => setAccoundModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateAccountDetails;
