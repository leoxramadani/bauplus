import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_TOTAL_INCOME } from '../../queries/dashboard';

export const TotalSumIncome = () => {
  const { loading, error, data } = useQuery(GET_TOTAL_INCOME);
  const [myTotal, setTotal] = useState<number>();
  useEffect(() => {
    if (data) {
      setTotal(data.totalIncome.shumaTVSH);
    }
  }, [data, loading, error]);
  // Access the decimal value from the data object

  return myTotal;
};
