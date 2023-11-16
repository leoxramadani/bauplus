import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { INVOICE_REGISTER } from '@/lib/constants/endpoints/finance/invoice';
import {
  IgeneratedInvoice,
  generatedInvoice,
} from '@/lib/schema/Finance/invoice/generateInvoice';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import format from 'date-fns/format';
import { CalendarIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IGenerateProps {
  data?: IgeneratedInvoice;
  setGenerateModalOpen: any;
  setIsRegisterModalOpen: Dispatch<SetStateAction<boolean>>;
  refetchInvoices: any;
}
interface registerModel {
  invoiceId?: string;
  clientId: string;
  companyId?: string;
  invoiceDate: Date;
  dueDate: Date;
  totalAmount: number;
  paidAmount: number;
  invoiceStatusId: string;
  paymentMethodId?: string;
  transactionId?: string;
  invoiceTypeId: string;
  // receiveDate?: string
}

const GeneratedForm = ({
  data,
  setGenerateModalOpen,
  refetchInvoices,
  setIsRegisterModalOpen,
}: IGenerateProps) => {
  const form = useForm<IgeneratedInvoice>({
    resolver: zodResolver(generatedInvoice),
    values: data || undefined,
  });

  const onSubmit = useCallback(
    async (formData: IgeneratedInvoice) => {
      var entity: registerModel = {
        clientId: `f231d0e8-0ae8-49dd-bdc2-c10db7d70259`,
        invoiceDate: formData.date,
        dueDate: formData.payment_due_date,
        totalAmount: parseFloat(`${formData.total_amount}`),
        paidAmount: parseFloat(`0`),
        invoiceStatusId: formData.invoiceStatusId!,
        invoiceTypeId: formData.invoiceTypeId!,
      };

      await axios
        .post(INVOICE_REGISTER, entity)
        .then((res) => {
          console.log(
            'Successfully created generated invoice=>',
            res.data
          );
          toast.success('Successfully created invoice');
          refetchInvoices();
          setIsRegisterModalOpen(false);
        })
        .catch((error) => {
          console.log(
            'Error while creating generated invoice=>',
            error
          );
          toast.error('Something went wrong creating the invoice');
        })
        .finally(() => {
          setGenerateModalOpen(false);
        });
    },
    []
  );

  const onError = (error: any) => {
    console.log('Error Invoice ::', error);
  };

  return (
    <div className="z-0 flex w-full flex-col gap-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2">
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
                  <FormLabel>Invoice Type </FormLabel>
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

            {/* date */}
            <FormField
              control={form.control}
              name="date"
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

            {/* invoice number */}
            <FormField
              control={form.control}
              name="invoice_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice Number
                    {/* <span className="text-red-500">*</span> */}
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Invoice Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total VAT */}
            <FormField
              control={form.control}
              name="total_vat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total VAT</FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Total VAT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total amount */}
            <FormField
              control={form.control}
              name="total_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Total Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* payment due date */}
            <FormField
              control={form.control}
              name="payment_due_date"
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
                            <span>Pick Due date</span>
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
                        disabled={(date) =>
                          date < new Date(form.watch('date'))
                        }
                        
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <hr /> */}
          {/* <h4>Other data genereated from the invoice:</h4> */}
          {/* <div className="flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2">
            {data.bank_accounts && (
              <div className="flex flex-col text-sm text-slate-500">
                <p className="flex">Bank account:</p>
                <p className="text-slate-600">{data.bank_accounts}</p>
              </div>
            )}
            {data.description_of_itemservice && (
              <div className="flex flex-col text-sm text-slate-500">
                <p className="flex">Description of item service:</p>
                <p className="text-slate-600">
                  {data.description_of_itemservice}
                </p>
              </div>
            )}
            {data.in_words && (
              <div className="flex flex-col text-sm text-slate-500">
                <p className="flex">In words:</p>
                <p className="text-slate-600">{data.in_words}</p>
              </div>
            )}
            {data.organization_unit && (
              <div className="flex flex-col text-sm text-slate-500">
                <p className="flex">Organization unit:</p>
                <p className="text-slate-600">
                  {data.organization_unit}
                </p>
              </div>
            )}
            {data.location_address && (
              <div className="flex flex-col text-sm text-slate-500">
                <p className="flex">Location address:</p>
                <p className="text-slate-600">
                  {data.location_address}
                </p>
              </div>
            )}
            {data.contact_person && (
              <div className="flex flex-col text-sm text-slate-500">
                <p className="flex">Contact Person:</p>
                <p className="text-slate-600">
                  {data.contact_person}
                </p>
              </div>
            )}
            {data.address && (
              <div className="flex flex-col text-sm text-slate-500">
                <p className="flex">Address:</p>
                <p className="text-slate-600">{data.address}</p>
              </div>
            )}
          </div> */}
          <Button className="w-max" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneratedForm;

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
