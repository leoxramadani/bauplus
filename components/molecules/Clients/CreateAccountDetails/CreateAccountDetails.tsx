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
          className="flex flex-col gap-4"
        >
          <div className="flex w-full  flex-row items-center justify-start  gap-4 ">
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
            <Button type="submit" className="w-max">
              Submit
            </Button>
            <Button
              variant="outline"
              type="button"
              className="w-max"
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
