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
import { GET_ALL_EMPLOYEES } from '@/lib/constants/endpoints/employee';
import {
  CREATE_BANK_ACCOUNT,
  GET_ALL_ACCOUNT_STATUSES,
  GET_ALL_ACCOUNT_TYPES,
  GET_ALL_CURRENCIES,
  GET_ONE_BANKACCOUNT,
  UPDATE_BANK_ACCOUNT,
} from '@/lib/constants/endpoints/finance';
import useData from '@/lib/hooks/useData';
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
import { IBankAccountCreate } from '../BankAccountCreate';

interface IEmployee {
  employeeId?: string;
  companyId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  departmentId: string;
}

const Bank = ({ setModal, bankAccountId }: IBankAccountCreate) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankAccount, setBankAccount] = useState<any>();

  useEffect(() => {
    async function getData(Id: string) {
      await axios
        .get(GET_ONE_BANKACCOUNT + `?BankAccountId=${Id}`)
        .then((res) => {
          console.log('setting employee data -->', res);
          setBankAccount(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    if (bankAccountId) {
      getData(bankAccountId);
    }
  }, [bankAccountId]);

  const {
    data: currencies,
    isError: currenciesIsError,
    isLoading: currenciesIsLoading,
    error: currenciesError,
  } = useData<Array<{ [key: string]: any }>>(
    ['currencies'],
    GET_ALL_CURRENCIES
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

  const {
    data: employees,
    isError: employeesIsError,
    isLoading: employeesIsLoading,
    error: employeesError,
  } = useData<IEmployee[]>(['employees'], GET_ALL_EMPLOYEES);

  const {
    data: status,
    isError: statusIsError,
    isLoading: statusIsLoading,
    error: statusError,
  } = useData<any>(['status'], GET_ALL_ACCOUNT_STATUSES);

  const form = useForm<IcreateBankAccountSchema>({
    resolver: zodResolver(createBankAccountSchema),
    values: { ...bankAccount },
  });

  const onSubmit = useCallback(
    async (data: IcreateBankAccountSchema) => {
      setIsSubmitting(true);
      try {
        data.companyId = '145D8D93-7FF7-4A24-A184-AA4E010E7F37';
        console.log('submit:', data);
        if (bankAccount && router.query.id) {
          // Bank account data exists, perform update
          const res = await axios.put(UPDATE_BANK_ACCOUNT, {
            ...data,
            bankAccountId: bankAccountId,
          });
          console.log('Update response:', res);
          toast.success('Successfully updated bank account!');
          setIsSubmitting(false);
          setModal(false);
        } else {
          // Bank account data is empty, perform create
          const res = await axios.post(CREATE_BANK_ACCOUNT, {
            ...data,
            companyId: '145D8D93-7FF7-4A24-A184-AA4E010E7F37',
          });
          console.log('Create response:', res);
          toast.success('Successfully created new bank account!');
          setIsSubmitting(false);
          setModal(false);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('There was an issue! Please try again.');
        setIsSubmitting(false);
      }
    },
    [bankAccount]
  );

  const onError = (error: any) => {
    console.log('error====> sadasda', error);
  };

  return (
    !statusIsLoading &&
    !employeesIsLoading &&
    !currenciesIsLoading &&
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
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl className="relative">
                    <Input
                      placeholder="Bank Name"
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
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Account Name"
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
              name="employeeId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Account Holder Name</FormLabel>
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
                            ? employees?.find(
                                (employee) =>
                                  employee.employeeId === field.value
                              )?.firstName +
                              ' ' +
                              employees?.find(
                                (employee) =>
                                  employee.employeeId === field.value
                              )?.lastName
                            : 'Choose member'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No member found.</CommandEmpty>
                        <CommandGroup className="flex h-full max-h-[200px] flex-col gap-4 overflow-y-auto">
                          {employees?.map((employee, i: Key) => (
                            <CommandItem
                              value={
                                employee.firstName +
                                ' ' +
                                employee.lastName
                              }
                              className="flex items-center"
                              key={i}
                              onSelect={() => {
                                employee.employeeId &&
                                  form.setValue(
                                    'employeeId',
                                    employee?.employeeId
                                  );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  employee.employeeId === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {`${employee.firstName} ${employee.lastName}`}
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

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter account number"
                      className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      autoComplete="off"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankAccountTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accountTypes ? (
                        <>
                          {accountTypes.map((x: any) => {
                            return (
                              <SelectItem
                                value={x.bankAccountTypeId}
                                key={x.bankAccountTypeId}
                              >
                                {x.bankAccountTypeName}
                              </SelectItem>
                            );
                          })}
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
              name="currencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies && !currenciesIsLoading ? (
                        <>
                          {currencies.map((x: any) => (
                            <SelectItem
                              key={x.currencyID}
                              value={x.currencyID}
                            >
                              {x.currencyName}
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

            {/* 
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>

                <FormControl className="relative">
                  <Input
                    placeholder="Enter contact number"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Balance</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter opening balance"
                      className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      autoComplete="off"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankAccountStatusId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {status && !statusIsLoading ? (
                        <>
                          {status.map((x: any) => {
                            return (
                              <SelectItem
                                value={x.bankAccountStatusId}
                                key={x.bankAccountStatusId}
                              >
                                {x.statusName}
                              </SelectItem>
                            );
                          })}
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
          </div>

          <Button loading={isSubmitting} className="w-max">
            Submit
          </Button>
        </form>
      </Form>
    )
  );
};

export default Bank;
