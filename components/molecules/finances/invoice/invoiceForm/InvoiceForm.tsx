import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { GET_ALL_CLIENTS } from '@/lib/constants/endpoints/clients';
import {
  GET_ALL_INVOICES_IN_OUT_TYPES,
  GET_ALL_INVOICE_TYPES,
  GET_SPECIFIC_INVOICE,
  INVOICE_CREATE,
  UPDATE_INVOICE,
} from '@/lib/constants/endpoints/finance/invoice';
import useData from '@/lib/hooks/useData';
import { IClients } from '@/lib/schema/Clients/clients';
import {
  IInvoice,
  invoiceSchema,
} from '@/lib/schema/Finance/invoice/invoice';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import format from 'date-fns/format';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { Key, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IInvoiceForm {
  setIsModalOpen(open: boolean): void;
  invoiceId?: string;
  refetchInvoices: any;
}

const InvoiceForm = ({
  setIsModalOpen,
  invoiceId,
  refetchInvoices,
}: IInvoiceForm) => {
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState<any>();
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());
  const {
    data: clients,
    isError: clientsIsError,
    isLoading: clientsIsLoading,
  } = useData<IClients[]>(['clients'], GET_ALL_CLIENTS);
  useEffect(() => {
    async function getData(Id: string) {
      console.log('inside getData');
      await axios
        .get(GET_SPECIFIC_INVOICE + `?invoiceId=${Id}`)
        .then((res) => {
          console.log('setting invoice data -->', res.data);
          setInvoiceData(res.data);
        })
        .catch((error) => {
          console.log('error invoice employees->', error);
        });
    }

    if (invoiceId) {
      getData(invoiceId);
    }
  }, [invoiceId]);

  const form = useForm<IInvoice>({
    resolver: zodResolver(invoiceSchema),
    values: { ...invoiceData },
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: IInvoice) => {
      setIsLoading(true);
      console.log('form data->', data);

      if (invoiceData) {
        console.log('Updating invoice');
        await axios
          .put(UPDATE_INVOICE, {
            ...data,
          })
          .then((res) => {
            console.log('UPDATED invoice->', res);
            router.replace('/finance/invoice', undefined, {
              shallow: true,
            });
            setIsModalOpen(false);
            toast.success('Successfully updated invoice');
            refetchInvoices();
          })
          .catch((error) => {
            console.log('Error UPDATING invoice:', error);
            toast.error(
              'There was an issue updating invoice! Please try again.'
            );
          });
      } else {
        console.log('Creating invoice');
        await axios
          .post(INVOICE_CREATE, {
            // clientId: data.clientId,
            // totalAmount: data.totalAmount,
            // paidAmount: data.paidAmount,
            ...data,
          })
          .then((res) => {
            console.log('Successfully created invoice->', res);
            toast.success('Successfully added invoice');
            setIsModalOpen(false);
            refetchInvoices();
          })
          .catch((error) => {
            console.error('Error creating invoice:', error);
            toast.error(
              'There was an issue adding invoice! Please try again.'
            );
          });
      }
      setIsLoading(false);
    },
    [invoiceData]
  );

  useEffect(() => {
    const selectedClient = clients?.find(
      (client) => client.clientId === form.watch('clientId')
    );

    setCompanyName(String(selectedClient?.companyName));
    setInvoiceDate(form.getValues().invoiceDate);
    setTotalAmount(String(form.getValues().totalAmount));
    setInvoiceNumber(Number(form.getValues().invoiceNumber));

    // Calculate the due date as 15 days after the invoice date
    const invoiceDate = form.getValues().invoiceDate;
    const dueDate = new Date(invoiceDate);

    if (
      invoiceDate instanceof Date &&
      !isNaN(invoiceDate.getTime())
    ) {
      if (form.getValues().dueDate == undefined) {
        dueDate.setDate(invoiceDate?.getDate() + 15);
        setDueDate(dueDate);
      } else {
        setDueDate(form.getValues().dueDate);
      }
    }
  }, [
    form.watch('clientId'),
    form.watch('invoiceDate'),
    form.watch('totalAmount'),
    form.watch('dueDate'),
    form.watch('invoiceNumber'),
  ]);

  const onError = (error: any) => {
    console.log('Error Invoice ::', error);
  };

  const isDataComplete =
    form.getValues().clientId &&
    form.getValues().totalAmount &&
    form.getValues().invoiceDate &&
    form.getValues().invoiceNumber;

  const [invoiceTypes, setInvoiceTypes] = useState<any[]>([]);
  const [invoiceNostro, setInvoiceNostro] = useState<any[]>([]);
  useEffect(() => {
    const getInvoiceTypes = () => {
      axios
        .get(GET_ALL_INVOICE_TYPES)
        .then((res) => {
          setInvoiceTypes(res.data);
        })
        .catch((error) => {
          console.log(
            'error while fetching the invoice types=',
            error
          );
        });
    };
    getInvoiceTypes();
  }, [invoiceTypes]);

  useEffect(() => {
    const getInvoiceNostro = () => {
      axios
        .get(GET_ALL_INVOICES_IN_OUT_TYPES)
        .then((res) => {
          setInvoiceNostro(res.data);
        })
        .catch((error) => {
          console.log(
            'error while fetching the invoice types=',
            error
          );
        });
    };
    getInvoiceNostro();
  }, [invoiceNostro]);

  return (
    <div className="z-0 flex w-full flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2">
            {/* Invoice Number */}
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice Number
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Invoice Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Invoice Status */}
            <FormField
              control={form.control}
              name="invoiceStatusId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Invoice Status </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select invoice status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {invoiceStatus.map((invoice) => (
                        <SelectItem
                          value={invoice.value}
                          key={invoice.value}
                        >
                          {invoice.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Invoice type */}
            <FormField
              control={form.control}
              name="invoiceTypeId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Invoice Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select invoice type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {invoiceTypes &&
                        invoiceTypes.map((invoice) => (
                          <SelectItem
                            value={invoice.invoiceTypeId}
                            key={invoice.invoiceTypeId}
                          >
                            {invoice.invoiceTypeName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceInOutTypeId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Invoice Nostro / Loro</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select invoice type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {invoiceNostro &&
                        invoiceNostro.map((invoice) => (
                          <SelectItem
                            value={invoice.invoiceInOutTypeId}
                            key={invoice.invoiceInOutTypeId}
                          >
                            {invoice.invoiceInOutTypeName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client */}
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Client</FormLabel>
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
                            ? clients?.find(
                                (client) =>
                                  client.clientId === field.value
                              )?.firstName +
                              ' ' +
                              clients?.find(
                                (client) =>
                                  client.clientId === field.value
                              )?.lastName
                            : 'Choose client'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search client..." />
                        <CommandEmpty>No clients found.</CommandEmpty>
                        <CommandGroup className="flex h-full max-h-[200px] flex-col gap-4 overflow-y-auto">
                          {clients?.map((client, i: Key) => (
                            <CommandItem
                              value={
                                client.firstName +
                                ' ' +
                                client.lastName
                              }
                              className="flex items-center"
                              key={i}
                              onSelect={() => {
                                client.clientId &&
                                  form.setValue(
                                    'clientId',
                                    client?.clientId
                                  );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  client.clientId === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {`${client.firstName} ${client.lastName}`}
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

            {/* Total Amount */}
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total amount</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter Total amount"
                      className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Paid Amount */}
            <FormField
              control={form.control}
              name="paidAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid amount</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Enter Paid amount"
                      className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Invoice Date */}
            <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invoice Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'group flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isLoading}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 group-disabled:cursor-not-allowed" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date('1900-01-01')
                        }
                        // captionLayout="dropdown-buttons"
                        // fromYear={2000}
                        // toYear={new Date().getFullYear()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'group flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isLoading}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 group-disabled:cursor-not-allowed" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(form.watch('invoiceDate'))
                        }
                        // captionLayout="dropdown-buttons"
                        // fromYear={2000}
                        // toYear={new Date().getFullYear()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Payment Method */}
            <FormField
              control={form.control}
              name="paymentMethodId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Payment method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethods.map((invoice) => (
                        <SelectItem
                          value={invoice.value}
                          key={invoice.value}
                        >
                          {invoice.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button
              className="w-max"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Submit
            </Button>

            {/* {isDataComplete && (
              <PDFRenderer
                invoiceNumber={invoiceNumber}
                companyName={companyName}
                totalAmount={String(totalAmount)}
                invoiceDate={invoiceDate}
                dueDate={dueDate}
                content="Generate as PDF"
              />
            )} */}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InvoiceForm;

const invoiceStatus = [
  { label: 'Pending', value: 'cea6308a-d138-4977-8814-929bfb4b6ad8' },
  {
    label: 'Cancelled',
    value: '039e9103-4136-4961-afe2-496a0e58ec43',
  },
  { label: 'Paid', value: '809bcb94-3496-4a80-9566-900ce5f6e481' },
  {
    label: 'Partially Paid',
    value: '482ec8b8-b321-4c06-905c-9cc89ba689a3',
  },
  { label: 'Overdue', value: '427e80ba-1e1c-45ce-8791-c59fa300559d' },
] as const;

// const invoiceTypes = [
//   {
//     label: 'Payable / Expense',
//     value: '196e2549-f1bb-4159-97dc-139e2285fa13',
//   },
//   {
//     label: 'Receivable / Income',
//     value: 'ffb56872-a6ac-4d0a-b480-7dcf8c8538ea',
//   },
// ] as const;

const paymentMethods = [
  {
    label: 'Cash',
    value: '06a85d6b-ed0f-48c7-aa67-72f18b3e6c77',
  },
  {
    label: 'Bank Transfer',
    value: 'f97247c7-95ec-4e17-839d-ad405ff29188',
  },
  {
    label: 'Credit Card',
    value: 'a0d7051c-21a9-43b7-964d-c16ba72437a8',
  },
  {
    label: 'PayPal',
    value: '2c259366-e579-41bd-8c20-d96da50d4ab2',
  },
] as const;
