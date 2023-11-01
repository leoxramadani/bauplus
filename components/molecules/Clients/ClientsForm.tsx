import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup } from '@/components/ui/command';
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
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { TableBody } from '@tremor/react';
import axios from 'axios';
import { ChevronsUpDown, Pencil, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CreateAccountDetails from './CreateAccountDetails/CreateAccountDetails';
import CreateBusinessDetails from './CreateBusinessDetails/CreateBusinessDetails';
import CreateInfoDetails from './CreateInfoDetails/CreateInfoDetails';

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
          const res = await axios.put(
            UPDATE_SPECIFIC_CLIENTS,
            {
              ...data,
              clientAccountNumbers: accountDetails,
              clientBusinessIds: businessDetails,
              clientContactInfos: clientInfos,
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
          const res = await axios.post(
            CREATE_CLIENTS,
            {
              ...data,
              clientAccountNumbers: accountDetails,
              clientBusinessIds: businessDetails,
              clientContactInfos: clientInfos,
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

  const handleTrashClick = (indexToRemove: number) => {
    // Create a new array with the item removed
    const updatedAccountDetails = accountDetails.filter(
      (_, index) => index !== indexToRemove
    );

    // Update the state with the new array
    setAccountDetails(updatedAccountDetails);
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
                  <FormItem className="relative flex w-full flex-col">
                    <FormLabel>Account Details</FormLabel>
                    <Popover>
                      <div className="flex gap-2">
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'flex w-full items-center justify-between gap-1',
                                !field.value &&
                                  'text-muted-foreground'
                              )}
                              disabled={isSubmitting}
                            >
                              View Account Details
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <div
                          className="button-outline flex items-center justify-center px-3 py-2  text-sm"
                          onClick={() => {
                            setAccoundModal(true);
                            setIsUpdate(false);
                          }}
                        >
                          <Plus
                            size={20}
                            className="text-slate-500 hover:text-slate-600"
                          />
                        </div>
                      </div>
                      <PopoverContent
                        align="start"
                        className="  w-full p-0 md:w-[350px] lg:w-[500px] "
                      >
                        <Command>
                          <CommandGroup className="flex h-full max-h-[500px] flex-col gap-4 overflow-y-auto">
                            <Table className="w-full border">
                              <TableCaption>
                                A list of your account Details.
                              </TableCaption>
                              <TableHeader className=" ">
                                <TableRow>
                                  <TableHead>
                                    Account Number
                                  </TableHead>
                                  <TableHead>Country</TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {accountDetails?.map((acc, i) => (
                                  // <CommandItem
                                  //   value={
                                  //     acc.accountNumber +
                                  //     ' ' +
                                  //     acc.country
                                  //   }
                                  //   className="flex items-center"
                                  //   key={i}
                                  //   onSelect={() => {
                                  //     alert('test');
                                  //   }}
                                  // >
                                  //   {`${acc.accountNumber} ${acc.country}`}
                                  // </CommandItem>
                                  <TableRow key={i}>
                                    <TableCell>
                                      {acc.accountNumber}
                                    </TableCell>
                                    <TableCell>
                                      {acc.country}
                                    </TableCell>
                                    <TableCell className="flex flex-row items-center justify-center gap-3 ">
                                      <Pencil
                                        strokeWidth={1.5}
                                        className="h-full cursor-pointer rounded-lg  p-1 hover:bg-slate-200 "
                                        onClick={() => {
                                          setAccDetail(acc);
                                          setIsUpdate(true);
                                          setAccoundModal(true);
                                        }}
                                      />
                                      <Trash
                                        strokeWidth={1.5}
                                        className="h-full cursor-pointer rounded-lg p-1 hover:bg-slate-200 "
                                        onClick={() =>
                                          handleTrashClick(i)
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
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
                name="clientBusinessIds"
                render={({ field }) => (
                  <FormItem className="relative flex w-full flex-col">
                    <FormLabel>Business Details</FormLabel>
                    <Popover>
                      <div className="flex gap-2">
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'flex w-full items-center justify-between gap-1',
                                !field.value &&
                                  'text-muted-foreground'
                              )}
                              disabled={isSubmitting}
                            >
                              View Business Details
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <div
                          className="button-outline flex items-center justify-center px-3 py-2  text-sm"
                          onClick={() => {
                            setBusinessModal(true);
                            setIsUpdate(false);
                          }}
                        >
                          <Plus
                            size={20}
                            className="text-slate-500 hover:text-slate-600"
                          />
                        </div>
                      </div>
                      <PopoverContent
                        align="start"
                        className="  w-full p-0 md:w-[350px] lg:w-[500px] "
                      >
                        <Command>
                          <CommandGroup className="flex h-full max-h-[500px] flex-col gap-4 overflow-y-auto">
                            <Table className="w-full border">
                              <TableCaption>
                                A list of your business details.
                              </TableCaption>
                              <TableHeader className=" ">
                                <TableRow>
                                  <TableHead>
                                    Business Number
                                  </TableHead>
                                  <TableHead>Country</TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {businessDetails?.map((acc, i) => (
                                  // <CommandItem
                                  //   value={
                                  //     acc.accountNumber +
                                  //     ' ' +
                                  //     acc.country
                                  //   }
                                  //   className="flex items-center"
                                  //   key={i}
                                  //   onSelect={() => {
                                  //     alert('test');
                                  //   }}
                                  // >
                                  //   {`${acc.accountNumber} ${acc.country}`}
                                  // </CommandItem>
                                  <TableRow key={i}>
                                    <TableCell>
                                      {acc.businessId}
                                    </TableCell>
                                    <TableCell>
                                      {acc.country}
                                    </TableCell>
                                    <TableCell className="flex flex-row items-center justify-center gap-3 ">
                                      <Pencil
                                        strokeWidth={1.5}
                                        className="h-full cursor-pointer rounded-lg  p-1 hover:bg-slate-200 "
                                        onClick={() => {
                                          setBizDetail(acc);
                                          setIsUpdate(true);
                                          setBusinessModal(true);
                                        }}
                                      />
                                      <Trash
                                        strokeWidth={1.5}
                                        className="h-full cursor-pointer rounded-lg p-1 hover:bg-slate-200 "
                                        onClick={() =>
                                          handleTrashClick(i)
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
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
                name="clientContactInfos"
                render={({ field }) => (
                  <FormItem className="relative flex w-full flex-col">
                    <FormLabel>Contact Details</FormLabel>
                    <Popover>
                      <div className="flex gap-2">
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'flex w-full items-center justify-between gap-1',
                                !field.value &&
                                  'text-muted-foreground'
                              )}
                              disabled={isSubmitting}
                            >
                              View Contact Details
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <div
                          className="button-outline flex items-center justify-center px-3 py-2  text-sm"
                          onClick={() => {
                            setClientModal(true);
                            setIsUpdate(false);
                          }}
                        >
                          <Plus
                            size={20}
                            className="text-slate-500 hover:text-slate-600"
                          />
                        </div>
                      </div>
                      <PopoverContent
                        align="start"
                        className="  w-full p-0 md:w-[350px] lg:w-[500px] "
                      >
                        <Command>
                          <CommandGroup className="flex h-full max-h-[500px] flex-col gap-4 overflow-y-auto">
                            <Table className="w-full border">
                              <TableCaption>
                                A list of your business details.
                              </TableCaption>
                              <TableHeader className=" ">
                                <TableRow>
                                  <TableHead>Email</TableHead>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Address</TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {clientInfos?.map((acc, i) => (
                                  // <CommandItem
                                  //   value={
                                  //     acc.accountNumber +
                                  //     ' ' +
                                  //     acc.country
                                  //   }
                                  //   className="flex items-center"
                                  //   key={i}
                                  //   onSelect={() => {
                                  //     alert('test');
                                  //   }}
                                  // >
                                  //   {`${acc.accountNumber} ${acc.country}`}
                                  // </CommandItem>
                                  <TableRow key={i}>
                                    <TableCell>{acc.email}</TableCell>
                                    <TableCell>{acc.phone}</TableCell>
                                    <TableCell>
                                      {acc.address}
                                    </TableCell>
                                    <TableCell className="flex flex-row items-center justify-center gap-3 ">
                                      <Pencil
                                        strokeWidth={1.5}
                                        className="h-full cursor-pointer rounded-lg  p-1 hover:bg-slate-200 "
                                        onClick={() => {
                                          setClientInfo(acc);
                                          setIsUpdate(true);
                                          setClientModal(true);
                                        }}
                                      />
                                      <Trash
                                        strokeWidth={1.5}
                                        className="h-full cursor-pointer rounded-lg p-1 hover:bg-slate-200 "
                                        onClick={() =>
                                          handleTrashClick(i)
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

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
          <Modal.Content
            title="Add Account Details"
            description="Fill the fields to add account details"
            className="flex max-w-xl flex-col items-center justify-start sm:items-start"
          >
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

        <Modal open={clientModal} onOpenChange={setClientModal}>
          <Modal.Content className="w-full max-w-xl">
            <CreateInfoDetails
              setOpen={setClientModal}
              setDetails={setClientInfos}
              details={clientInfos}
              isUpdate={isUpdate}
              detail={clientInfo}
              setDetail={setClientInfo}
            />
          </Modal.Content>
        </Modal>
      </div>
    )
  );
};

export default ClientsForm;
