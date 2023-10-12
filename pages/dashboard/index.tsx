import GridLayout from '@/components/molecules/GridLayout/GridLayout';
import React from 'react';

const Dashboard = () => {
  if (typeof window !== 'undefined') {
    // Code that uses localStorage
    const someValue = localStorage.getItem('someKey');
  }
  return <GridLayout data={['1', '2', '3']} />;
};

export default Dashboard;
