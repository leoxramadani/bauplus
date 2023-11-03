// import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_TOTAL_OUTCOME } from '../../queries/dashboard';

export const TotalSumOutcome = () => {
  // const { loading, error, data } = useQuery(GET_TOTAL_OUTCOME);
  const [myTotal, setTotal] = useState<number>();
  // useEffect(() => {
  //   if (data) {
  //     setTotal(data.totalOutcome.shumaTVSH);
  //   }
  //   if (error) {
  //     console.log('error=', error);
  //   }
  // }, [data, loading, error]);
  // // Access the decimal value from the data object

  return myTotal;
};
