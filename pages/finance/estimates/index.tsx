import Modal from '@/components/atoms/Modal';
import EstimatesCreate from '@/components/molecules/finances/estimates/EstimatesCreate';
import { DataTable } from '@/components/molecules/table/DataTable';
import { Button } from '@/components/ui/button';
import {
  estimatesDef,
  estimatesType,
} from '@/lib/schema/Finance/estimates';
import { FileInput, Layers, Plus } from 'lucide-react';
import { useState } from 'react';
const Estimates = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Modal
            open={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
          >
            <Modal.Trigger asChild>
              <Button
                variant="default"
                className="flex items-center justify-center gap-1"
              >
                <Plus size={20} /> Add Estimate
              </Button>
            </Modal.Trigger>
            <Modal.Content
              title="Add an Estimate"
              description="Fill all the fields to add an estimate"
            >
              <EstimatesCreate />
            </Modal.Content>
          </Modal>
          <Button variant="outline" className="flex gap-2">
            <Layers size={20} /> <span>Estimate Template</span>
          </Button>
          <Button variant="outline" className="flex gap-2">
            <FileInput /> <span>Export</span>
          </Button>
        </div>
        <DataTable
          data={estimatesData}
          columns={estimatesDef}
          searchVal="estimateNumber"
        />
      </section>

      {/* <RightModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
      >
        <EstimatesCreate />
      </RightModal> */}
    </>
  );
};
export default Estimates;

const estimatesData: estimatesType[] = [
  {
    id: '1',
    estimateNumber: 1,
    validTill: new Date('2023-01-15'),
    currency: 'USD',
    client: 'Client A',
    calculateTax: 'Yes',
    description: 'Estimate 1 description',
    product: 'Product 1',
  },
  {
    id: '2',
    estimateNumber: 2,
    validTill: new Date('2023-02-20'),
    currency: 'EUR',
    client: 'Client B',
    calculateTax: 'No',
    description: 'Estimate 2 description',
    product: 'Product 2',
  },
  {
    id: '3',
    estimateNumber: 3,
    validTill: new Date('2023-03-10'),
    currency: 'GBP',
    client: 'Client C',
    calculateTax: 'Yes',
    description: 'Estimate 3 description',
    product: 'Product 3',
  },
  // Add more estimate data here as needed
];
