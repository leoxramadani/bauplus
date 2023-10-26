import Modal from '@/components/atoms/Modal';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GET_ALL_PRODUCT_CATEGORIES } from '@/lib/constants/endpoints/products/productCategories';
import {
  CREATE_PRODUCT,
  GET_SPECIFIC_PRODUCT,
  UPDATE_PRODUCT,
} from '@/lib/constants/endpoints/products/products';
import useData from '@/lib/hooks/useData';
import {
  IProduct,
  productSchema,
} from '@/lib/schema/product/product';
import { ICategories } from '@/lib/schema/product/productCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import CreateCategory from './category/CreateCategory';

interface IProductForm {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  productId?: string;
}

const ProductForm = ({ setIsModalOpen, productId }: IProductForm) => {
  const router = useRouter();
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>();
  const {
    data: productCategories,
    isLoading,
    isError,
  } = useData<ICategories[]>(
    ['parentDepartments'],
    GET_ALL_PRODUCT_CATEGORIES
  );

  useEffect(() => {
    async function getData(Id: string) {
      console.log('inside getData');
      await axios
        .get(GET_SPECIFIC_PRODUCT + `?productId=${Id}`)
        .then((res) => {
          console.log('setting product data -->', res);
          setProductData(res.data);
        })
        .catch((error) => {
          console.log('error fetching product->', error);
        });
    }

    if (productId) {
      getData(productId);
    }

    console.log('productId--------->', productId);
  }, [productId]);

  const form = useForm<IProduct>({
    resolver: zodResolver(productSchema),
    values: { ...productData },
  });

  const onSubmit = useCallback(
    async (data: IProduct) => {
      console.log('form data ->', data);

      if (productData) {
        console.log('Updating product');
        await axios
          .put(UPDATE_PRODUCT, {
            ...data,
          })
          .then((res) => {
            console.log('update product->', res);
            router.replace('/products', undefined, {
              shallow: true,
            });
          })
          .catch((error) => {
            console.log('Error UPDATING product:', error);
          });
      } else {
        console.log('Creating product');
        await axios
          .post(CREATE_PRODUCT, {
            ...data,
          })
          .then((res) => {
            console.log('Successfully created product->', res);
          })
          .catch((error) => {
            console.log('Error creating product:', error);
          });
      }
      setIsModalOpen(false);
    },
    [productData]
  );

  const onError = (error: any) => {
    console.log('Error input->', error);
  };

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
            {/* Product name */}
            <div className="col-span-2 flex w-full grid-cols-1 flex-col gap-4  sm:grid ">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Name{' '}
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl className="relative">
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Product category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Enter category" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {productCategories ? (
                          <>
                            {productCategories.map(
                              (category: any) => (
                                <SelectItem
                                  key={category.categoryId}
                                  value={category.categoryId}
                                >
                                  {category.categoryName}
                                </SelectItem>
                              )
                            )}
                          </>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
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
            </div>

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

      <Modal open={categoryModal} onOpenChange={setCategoryModal}>
        <Modal.Content className="w-full max-w-xl">
          <CreateCategory setCloseModal={setCategoryModal} />
        </Modal.Content>
      </Modal>

      {/* <Modal
        open={subCategoryModal}
        onOpenChange={setSubCategoryModal}
      >
        <Modal.Content className="w-full max-w-xl">
          <CreateSubCategory setCloseModal={setSubCategoryModal} />
        </Modal.Content>
      </Modal> */}
    </div>
  );
};

export default ProductForm;
