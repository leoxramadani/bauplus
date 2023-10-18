import { gql } from '@apollo/client';

//* This is fully functional
export const GET_ALL_INFLOW_TRANSACTIONS_QUERY = gql`
  query {
    allFaturaDalese {
      nr
      userName
      nrFatures
      dataNeDokument
      shumaTVSH
      vleraTVSH
      shumaPaTVSH
      afatiPageses
      statusiPageses
      companyName
      dosja
      shenim
    }
  }
`;

export const REMOVE_INFLOW_TRANSACTION_QUERY = gql`
  mutation RemoveFaturaDalese($nr: Int!) {
    removeFaturaDalese(nr: $nr)
  }
`;

//*This is how it should be
export const CREATE_INFLOW_TRANSACTION_QUERY = gql`
  mutation createNewFaturaDalese($entity: IncomeDTOInput!) {
    createNewFaturaDalese(entity: $entity) {
      nr
    }
  }
`;

export const GET_SPECIFIC_INFLOW_TRANSACTION_QUERY = gql`
  query findFaturaDalese($nr: Int!) {
    findFaturaDalese(nr: $nr) {
      nr
      nrFatures
      shumaTVSH
      vleraTVSH
      komitentiID
      afatiPageses
      statusiPageses
      dataNeDokument
      dosja
      imageName
      myFile
      shenim
    }
  }
`;

// TODO: Add ability to update shuma Pa TVSH
export const UPDATE_INFLOW_TRANSACTION_QUERY = gql`
  mutation (
    $nr: Int!
    $komitentiID: Int!
    $nrFatures: String!
    $dataNeDokument: DateTime!
    $shumaTVSH: Decimal!
    $shumaPaTVSH: Decimal!
    $vleraTVSH: Decimal!
    $fileUploaded: String!
    $imageName: String!
    $afatiPageses: DateTime!
    $statusiPageses: String!
    $shenim: String!
    $dosja: String!
  ) {
    updateFaturaDalese(
      nr: $nr
      komitentiID: $komitentiID
      nrFatures: $nrFatures
      dataNeDokument: $dataNeDokument
      shumaTVSH: $shumaTVSH
      shumaPaTVSH: $shumaPaTVSH
      vleraTVSH: $vleraTVSH
      fileUploaded: $fileUploaded
      imageName: $imageName
      afatiPageses: $afatiPageses
      statusiPageses: $statusiPageses
      shenim: $shenim
      dosja: $dosja
    ) {
      nr
    }
  }
`;

export const GET_FILE_INFLOW_TRANSACTION_QUERY = gql`
  query findFaturaDalese($nr: Int!) {
    findFaturaDalese(nr: $nr) {
      imageName
      myFile
    }
  }
`;

// * ** Filtered **
export const GET_ALL_OUTCOME_TRANSACTIONS_FILTERED_QUERY = gql`
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
