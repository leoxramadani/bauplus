import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
  CREATE_CLIENTS,
  GET_ALL_CLIENT_TYPES,
  GET_SPECIFIC_CLIENT,
  UPDATE_SPECIFIC_CLIENTS,
} from '@/lib/constants/endpoints/clients';
import useData from '@/lib/hooks/useData';
import {
  ICreateClientSchema,
  createClientSchema,
} from '@/lib/schema/Clients/clients';
import { ICompanySettings } from '@/lib/schema/settings/companysettings';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export interface YourAccountDetailsType {
  id: string;
  accountNumber: string;
  country: string;
}

export interface YourBusinessDetails {
  id: string;
  businessId: string;
  country: string;
}
export interface YourContactInfo {
  id: string;
  email: string;
  phone: string;
  address: string;
}

const AttendanceOptionsForm = () => {
  const router = useRouter();
  const [edit, isEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [client, setClient] = useState<any>();

  const [accountDetails, setAccountDetails] = useState<
    YourAccountDetailsType[]
  >([]);
  console.log(accountDetails);

  const [businessDetails, setBusinessDetails] = useState<
    YourBusinessDetails[]
  >([]);
  const [clientInfos, setClientInfos] = useState<YourContactInfo[]>(
    []
  );

  const [formData, setFormData] = useState<ICompanySettings>({
    companyId: '',
    companyName: '',
    contactEmail: '',
    contactPhone: 0,
    website: '',
  });

  const {
    data: clientTypes,
    isError: clientTypessIsError,
    isLoading: ClientTypesIsLoading,
    error: currenciesError,
  } = useData<Array<{ [key: string]: any }>>(
    ['currencies'],
    GET_ALL_CLIENT_TYPES
  );

  const form = useForm<ICreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    values: {
      ...client,
      clientBusinessIds: client?.clientBusinessIds,
      clientContactInfos: client?.clientContactInfos,
    },
  });

  useEffect(() => {
    async function getData(Id: string) {
      isEdit(true);
      await axios
        .get(GET_SPECIFIC_CLIENT + Id)
        .then((res) => {
          setClient(res.data);
          setAccountDetails(res.data.clientAccountNumbers);
          form.setValue(
            'clientAccountNumbers',
            res.data.clientAccountNumbers
          );
          setBusinessDetails(res.data.clientBusinessIds);
          form.setValue(
            'clientBusinessIds',
            res.data.clientBusinessIds
          );
          setClientInfos(res.data.clientContactInfos);
          form.setValue(
            'clientContactInfos',
            res.data.clientContactInfos
          );
          isEdit(false);
        })
        .catch(() => {
          toast.error('There was an error! Please try again.');
          isEdit(false);
        });
    }
  }, []);

  useEffect(() => {
    form.setValue('clientAccountNumbers', accountDetails);
  }, [accountDetails]);
  useEffect(() => {
    form.setValue('clientBusinessIds', businessDetails);
  }, [businessDetails]);
  useEffect(() => {
    form.setValue('clientContactInfos', clientInfos);
  }, [clientInfos]);

  const onSubmit = useCallback(
    async (data: ICreateClientSchema) => {
      setIsSubmitting(true);
      if (router.query.id) {
        await axios
          .put(UPDATE_SPECIFIC_CLIENTS, {
            ...data,
            clientAccountNumbers: accountDetails,
            clientBusinessIds: businessDetails,
            clientContactInfos: clientInfos,
          })
          .then((res) => {
            console.log('UPDATED client->', res);
            router.replace('/hr/employees', undefined, {
              shallow: true,
            });
            setIsSubmitting(false);
            toast.success('Successfully updated client');
          })
          .catch((error) => {
            console.log('Error UPDATING employee:', error);
            toast.error(
              'There was an issue updating client! Please try again.'
            );
          });
      } else {
        await axios
          .post(CREATE_CLIENTS, {
            ...data,
            // clientAccountNumbers: accountDetails,
            // clientBusinessIds: businessDetails,
            // clientContactInfos: clientInfos,
          })
          .then((res) => {
            console.log('Success->', res);
            toast.success('Client added');
            setIsSubmitting(false);
          })
          .catch((error) => {
            console.error('Error creating client:', error);
            toast.error(
              'There was an issue adding client! Please try again.'
            );
          });
      }

      setIsSubmitting(false);
    },
    [client /*,accountDetails*/]
  );

  const onError = (error: any) => {
    console.log('error submiting client form --->', error);
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">
            Attendance options
          </h1>
        </div>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="flex w-full max-w-5xl flex-col justify-between gap-4 lg:flex-row"
            >
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Employee_id"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Department"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Check_in"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Shift"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Status"
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
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Name"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Date"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Check_out"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Attended"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="relative">
                          <Input
                            placeholder="Break"
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
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div>
          <Button className="flex flex-row items-center justify-center gap-1">
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default AttendanceOptionsForm;
