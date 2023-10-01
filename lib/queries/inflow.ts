import { gql } from "@apollo/client";

//Inflow ne backend kurse ne front do te shfaqen si outflow pas kerkeses se profit veton
export const GET_ALL_OUTFLOW_QUERY = gql`
  query {
    allOutflowData {
      nr
      companyName
      dataNeDokument
      shumaPaTVSH
      shumaTVSH
      vleraTVSH
      tipi
    }
  }
`;
