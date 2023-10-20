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
import {
  ISubCategory,
  subcategory,
} from '@/lib/schema/product/product';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { Check, ChevronsUpDown } from 'lucide-react';
import React, { SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface ICreateSubCategory {
  setCloseModal: React.Dispatch<SetStateAction<boolean>>;
}

const CreateSubCategory = ({ setCloseModal }: ICreateSubCategory) => {
  const form = useForm<ISubCategory>({
    resolver: zodResolver(subcategory),
  });

  function onSubmit(data: ISubCategory) {
    console.log(data);
  }

  const categories = [
    { label: 'Product', value: '123' },
    { label: 'Money', value: '1234' },
    { label: 'Gold', value: '12345' },
    { label: 'Clothes', value: '123456' },
    { label: 'Test', value: '1111' },
  ] as const;

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  items-center justify-center  gap-4 ">
            <FormField
              control={form.control}
              name="subCategoryName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Subcategory Name{' '}
                    {/* <span className="text-red-500">*</span> */}
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      placeholder="Subcategory Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentCategory"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Unit Type</FormLabel>
                  <Popover>
                    <PopoverTrigger>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          type="button"
                          className={cn(
                            'flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) =>
                                  category.value === field.value
                              )?.label
                            : 'Choose parent category'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput placeholder="Search unit type..." />
                        <CommandEmpty>
                          No parent category found.
                        </CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.label}
                              key={category.value}
                              onSelect={() => {
                                form.setValue(
                                  'parentCategory',
                                  category.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4 transition-all',
                                  category.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {category.label}
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

          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outline"
              type="button"
              className="w-max"
              onClick={() => setCloseModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-max">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSubCategory;
