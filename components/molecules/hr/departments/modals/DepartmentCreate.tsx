import { useState } from 'react';
import DepartmentForm from '../forms/DepartmentForm';

const DepartmentCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <DepartmentForm setModalOpen={setIsOpen} />;
};

export default DepartmentCreate;
