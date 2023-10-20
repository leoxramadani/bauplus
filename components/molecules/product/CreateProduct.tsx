import Drop from '@/components/atoms/Drop';
import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { IProduct, product } from '@/lib/schema/product/product';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateCategory from './category/CreateCategory';
import CreateSubCategory from './subcategory/CreateSubCategory';

interface ICreateProduct {
  setCloseModal: React.Dispatch<SetStateAction<boolean>>;
}

const CreateProduct = ({ setCloseModal }: ICreateProduct) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [subCategoryModal, setSubCategoryModal] =
    useState<boolean>(false);

  const companies = [
    { label: 'Thor', value: '123' },
    { label: 'Thor Website', value: '1234' },
    { label: 'Arkiva', value: '12345' },
    { label: 'ProWork', value: '123456' },
    { label: 'Miniera', value: '1111' },
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
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
            {/* project */}
            <div className="col-span-2 flex w-full grid-cols-3 flex-col gap-4 sm:grid ">
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
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Product Category</FormLabel>
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
                              : 'Choose Category'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[250px] p-0">
                        <Command>
                          <CommandInput placeholder="Search for product category..." />
                          <CommandEmpty>
                            No product category found.
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

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="flex w-max items-center justify-center "
                      onClick={() => setCategoryModal(true)}
                    >
                      Add Category
                    </Button>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productSubCategory"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Product Sub Category</FormLabel>

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
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex w-max items-center justify-center "
                      onClick={() => setSubCategoryModal(true)}
                    >
                      Add Subcategory
                    </Button>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price </FormLabel>
                    <FormControl className="relative">
                      <Input
                        type="number"
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
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax </FormLabel>
                    <FormControl className="relative">
                      <Input
                        type="number"
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
                      <Input placeholder="Hsn/Sac" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitType"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Unit Type</FormLabel>
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

            <div className="col-span-2 flex w-full flex-col gap-2">
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

      <Modal open={categoryModal} onOpenChange={setCategoryModal}>
        <Modal.Content className="w-full max-w-xl">
          <CreateCategory setCloseModal={setCategoryModal} />
        </Modal.Content>
      </Modal>

      <Modal
        open={subCategoryModal}
        onOpenChange={setSubCategoryModal}
      >
        <Modal.Content className="w-full max-w-xl">
          <CreateSubCategory setCloseModal={setSubCategoryModal} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default CreateProduct;
