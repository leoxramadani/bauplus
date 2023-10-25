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
import { Textarea } from '@/components/ui/textarea';
import {
  CREATE_INVOICE,
  GET_SPECIFIC_INVOICE,
  UPDATE_INVOICE,
} from '@/lib/constants/endpoints/finance/invoice';
import {
  IInvoice,
  invoiceSchema,
} from '@/lib/schema/Finance/invoice';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
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
          .post(CREATE_INVOICE, { ...data })
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
          <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
            {/* Invoice type */}
            <FormField
              control={form.control}
              name="invoiceType"
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
            {/* Invoice number */}
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice number{' '}
                    {/* <span className="text-red-500">*</span> */}
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Invoice number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Invoice For */}
            <FormField
              control={form.control}
              name="invoiceFor"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Invoice For</FormLabel>
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
                        >
                          {field.value
                            ? companies.find(
                                (company) =>
                                  company.value === field.value
                              )?.label
                            : 'Choose member'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No member found.</CommandEmpty>
                        <CommandGroup>
                          {companies.map((company) => (
                            <CommandItem
                              value={company.label}
                              key={company.value}
                              onSelect={() => {
                                form.setValue(
                                  'invoiceFor',
                                  company.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  company.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {company.label}
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

            {/* Date */}
            <FormField
              control={form.control}
              name="dateInDocument"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date</FormLabel>
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
                            <span>Pick date on document</span>
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

            {/* Sum with TAX */}
            <FormField
              control={form.control}
              name="sumWithTax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sum with Tax </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Sum with tax" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tax value */}
            <FormField
              control={form.control}
              name="taxValue"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tax Value</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax value" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {taxValue.map((tax) => (
                        <SelectItem value={tax.value} key={tax.value}>
                          {tax.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sum without tax */}
            <FormField
              control={form.control}
              name="sumWithoutTax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sum without tax </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Sum without tax" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due date */}
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
                            <span>Pick due date </span>
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
                          date < form.getValues('dateInDocument')
                        }
                        //   initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="invoiceStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
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
                      {status.map((status) => (
                        <SelectItem
                          value={status.value}
                          key={status.value}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dossier */}
            <FormField
              control={form.control}
              name="dossier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dossier</FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Dossier" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full sm:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl className="relative">
                    <Textarea
                      placeholder="Invoice description..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="col-span-2 flex w-full flex-col gap-2">
              <FormLabel>File</FormLabel>
              <Drop
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div> */}
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

const companies = [
  { label: 'Thor', value: 123 },
  { label: 'Thor Website', value: 1234 },
  { label: 'Arkiva', value: 12345 },
  { label: 'ProWork', value: 123456 },
  { label: 'Miniera', value: 1111 },
] as const;

const taxValue = [
  { label: '18%', value: '18' },
  { label: '15%', value: '15' },
  { label: '10%', value: '10' },
] as const;

const status = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Semi-paid', value: 'semipaid' },
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
