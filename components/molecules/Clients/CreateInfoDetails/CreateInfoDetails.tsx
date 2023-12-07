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
  ICreateClientInfo,
  clientDetailSchema,
} from '@/lib/schema/Clients/clients';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { SetStateAction, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { YourContactInfo } from '../ClientsForm';

interface ICreateAccount {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  details: YourContactInfo[];
  detail: YourContactInfo;

  setDetails: any;
  setDetail: any;
  isUpdate: any;
}

const CreateInfoDetails = ({
  setOpen,
  setDetails,
  isUpdate,
  details,
  detail,
  setDetail,
}: ICreateAccount) => {
  const form = useForm<ICreateClientInfo>({
    resolver: zodResolver(clientDetailSchema),
    defaultValues: {
      clientContactInfos: {
        id: detail.id || '',
        email: detail?.email || '',
        phone: detail?.phone || '',
        address: detail?.address || '',
      },
      clientDetails: details,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (data: ICreateClientInfo) => {
      if (isUpdate) {
        // Update the existing account details
        setDetails((prev: any) =>
          prev.map((account: YourContactInfo) =>
            account.id === detail?.id
              ? {
                  ...account,
                  email: data.clientContactInfos.email,
                  phone: data.clientContactInfos.phone,
                  address: data.clientContactInfos.address,
                }
              : account
          )
        );
      } else if (!isUpdate) {
        // Add a new account
        setDetails((prev: any) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            email: data.clientContactInfos.email,
            phone: data.clientContactInfos.phone,
            address: data.clientContactInfos.address,
          },
        ]);
      }

      setOpen(false);
      setDetail({
        id: '',
        businessId: '',
        country: '',
      });
    },
    [isUpdate, details, detail]
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
              name="clientContactInfos.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      disabled={isSubmitting}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientContactInfos.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter your phone number"
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
              name="clientContactInfos.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter your address"
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateInfoDetails;

const isEqual = (obj1: any, obj2: any): boolean => {
  return (
    obj1.email === obj2.email &&
    obj1.phone === obj2.phone &&
    obj1.address === obj2.address
  );
};
