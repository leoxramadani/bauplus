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
import { ICategory, category } from '@/lib/schema/product/product';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ICreateCategory {
  setCloseModal: React.Dispatch<SetStateAction<boolean>>;
}

const CreateCategory = ({ setCloseModal }: ICreateCategory) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ICategory>({
    resolver: zodResolver(category),
  });

  function onSubmit2(data: ICategory) {
    console.log(data);
  }

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit2)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  items-center justify-center  gap-4 ">
            {/* project */}

            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Category Name{' '}
                    {/* <span className="text-red-500">*</span> */}
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
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

export default CreateCategory;
