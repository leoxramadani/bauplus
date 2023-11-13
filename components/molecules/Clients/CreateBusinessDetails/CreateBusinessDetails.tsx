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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Countries from '@/lib/constants/staticFiles/countries.json';
import {
  ICreateBusiness,
  businessDetailSchema,
} from '@/lib/schema/Clients/clients';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { SetStateAction, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { YourBusinessDetails } from '../ClientsForm';

interface ICreateAccount {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  details: YourBusinessDetails[];
  detail: YourBusinessDetails;

  setDetails: any;
  setDetail: any;
  isUpdate: any;
}

const CreateBusinessDetails = ({
  setOpen,
  setDetails,
  isUpdate,
  details,
  detail,
  setDetail,
}: ICreateAccount) => {
  const form = useForm<ICreateBusiness>({
    resolver: zodResolver(businessDetailSchema),
    defaultValues: {
      clientBusinessIds: {
        id: detail.id || '',
        businessId: detail?.businessId || '',
        country: detail?.country || '',
      },
      businessDetails: details,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (data: ICreateBusiness) => {
      if (isUpdate) {
        // Update the existing account details
        setDetails((prev: any) =>
          prev.map((account: YourBusinessDetails) =>
            account.id === detail?.id
              ? {
                  ...account,
                  businessId: data.clientBusinessIds.businessId,
                  country: data.clientBusinessIds.country,
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
            businessId: data.clientBusinessIds.businessId,
            country: data.clientBusinessIds.country,
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
              name="clientBusinessIds.businessId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Business Number"
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
              name="clientBusinessIds.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country " />
                    </SelectTrigger>
                    <SelectContent>
                      {Countries ? (
                        <div className="h-[200px]">
                          {Countries.map((temp: any) => {
                            return (
                              <SelectItem
                                value={temp.name}
                                key={temp.code}
                              >
                                {temp.name}
                              </SelectItem>
                            );
                          })}
                        </div>
                      ) : (
                        <p>Loading</p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="clientBusinessIds.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business country</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Business country"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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

export default CreateBusinessDetails;
