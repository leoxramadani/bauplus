import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { countries } from '@/lib/helper/helper';
import {
  accountDetailSchema,
  iCreateAccountDetail,
} from '@/lib/schema/Clients/clients';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, {
  Key,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
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
        id: accountDetail.id,
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
            account.id === accountDetail?.id
              ? {
                  id: account.id,
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
            id: crypto.randomUUID(),
            accountNumber: data.clientAccountNumbers.accountNumber,
            country: data.clientAccountNumbers.country,
          },
        ]);
      }

      setAccoundModal(false);
      setAccountDetail({
        id: '',
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
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Account country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isSubmitting}
                        >
                          {field.value
                            ? countries?.find(
                                (country) =>
                                  country.name === field.value
                              )?.name
                            : 'Choose country'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search for employee..." />
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup className="flex h-full max-h-[200px] flex-col gap-4 overflow-y-auto">
                          {countries?.map((country, i: Key) => (
                            <CommandItem
                              value={country.name}
                              className="flex items-center"
                              key={i}
                              onSelect={() => {
                                country.name &&
                                  form.setValue(
                                    'clientAccountNumbers.country',
                                    country?.name
                                  );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  country.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {`${country.name}`}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

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
