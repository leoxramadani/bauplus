// import { useQuery } from '@apollo/client';
import { useState } from 'react';

export const TotalSumIncome = () => {
  // const { loading, error, data } = useQuery(GET_TOTAL_INCOME);
  const [myTotal, setTotal] = useState<number>();
  // useEffect(() => {
  //   if (data) {
  //     setTotal(data.totalIncome.shumaTVSH);
  //   }
  // }, [data, loading, error]);
  // // Access the decimal value from the data object

  return myTotal;
};
