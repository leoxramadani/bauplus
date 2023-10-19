import React, { useCallback, useMemo, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  IPayment,
  paymentSchema,
} from '@/lib/schema/Finance/payment';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Check, ChevronsUpDown, X } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileRejection, useDropzone } from 'react-dropzone';
import Drop from '@/components/atoms/Drop';
import {
  IInvoice,
  invoiceSchema,
} from '@/lib/schema/Finance/invoice';

interface ICreateInvoice {
  setCloseModal(open: boolean): void;
}

const CreateInvoice = ({ setCloseModal }: ICreateInvoice) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        // Take only the first accepted file
        const file = acceptedFiles[0];
        setSelectedFile(file);
      }

      // Handle rejected files if needed
      if (fileRejections.length > 0) {
        console.log('Rejected files:', fileRejections);
      }
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'image/*': [], 'application/pdf': [] },
    multiple: false,
    onDrop, // Allow only one file
  });

  const companies = [
    { label: 'Thor', value: 123 },
    { label: 'Thor Website', value: 1234 },
    { label: 'Arkiva', value: 12345 },
    { label: 'ProWork', value: 123456 },
    { label: 'Miniera', value: 1111 },
  ] as const;

  const invoice = [
    { label: 'INV#001', value: '001' },
    { label: 'INV#002', value: '002' },
    { label: 'INV#003', value: '003' },
    { label: 'INV#004', value: '004' },
    { label: 'INV#005', value: '005' },
  ] as const;

  const members = [
    { label: 'Besir Kurtishi ', value: '001' },
    { label: 'Besir Bossi ', value: '002' },
    { label: 'Besir ronaldo Acc3', value: '003' },
    { label: 'Besir Messi Acc4', value: '004' },
    { label: 'Besir leo Acc5', value: '005' },
  ] as const;

  const taxValue = [
    { label: '18%', value: '18' },
    { label: '15%', value: '15' },
    { label: '10%', value: '10' },
  ] as const;

  const bankAccs = [
    { label: 'Besir Kurtishi ', value: '001' },
    { label: 'Besir Bossi ', value: '002' },
    { label: 'Besir ronaldo Acc3', value: '003' },
    { label: 'Besir Messi Acc4', value: '004' },
    { label: 'Besir leo Acc5', value: '005' },
  ] as const;

  const currency = [
    { label: 'Ден.', value: 'mkd' },
    { label: '$USD', value: 'usd' },
    { label: 'Eur', value: 'eur' },
  ] as const;

  const status = [
    { label: 'Paid', value: 'paid' },
    { label: 'Unpaid', value: 'unpaid' },
    { label: 'Semi-paid', value: 'semipaid' },
  ] as const;

  const duration = [
    { label: 'Full day', value: 'full' },
    { label: 'Multiple', value: 'multiple' },
    { label: 'First Half', value: 'fh' },
    { label: 'Second Half', value: 'sh' },
  ];

  const form = useForm<IInvoice>({
    resolver: zodResolver(invoiceSchema),
  });

  function onSubmit(data: IInvoice) {
    console.log(data);
  }

  return (
    <div className="z-0 flex flex-col gap-4 w-full  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  sm:grid sm:grid-cols-2  justify-center items-center gap-4">
            {/* project */}
            <div className="flex flex-col gap-4 sm:grid grid-cols-3 col-span-2 w-full ">
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
                      <Input
                        placeholder="Invoice number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoiceFor"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel>Invoice For</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full flex items-center gap-1 justify-between',
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
                          <CommandEmpty>
                            No member found.
                          </CommandEmpty>
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

              <FormField
                control={form.control}
                name="dateInTheDocument"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full flex justify-between items-center text-left font-normal',
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
            </div>

            <div className="flex flex-col gap-4 sm:grid grid-cols-3 col-span-2 w-full ">
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
                          <SelectItem
                            value={tax.value}
                            key={tax.value}
                          >
                            {tax.label}
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
                name="sumWithoutTax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sum without tax </FormLabel>
                    <FormControl className="relative">
                      <Input
                        placeholder="Sum without tax"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 sm:grid grid-cols-3 col-span-2 w-full ">
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
                              'w-full flex justify-between items-center text-left font-normal',
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
                            date < form.getValues('dateInTheDocument')
                          }
                          //   initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
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
            </div>

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

            <div className="flex flex-col col-span-2 w-full gap-2">
              <FormLabel>File</FormLabel>
              <Drop
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div>
          </div>

          <Button className="w-max" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateInvoice;
