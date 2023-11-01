import Modal from '@/components/atoms/Modal';
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
import {
  CREATE_CLIENTS,
  GET_ALL_CLIENT_TYPES,
  GET_SPECIFIC_CLIENT,
  UPDATE_SPECIFIC_CLIENTS,
} from '@/lib/constants/endpoints/clients';
import { GET_ALL_ACCOUNT_STATUSES } from '@/lib/constants/endpoints/finance';
import useData from '@/lib/hooks/useData';
import {
  ICreateClientSchema,
  createClientSchema,
} from '@/lib/schema/Clients/clients';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CreateAccountDetails from './CreateAccountDetails/CreateAccountDetails';
import CreateBusinessDetails from './CreateBusinessDetails/CreateBusinessDetails';

export interface IClientsCreate {
  setModal(open: boolean): void;
  clientId?: string;
}
export interface YourAccountDetailsType {
  accountNumber: string;
  country: string;
}

export interface YourBusinessDetails {
  businessId: string;
  country: string;
}
export interface YourContactInfo {
  email: string;
  phone: string;
  address: string;
}

const ClientsForm = ({ setModal, clientId }: IClientsCreate) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [client, setClient] = useState<any>();
  const [accountModal, setAccoundModal] = useState<boolean>(false);
  const [businessModal, setBusinessModal] = useState<boolean>(false);
  const [clientModal, setClientModal] = useState<boolean>(false);
  const [accDetail, setAccDetail] = useState<YourAccountDetailsType>({
    accountNumber: '',
    country: '',
  });
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [accountDetails, setAccountDetails] = useState<
    YourAccountDetailsType[]
  >([]);
  const [businessDetails, setBusinessDetails] = useState<
    YourBusinessDetails[]
  >([]);
  const [bizDetail, setBizDetail] = useState<YourBusinessDetails>({
    businessId: '',
    country: '',
  });
  const [clientInfos, setClientInfos] = useState<YourContactInfo[]>(
    []
  );
  const [clientInfo, setClientInfo] = useState<YourContactInfo>({
    email: '',
    phone: '',
    address: '',
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

  const {
    data: status,
    isError: statusIsError,
    isLoading: statusIsLoading,
    error: statusError,
  } = useData<any>(['status'], GET_ALL_ACCOUNT_STATUSES);

  const form = useForm<ICreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    values: {
      ...client,
      clientBusinessIds: client?.clientBusinessIds[0],
      clientContactInfos: client?.clientContactInfos[0],
    },
  });

  useEffect(() => {
    async function getData(Id: string) {
      console.log('inside getData');
      await axios
        .get(GET_SPECIFIC_CLIENT + Id)
        .then((res) => {
          setClient(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    if (clientId) {
      getData(clientId);
    }
  }, [clientId]);

  useEffect(() => {
    form.setValue('clientAccountNumbers', accountDetails);
  }, [accountDetails]);
  useEffect(() => {
    form.setValue('clientBusinessIds', businessDetails);
  }, [businessDetails]);

  const onSubmit = useCallback(
    async (data: ICreateClientSchema) => {
      setIsSubmitting(true);
      try {
        //   data.companyId = '145D8D93-7FF7-4A24-A184-AA4E010E7F37';
        //   console.log('submit:', data);
        if (clientId && router.query.id) {
          let ArrayclientAccountNumbers: any = [];
          ArrayclientAccountNumbers.push(data.clientAccountNumbers);

          let ArrayclientBusinessIds: any = [];
          ArrayclientBusinessIds.push(data.clientBusinessIds);

          let ArrayclientContactInfos: any = [];
          ArrayclientContactInfos.push(data.clientContactInfos);

          const res = await axios.put(
            UPDATE_SPECIFIC_CLIENTS,
            {
              ...data,
              clientAccountNumbers: ArrayclientAccountNumbers,
              clientBusinessIds: ArrayclientBusinessIds,
              clientContactInfos: ArrayclientContactInfos,
            },
            {
              params: {
                id: clientId,
              },
            }
          );
          console.log('Update response:', res);
          toast.success('Successfully updated bank account!');
          setIsSubmitting(false);
          setModal(false);
        } else {
          let ArrayclientAccountNumbers: any = [];
          ArrayclientAccountNumbers.push(data.clientAccountNumbers);

          let ArrayclientBusinessIds: any = [];
          ArrayclientBusinessIds.push(data.clientBusinessIds);

          let ArrayclientContactInfos: any = [];
          ArrayclientContactInfos.push(data.clientContactInfos);

          const res = await axios.post(
            CREATE_CLIENTS,
            {
              ...data,
              clientAccountNumbers: ArrayclientAccountNumbers,
              clientBusinessIds: ArrayclientBusinessIds,
              clientContactInfos: ArrayclientContactInfos,
            },
            {
              params: {
                clientTypeId: data.clientTypeId,
              },
            }
          );
          console.log('Create response:', res);
          toast.success('Successfully created new client!');
          setIsSubmitting(false);
          setModal(false);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('There was an issue! Please try again.');
        setIsSubmitting(false);
      }
    },
    [client /*,accountDetails*/]
  );

  const onError = (error: any) => {
    console.log('error====> sadasda', error);
  };

  return (
    !statusIsLoading &&
    !ClientTypesIsLoading && (
      <div>
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

              <FormField
                control={form.control}
                name="clientAccountNumbers"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="flex w-max items-center justify-center "
                      onClick={() => {
                        setAccoundModal(true);
                        setIsUpdate(false);
                      }}
                    >
                      Add Account details
                    </Button>
                    {accountDetails &&
                      accountDetails.map((x) => (
                        <div
                          key={x.accountNumber}
                          className="flex  items-center rounded-lg bg-primary p-2 text-white"
                        >
                          <div className="flex flex-grow gap-6">
                            <p className="flex flex-col">
                              {' '}
                              <span>Account number:</span>{' '}
                              <span className="">
                                {x.accountNumber}{' '}
                              </span>{' '}
                            </p>
                            <p className="flex flex-col">
                              {' '}
                              <span>Account country:</span>{' '}
                              <span className="">{x.country}</span>{' '}
                            </p>
                          </div>
                          <div
                            className="flex flex-none px-2"
                            onClick={() => {
                              setAccDetail(x);
                              setIsUpdate(true);
                              setAccoundModal(true);
                            }}
                          >
                            <Pencil size={20} strokeWidth={1.5} />
                          </div>
                        </div>
                      ))}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientBusinessIds"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="flex w-max items-center justify-center "
                      onClick={() => {
                        setBusinessModal(true);
                        setIsUpdate(false);
                      }}
                    >
                      Add Business details
                    </Button>
                    {businessDetails &&
                      businessDetails.map((x) => (
                        <div
                          key={x.businessId}
                          className="flex  items-center rounded-lg bg-primary p-2 text-white"
                        >
                          <div className="flex flex-grow gap-6">
                            <p className="flex flex-col">
                              {' '}
                              <span>Business number:</span>{' '}
                              <span className="">
                                {x.businessId}{' '}
                              </span>{' '}
                            </p>
                            <p className="flex flex-col">
                              {' '}
                              <span>Business country:</span>{' '}
                              <span className="">{x.country}</span>{' '}
                            </p>
                          </div>
                          <div
                            className="flex flex-none px-2"
                            onClick={() => {
                              setIsUpdate(true);
                              setBusinessModal(true);
                            }}
                          >
                            <Pencil size={20} strokeWidth={1.5} />
                          </div>
                        </div>
                      ))}
                  </FormItem>
                )}
              />

      

            

              <FormField
                control={form.control}
                name="clientContactInfos.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl className="relative">
                      <Input
                        placeholder="Email"
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
                name="clientContactInfos.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>

                    <FormControl className="relative">
                      <Input
                        placeholder="Phone"
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
                name="clientContactInfos.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>

                    <FormControl className="relative">
                      <Input
                        placeholder="Address"
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
              variant="default"
              loading={isSubmitting}
              className="w-max"
            >
              Submit
            </Button>
          </form>
        </Form>

        <Modal open={accountModal} onOpenChange={setAccoundModal}>
          <Modal.Content className="w-full max-w-xl">
            <CreateAccountDetails
              setAccoundModal={setAccoundModal}
              setAccountDetails={setAccountDetails}
              accountDetails={accountDetails}
              isUpdate={isUpdate}
              setAccountDetail={setAccDetail}
              accountDetail={accDetail}
            />
          </Modal.Content>
        </Modal>

        <Modal open={businessModal} onOpenChange={setBusinessModal}>
          <Modal.Content className="w-full max-w-xl">
            <CreateBusinessDetails
              setOpen={setBusinessModal}
              setDetails={setBusinessDetails}
              details={businessDetails}
              isUpdate={isUpdate}
              detail={bizDetail}
              setDetail={setBizDetail}
            />
          </Modal.Content>
        </Modal>
      </div>
    )
  );
};

export default ClientsForm;
