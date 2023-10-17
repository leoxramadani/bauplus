import React, { useState, useEffect } from 'react';
import { TotalCalculated } from '../../queries/dashboard';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

export const CalculateTotal = () => {
  const { loading, error, data } = useQuery(TotalCalculated);
  const [myTotal, setTotal] = useState<number>();
  useEffect(() => {
    if (data) {
      setTotal(data.allProfit.shumaTVSH);
    }
    if (error) {
      console.log('error=', error);
    }
  }, [data, loading, error]);
  // Access the decimal value from the data object

  return myTotal;
};
