import { gql } from '@apollo/client';

/**
 * *
 * * **To show in table queries
 * *
 */

//both
export const LLOGARITE_HYRESE_DALESE_FILTERED_QUERY = gql`
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
//List of Inflow Transactions
export const GET_ALL_INFLOW_TRANSACTIONS_FILTERED_QUERY = gql`
  query {
    allFaturaDalese_filtered {
      nr
      userName
      nrFatures
      dataNeDokument
      shumaTVSH
      vleraTVSH
      shumaPaTVSH
      afatiPageses
      statusiPageses
      nrLlogHyreseDalese
      companyName
      dosja
    }
  }
`;
//List of invoices
export const GET_OUTFLOW_TRANSACTION_FILTERED_QUERY = gql`
  query {
    allOutflowHyrese_filtered {
      nr
      companyName
      userName
      dataNeDokument
      tipi
      shumaTVSH
      shumaPaTVSH
      vleraTVSH
    }
  }
`;

/**
 * *
 * * **To calcualte sum queries
 * *
 */

export const GET_ALL_INCOMING = gql`
  query {
    allIncome {
      muaji
      shumaTVSH
    }
  }
`;

//refined
export const GET_ALL_INFLOW = gql`
  query {
    allOutcome {
      shumaTVSH
      muaji
    }
  }
`;

//dash
export const GET_TOTAL_INCOME = gql`
  query {
    totalIncome {
      shumaTVSH
    }
  }
`;
//dash
export const GET_TOTAL_OUTCOME = gql`
  query {
    totalOutcome {
      shumaTVSH
    }
  }
`;
//dash
export const GET_DIFERENCA = gql`
  query {
    diferencaIncomeOutcome {
      muaji
      shumaTVSH
    }
  }
`;

//dash
export const TotalCalculated = gql`
  query {
    allProfit {
      shumaTVSH
    }
  }
`;
