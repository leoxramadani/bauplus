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
  GET_SPECIFIC_INVOICE,
  INVOICE_CREATE,
  INVOICE_REGISTER,
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
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { Key, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ICreateInvoice {
  setIsModalOpen(open: boolean): void;
  invoiceNumber?: string;
}

const InvoiceForm = ({
  setIsModalOpen,
  invoiceNumber,
}: ICreateInvoice) => {
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState<any>();
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    data: clients,
    isError: clientsIsError,
    isLoading: clientsIsLoading,
  } = useData<IClients[]>(['clients'], GET_ALL_CLIENTS);

  useEffect(() => {
    async function getData(Id: string) {
      console.log('inside getData');
      await axios
        .get(GET_SPECIFIC_INVOICE + `?id=${Id}`)
        .then((res) => {
          console.log('setting employee data -->', res);
          setInvoiceData(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    if (invoiceNumber) {
      getData(invoiceNumber);
    }
  }, [invoiceNumber]);

  const form = useForm<IInvoice>({
    resolver: zodResolver(invoiceSchema),
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
            ...data
          })
          .then((res) => {
            console.log('Successfully created invoice->', res);
            toast.success('Successfully added invoice');
            setIsModalOpen(false);
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

  const onError = (error: any) => {
    console.log('Error Invoice ::', error);
  };

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2">
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
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select invoice type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {invoiceTypes.map((invoice) => (
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
                <FormItem className="w-full">
                  <FormLabel>Invoice Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'flex w-full items-center justify-between text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick Invoice date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                        disabled={(date) => date > new Date()}
                        //   initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Invoice Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'flex w-full items-center justify-between text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick Invoice date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                        disabled={(date) => date > new Date()}
                        //   initialFocus
                      />
                    </PopoverContent>
                  </Popover>

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
                  <FormLabel>Invoice Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
          </div>

          <Button className="w-max" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InvoiceForm;

const invoiceStatus = [
  {
    label: 'Cancelled',
    value: '039e9103-4136-4961-afe2-496a0e58ec43',
  },
  { label: 'Paid', value: '809bcb94-3496-4a80-9566-900ce5f6e481' },
  { label: 'Pending', value: 'cea6308a-d138-4977-8814-929bfb4b6ad8' },
  {
    label: 'Partially Paid',
    value: '482ec8b8-b321-4c06-905c-9cc89ba689a3',
  },
  { label: 'Overdue', value: '427e80ba-1e1c-45ce-8791-c59fa300559d' },
] as const;

const invoiceTypes = [
  {
    label: 'Payable / Expense',
    value: '196e2549-f1bb-4159-97dc-139e2285fa13',
  },
  {
    label: 'Receivable / Income',
    value: 'ffb56872-a6ac-4d0a-b480-7dcf8c8538ea',
  },
] as const;

const paymentMethods=[
{
  label:'Cash',
  value:'06a85d6b-ed0f-48c7-aa67-72f18b3e6c77',
},
{
  label:'Bank Transfer',
  value:'f97247c7-95ec-4e17-839d-ad405ff29188',
},
{
  label:'Credit Card',
  value:'a0d7051c-21a9-43b7-964d-c16ba72437a8',
},
{
  label:'PayPal',
  value:'2c259366-e579-41bd-8c20-d96da50d4ab2',
},
]as const;
