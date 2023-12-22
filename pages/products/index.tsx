import Modal from '@/components/atoms/Modal';
import { DataTable } from '@/components/molecules/DataTable';
import ProductForm from '@/components/molecules/product/ProductForm';
import { Button } from '@/components/ui/button';
import { GET_ALL_PRODUCTS } from '@/lib/constants/endpoints/products/products';
import useData from '@/lib/hooks/useData';
import useModal from '@/lib/hooks/useModal';
import {
  IProduct,
  productColumnDef,
} from '@/lib/schema/product/product';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

const Product = () => {
  const router = useRouter();
  const { open, setOpen } = useModal();
  const {
    data,
    metadata,
    isLoading,
    isError,
    refetch: refetchProducts,
  } = useData<IProduct[]>(['products'], GET_ALL_PRODUCTS);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <Button variant="default" className="flex gap-1">
              <Plus className="size-4" /> <span>Add New Product</span>
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="New Product"
            description="Add a product"
          >
            <ProductForm
              setIsModalOpen={setOpen}
              productId={
                router.isReady ? router.query.id?.toString() : ''
              }
              refetchProducts={refetchProducts}
            />
          </Modal.Content>
        </Modal>

        <Button variant="outline" className="flex gap-1">
          <FileInput className="size-4" /> <span>Export</span>
        </Button>
      </div>
      {data && !isLoading ? (
        <DataTable<IProduct>
          data={data}
          metadata={metadata}
          columns={productColumnDef}
          searchVal="productName"
        />
      ) : (
        <>{isError ? <div>No data.</div> : <div>Loading...</div>}</>
      )}
    </section>
  );
};

export default Product;
