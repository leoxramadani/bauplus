import Modal from '@/components/atoms/Modal';
import CreateProduct from '@/components/molecules/product/CreateProduct';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import { GET_ALL_PRODUCTS } from '@/lib/constants/endpoints/products/products';
import useData from '@/lib/hooks/useData';
import {
  IProduct,
  productColumnDef,
} from '@/lib/schema/product/product';
import { FileInput, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Product = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useData<IProduct[]>(
    ['products'],
    GET_ALL_PRODUCTS
  );
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Modal.Trigger asChild>
            <Button variant="destructive" className="flex gap-2">
              <Plus size={20} /> <span>Add New Product</span>
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="New Product"
            description="Add a product"
          >
            <CreateProduct setCloseModal={setIsModalOpen} />
          </Modal.Content>
        </Modal>

        <Button variant="outline" className="flex gap-2">
          <FileInput /> <span>Export</span>
        </Button>
      </div>
      {data && !isLoading ? (
        <DataTable
          data={data}
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
