import { Button } from '@/components/ui/button';
import { FileInput, Plus, Layers } from 'lucide-react';
import React, { useState } from 'react';
import {
  estimatesDef,
  estimatesType,
} from '@/lib/schema/Finance/estimates';
import { DataTable } from '@/components/molecules/table/DataTable';
import RightModal from '@/components/atoms/RightModal';
import EstimatesCreate from '@/components/molecules/finances/estimates/EstimatesCreate';
const Estimates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <Button
            variant="destructive"
            className="flex gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} /> <span>Create Estimate</span>
          </Button>
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

      <RightModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <EstimatesCreate />
      </RightModal>
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
