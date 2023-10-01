
/**
 * * I created this page temporarily to test connectivity to the backend
 * * and to the table
 */
import { DataTable } from "@/components/molecules/table/DataTable";
import { TFiscalColumns,FiscalColumns } from "@/components/molecules/table/columns/FiscalColumns";
import { GET_ALL_FISKALE_HYRESE } from "@/lib/constants/endpoints";
import { useEffect, useState } from "react";
const Fiscal = () => {
  const [data, setData] = useState<TFiscalColumns[]>([]); // Initialize state for data

  //*Created this fetch to test data from the backend currently will throw an error because we dont have a login
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(GET_ALL_FISKALE_HYRESE);
  //       if (response.ok) {
  //         const jsonData: TFiscalColumns[] = await response.json();
  //         setData(jsonData); // Update state with fetched data
  //       } else {
  //         console.error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); 


  return (
    <>
    <div>Fiscal</div>
    <DataTable columns={FiscalColumns} data={data}/>
    </>
  )
};

export default Fiscal;


async function getData(): Promise<TFiscalColumns[]> {
  const data = await fetch(GET_ALL_FISKALE_HYRESE)

  return [
    {
      nr:1,
      userName:"string",
      companyName:"string",
      dataNeDokument:"05/05/2022",
      shumaPaTVSH :10,
      vleraTVSH : 10,
      shumaTVSH : 10,
      nrLHD:10,
      dataKohaRec:"Date",
      nrExtern:"0101"
    }
  ]
}