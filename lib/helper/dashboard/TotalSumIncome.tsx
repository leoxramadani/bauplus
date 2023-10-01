import React, { useState, useEffect } from "react";
import { GET_TOTAL_INCOME } from "../../queries/dashboard";
import { useQuery } from "@apollo/client";

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
