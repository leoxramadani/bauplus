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
import { CREATE_PRODUCT_CATEGORY } from '@/lib/constants/endpoints/products/productCategories';
import {
  ICategories,
  categorySchema,
} from '@/lib/schema/product/productCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { SetStateAction, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ICreateCategory {
  setCategoryModal: React.Dispatch<SetStateAction<boolean>>;
  refetchProductCategories:any
}

const CreateCategory = ({ setCategoryModal,refetchProductCategories }: ICreateCategory) => {
  const form = useForm<ICategories>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = useCallback(
    async (data: ICategories) => {
      await axios.post(CREATE_PRODUCT_CATEGORY,{...data})
      .then((res)=>{
        console.log("Succesfuly created a new category!");
        refetchProductCategories();
      }).catch((error)=>{
        console.log("Error creating a new category!",error);
      })

      setCategoryModal(false);
    },
    []
  );

  const onError =(error:any)=>{
    console.log("EEERRROOR->",error);
  }

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit,onError)}
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
              onClick={() => setCategoryModal(false)}
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
