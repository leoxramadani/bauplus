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
  ICreateBusiness,
  businessDetailSchema,
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
                <FormItem className="w-full">
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
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Business Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'flex w-full items-center justify-between gap-1 p-2.5',
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
                                    'clientBusinessIds.country',
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
