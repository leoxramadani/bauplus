import { gql } from '@apollo/client';

export const GET_ALL_COMPANIES_QUERY = gql`
  query {
    allCompanies {
      company_ID
      company_Name
    }
  }
`;

export const CREATE_NEW_KOMITENT_QUERY = gql`
  mutation CreateNewKomitent($entity: KomitentetInput!) {
    createNewKomitent(entity: $entity) {
      komintenti_ID
    }
  }
`;

export const GET_ALL_KOMITENTS_QUERY = gql`
  query {
    allKomitentet {
      komintenti_ID
      company_Name
      adresa
      tel
      celular
      email
      web
      nrTatimore
      zhiroLlogaria1
      zhiroLlogaria2
      embs
    }
  }
`;

// export const GET_ALL_KOMITENTS_SMALL_QUERY = gql`
// query{
//   allCompanies{
//     company_ID,
//     company_Name,
//   }
// }
// `;

// export type Komitent = {
//   company_ID: string;
//   company_Name : string
//   company_Role : string
//   selectedPrivileges: string[];
// };

// export type AllCompanies = {
//   allCompanies: Komitent[];
// };

export const REMOVE_KOMITENT_QUERY = gql`
  mutation RemoveKomitent($komintenti_ID: Int!) {
    removeKomitent(komintenti_ID: $komintenti_ID)
  }
`;

export const GET_SPECIFIC_KOMITENT_QUERY = gql`
  query ($komintenti_ID: Int!) {
    specificKomitent(komintenti_ID: $komintenti_ID) {
      company_Name
      adresa
      tel
      celular
      email
      web
      nrTatimore
      zhiroLlogaria1
      zhiroLlogaria2
      embs
    }
  }
`;

export const UPDATE_KOMITENT_QUERY = gql`
  mutation UpdateKomitentet(
    $komintenti_ID: Int!
    $companyName: String!
    $adresa: String!
    $tel: String!
    $celular: String!
    $email: String!
    $web: String!
    $nrTatimore: String!
    $zhiroLlogaria1: String!
    $zhirollogaria2: String!
    $embs: String!
    $isDeleted: Boolean!
  ) {
    updateKomitentet(
      komintenti_ID: $komintenti_ID
      companyName: $companyName
      adresa: $adresa
      tel: $tel
      celular: $celular
      email: $email
      web: $web
      nrTatimore: $nrTatimore
      zhiroLlogaria1: $zhiroLlogaria1
      zhirollogaria2: $zhirollogaria2
      embs: $embs
      isDeleted: $isDeleted
    ) {
      komintenti_ID
    }
  }
`;
