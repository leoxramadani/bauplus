import { gql } from "@apollo/client";

export const LLHD_FILTERED_QUERY = gql`
  query {
    llogariteHyreseDalese_filtered {
      nr
      companyName
      tipi
      shumaTVSH
      vleraTVSH
      shumaPaTVSH
      dataNeDokument
    }
  }
`;
