import { Button } from '@/components/ui/button';
import Btn from '@/components/Button';
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
import {
  IBankAccount,
  IcreateBankAccountSchema,
  bankAccountSchema,
  createBankAccountSchema,
} from '@/lib/schema/Finance/finance';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  CREATE_BANK_ACCOUNT,
  GET_ALL_ACCOUNT_STATUSES,
  GET_ALL_ACCOUNT_TYPES,
  GET_ALL_CURRENCIES,
  GET_MY_EMPLOYEE_NAMES,
} from '@/lib/constants/endpoints/finance';
import { watch } from 'fs';
import { toast } from 'react-toastify';
import { IBankAccountCreate } from '../BankAccountCreate';
const Bank = ({ setModal }: IBankAccountCreate) => {
  const form = useForm<IcreateBankAccountSchema>({
    resolver: zodResolver(createBankAccountSchema),

    // defaultValues: {
    //   bankName: '',
    //   employeeId: '',
    //   currencyId: '',
    //   bankAccountTypeId: '',
    //   bankAccountStatusId: '',
    //   accountName: '',
    //   accountNumber: '',
    //   openingBalance: 0,
    // },
  });

  const onSubmit = useCallback(
    async (data: IcreateBankAccountSchema) => {
      axios
        .post(CREATE_BANK_ACCOUNT, {
          ...data,
        })
        .then((res: any) => {
          toast.success('Successfully created new bank account!');
          setModal(false);
        })
        .catch((error) => {
          console.log('error=', error);
        });
    },
    []
  );

  const [allCurrencies, setAllCurrencies] = useState<any>();
  const [allAccountTypes, setAllAccountTypes] = useState<any>();
  const [allAccountStatuses, setAllAccountStatuses] = useState<any>();
  const [allEmployeesNames, setAllEmployeesNames] = useState<any>();
  useEffect(() => {
    async function getCurrencies() {
      await axios
        .get(GET_ALL_CURRENCIES)
        .then((res) => {
          setAllCurrencies(res.data);
        })
        .catch((error) => {
          console.log('error=', error);
        });
    }
    async function getAccountTypes() {
      await axios
        .get(GET_ALL_ACCOUNT_TYPES)
        .then((res) => {
          setAllAccountTypes(res.data);
        })
        .catch((error) => {
          console.log('error=', error);
        });
    }

    async function getAccountStatuses() {
      await axios
        .get(GET_ALL_ACCOUNT_STATUSES)
        .then((res) => {
          setAllAccountStatuses(res.data);
        })
        .catch((error) => {
          console.log('error=', error);
        });
    }

    async function getEmployeeName() {
      await axios
        .get(GET_MY_EMPLOYEE_NAMES)
        .then((res) => {
          setAllEmployeesNames(res.data);
        })
        .catch((error) => {
          console.log('error=', error);
        });
    }

    getCurrencies();
    getAccountTypes();
    getAccountStatuses();
    getEmployeeName();
  }, []);

  const onError = (error: any) => {
    console.log('error====>', error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
          {/* invoice number  */}
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>

                <FormControl className="relative">
                  <Input placeholder="Bank Name" {...field} />
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
                    placeholder="Enter account number"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="input"
                    autoComplete="off"
                    {...field}
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
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Enter account holder name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allEmployeesNames ? (
                      <>
                        {allEmployeesNames.map((x: any) => {
                          return (
                            <SelectItem
                              key={x.employeeId}
                              value={x.employeeId}
                            >
                              {x.firstName}
                              {''} {x.lastName}
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
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>

                <FormControl className="relative">
                  <Input
                    placeholder="Enter account number"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    autoComplete="off"
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allAccountTypes ? (
                      <>
                        {allAccountTypes.map((x: any) => {
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allCurrencies ? (
                      <>
                        {allCurrencies.map((x: any) => {
                          return (
                            <SelectItem
                              key={x.currencyID}
                              value={x.currencyID}
                            >
                              {x.currencyName}
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
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    autoComplete="off"
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Enter Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allAccountStatuses ? (
                      <>
                        {allAccountStatuses.map((x: any) => {
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

        <Btn className="button w-max" type="submit">
          Submit
        </Btn>
      </form>
    </Form>
  );
};

export default Bank;
