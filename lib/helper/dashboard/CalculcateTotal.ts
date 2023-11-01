// import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { TotalCalculated } from '../../queries/dashboard';

export const CalculateTotal = () => {
  // const { loading, error, data } = useQuery(TotalCalculated);
  const [myTotal, setTotal] = useState<number>();
  // useEffect(() => {
  //   if (data) {
  //     setTotal(data.allProfit.shumaTVSH);
  //   }
  //   if (error) {
  //     console.log('error=', error);
  //   }
  // }, [data, loading, error]);
  // // Access the decimal value from the data object

  return myTotal;
};
