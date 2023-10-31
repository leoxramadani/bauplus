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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Check, ChevronsUpDown, Edit, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import React, {
  Key,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import ProductCategoryForm from './category/ProductCategoryForm';

interface IProductForm {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  productId?: string;
  refetchProducts?: any;
}

interface ICategory {
  categoryName: string;
  companyId: string;
  categoryId?: string | undefined;
  company?:
    | {
        companyId: string;
        companyName: string;
      }
    | undefined;
}

const ProductForm = ({
  setIsModalOpen,
  productId,
  refetchProducts,
}: IProductForm) => {
  const router = useRouter();
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory>();
  const [productData, setProductData] = useState<any>();
  const {
    data: productCategories,
    isLoading,
    isError,
    refetch: refetchProductCategories,
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
            companyId: '145D8D93-7FF7-4A24-A184-AA4E010E7F37',
          })
          .then((res) => {
            console.log('update product->', res);
            router.replace('/products', undefined, {
              shallow: true,
            });
            refetchProducts();
          })
          .catch((error) => {
            console.log('Error UPDATING product:', error);
          });
      } else {
        console.log('Creating product');
        await axios
          .post(CREATE_PRODUCT, {
            ...data,
            companyId: '145D8D93-7FF7-4A24-A184-AA4E010E7F37',
          })
          .then((res) => {
            console.log('Successfully created product->', res);
            refetchProducts();
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

  useEffect(() => {
    if (!categoryModal) {
      setCategoryToEdit(undefined);
    }
  }, [categoryModal]);

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
            <div className="col-span-2 flex w-full grid-cols-1 flex-col gap-4  sm:grid ">
              {/* Product name */}
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
              {/* <FormField
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
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="flex w-max items-center justify-center "
                      onClick={() => setCategoryModal(true)}
                    >
                      Add Category
                    </Button>
                  </FormItem>
                )}
              /> */}

              {/* Category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Category</FormLabel>
                    <div className="flex flex-row items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'flex w-full items-center justify-between gap-1',
                                !field.value &&
                                  'text-muted-foreground'
                              )}
                              // disabled={isSubmitting}
                            >
                              {field.value
                                ? productCategories?.find(
                                    (category) =>
                                      category.categoryId ===
                                      field.value
                                  )?.categoryName
                                : 'Choose category'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandEmpty>
                              No categories found.
                            </CommandEmpty>
                            <CommandGroup className="flex h-full max-h-[200px] flex-col gap-4 overflow-y-auto">
                              {productCategories?.map(
                                (category, i: Key) => (
                                  <CommandItem
                                    value={category.categoryName}
                                    className="flex items-center"
                                    key={i}
                                    onSelect={() => {
                                      category.categoryId &&
                                        form.setValue(
                                          'categoryId',
                                          category?.categoryId
                                        );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4 transition-all',
                                        category.categoryId ===
                                          field.value
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    <p className="flex flex-grow">
                                      {category.categoryName}
                                    </p>
                                    <Edit
                                      className={cn(
                                        'mr-2 h-4 w-4 flex-none opacity-30 transition-all hover:cursor-pointer hover:opacity-100'
                                      )}
                                      onClick={() => {
                                        setCategoryToEdit(
                                          () => category
                                        );
                                        setCategoryModal(true);
                                      }}
                                    />
                                  </CommandItem>
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="flex w-max items-center justify-center "
                        onClick={() => setCategoryModal(true)}
                      >
                        <Plus size={20} color={'#6E71F1'} />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-5">
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
                {/* Price */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity </FormLabel>
                      <FormControl className="relative">
                        <Input
                          type="number"
                          placeholder="Quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
          <ProductCategoryForm
            setCategoryModal={setCategoryModal}
            refetchProductCategories={refetchProductCategories}
            categoryToEdit={categoryToEdit}
          />
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
