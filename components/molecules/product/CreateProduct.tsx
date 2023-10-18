import React, { useCallback, SetStateAction, useState } from 'react';
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
import {
  FileRejection,
  useDropzone,
} from 'react-dropzone';
import Drop from '@/components/atoms/Drop';
import {
  IInvoice,
  invoiceSchema,
} from '@/lib/schema/Finance/invoice';
import {  IProduct, product } from '@/lib/schema/product/product';

interface ICreateProduct {
    setCloseModal: React.Dispatch<SetStateAction<boolean>>
}



const CreateProduct = ({setCloseModal} : ICreateProduct) => {
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



  const companies = [
    { label: 'Thor', value: "123" },
    { label: 'Thor Website', value: "1234" },
    { label: 'Arkiva', value: "12345" },
    { label: 'ProWork', value: "123456" },
    { label: 'Miniera', value: "1111" },
  ] as const;

  const invoice = [
    { label: 'INV#001', value: '001' },
    { label: 'INV#002', value: '002' },
    { label: 'INV#003', value: '003' },
    { label: 'INV#004', value: '004' },
    { label: 'INV#005', value: '005' },
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


  const form = useForm<IProduct>({
    resolver: zodResolver(product),
  });

  function onSubmit(data: IProduct) {
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
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name{' '}
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl className="relative">
                      <Input
                        placeholder="Product Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

        <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price{' '}
                    </FormLabel>
                    <FormControl className="relative">
                      <Input
                      type='number'
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel>Product Category</FormLabel>
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
                              : 'Choose Category'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[250px] p-0">
                        <Command>
                          <CommandInput placeholder="Search for product category..." />
                          <CommandEmpty>
                            No procut category found.
                          </CommandEmpty>
                          <CommandGroup>
                            {companies.map((company) => (
                              <CommandItem
                                value={company.label}
                                key={company.value}
                                onSelect={() => {
                                  form.setValue(
                                    'productCategory',
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
                name="productSubCategory"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel>Product Sub Category</FormLabel>
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
                              : 'Choose Subcategory'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[250px] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>
                            No product sub category found.
                          </CommandEmpty>
                          <CommandGroup>
                            {companies.map((company) => (
                              <CommandItem
                                value={company.label}
                                key={company.value}
                                onSelect={() => {
                                  form.setValue(
                                    'productSubCategory',
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
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tax{' '}
                    </FormLabel>
                    <FormControl className="relative">
                      <Input
                      type='number'
                        placeholder="Tax"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
                control={form.control}
                name="hsnSac"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Hsn/Sac{' '}
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl className="relative">
                      <Input
                        placeholder="Hsn/Sac"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
                control={form.control}
                name="unitType"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel>Unit Type</FormLabel>
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
                              : 'Choose unit type'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[250px] p-0">
                        <Command>
                          <CommandInput placeholder="Search unit type..." />
                          <CommandEmpty>
                            No unit type found.
                          </CommandEmpty>
                          <CommandGroup>
                            {companies.map((company) => (
                              <CommandItem
                                value={company.label}
                                key={company.value}
                                onSelect={() => {
                                  form.setValue(
                                    'unitType',
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

            </div>

        

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full sm:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl className="relative">
                    <Textarea
                      placeholder="Product description..."
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
}

export default CreateProduct