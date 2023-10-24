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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GET_ALL_CLIENT_TYPES } from '@/lib/constants/endpoints/clients';
import {
  CREATE_BANK_ACCOUNT,
  GET_ALL_ACCOUNT_STATUSES,
  GET_ALL_ACCOUNT_TYPES,
  GET_ALL_CURRENCIES,
  GET_ONE_BANKACCOUNT,
  UPDATE_BANK_ACCOUNT,
} from '@/lib/constants/endpoints/finance';
import useData from '@/lib/hooks/useData';
import { ICreateClientSchema, createClientSchema } from '@/lib/schema/Clients/clients';
import {
  IcreateBankAccountSchema,
  createBankAccountSchema,
} from '@/lib/schema/Finance/finance';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { Key, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


export interface IClientsCreate {
  setModal(open: boolean): void;
  clientId?: string;
}

const ClientsCreate = ({ setModal, clientId }: IClientsCreate) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [client, setClient] = useState<any>();

  // useEffect(() => {
  //   async function getData(Id: string) {
  //     await axios
  //       .get(GET_ONE_BANKACCOUNT + `?BankAccountId=${Id}`)
  //       .then((res) => {
  //         console.log('setting employee data -->', res);
  //         setBankAccount(res.data);
  //       })
  //       .catch((error) => {
  //         console.log('error fetching employees->', error);
  //       });
  //   }

  //   if (bankAccountId) {
  //     getData(bankAccountId);
  //   }
  // }, [bankAccountId]);

  const {
    data: clientTypes,
    isError: clientTypessIsError,
    isLoading: ClientTypesIsLoading,
    error: currenciesError,
  } = useData<Array<{ [key: string]: any }>>(
    ['currencies'],
    GET_ALL_CLIENT_TYPES
  );

  const {
    data: accountTypes,
    isError: accountTypesIsError,
    isLoading: accountTypesIsLoading,
    error: accountTypesError,
  } = useData<Array<{ [key: string]: any }>>(
    ['account_types'],
    GET_ALL_ACCOUNT_TYPES
  );

  // const {
  //   data: employees,
  //   isError: employeesIsError,
  //   isLoading: employeesIsLoading,
  //   error: employeesError,
  // } = useData<IEmployee[]>(['employees'], GET_ALL_EMPLOYEES);

  const {
    data: status,
    isError: statusIsError,
    isLoading: statusIsLoading,
    error: statusError,
  } = useData<any>(['status'], GET_ALL_ACCOUNT_STATUSES);

  const form = useForm<ICreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    values: { ...client },
  });

  const onSubmit = useCallback(
    async (data: ICreateClientSchema) => {
      setIsSubmitting(true);
      // try {
      //   data.companyId = '145D8D93-7FF7-4A24-A184-AA4E010E7F37';
      //   console.log('submit:', data);
      //   if (bankAccount && router.query.id) {
      //     // Bank account data exists, perform update
      //     const res = await axios.put(UPDATE_BANK_ACCOUNT, {
      //       ...data,
      //       bankAccountId: bankAccountId,
      //     });
      //     console.log('Update response:', res);
      //     toast.success('Successfully updated bank account!');
      //     setIsSubmitting(false);
      //     setModal(false);
      //   } else {
      //     // Bank account data is empty, perform create
      //     const res = await axios.post(CREATE_BANK_ACCOUNT, {
      //       ...data,
      //       companyId: '145D8D93-7FF7-4A24-A184-AA4E010E7F37',
      //     });
      //     console.log('Create response:', res);
      //     toast.success('Successfully created new bank account!');
      //     setIsSubmitting(false);
      //     setModal(false);
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      //   toast.error('There was an issue! Please try again.');
      //   setIsSubmitting(false);
      // }
    },
    [client]
  );

  const onError = (error: any) => {
    console.log('error====> sadasda', error);
  };

  return (
    !statusIsLoading &&
    !ClientTypesIsLoading &&
    !accountTypesIsLoading && (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full flex-col gap-4"
        >
          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            {/* invoice number  */}

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Company Name"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           

            <FormField
              control={form.control}
              name="clientTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clientTypes && !ClientTypesIsLoading ? (
                        <>
                          {clientTypes.map((x: any) => (
                            <SelectItem
                              key={x.clientTypeId}
                              value={x.clientTypeId}
                            >
                              {x.clientTypeName}
                            </SelectItem>
                          ))}
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="First Name"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Last Name"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <Button
            variant="destructive"
            loading={isSubmitting}
            className="w-max"
          >
            Submit
          </Button>
        </form>
      </Form>
    )
  );
};

export default ClientsCreate;
