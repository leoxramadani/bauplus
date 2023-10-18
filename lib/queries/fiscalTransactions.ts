import { gql } from '@apollo/client';

export const GET_FISCAL_TRANSACTIONS_QUERY = gql`
  query {
    allFiskaleHyrese {
      nr
      nrExtern
      companyName
      dataNeDokument
      shumaTVSH
      vleraTVSH
      shumaPaTVSH
      companyName
      dataKohaRec
      userName
    }
  }
`;

export const REMOVE_FISCAL_TRANSACTION_QUERY = gql`
  mutation RemoveFiskaleHyrese($nr: Int!) {
    removeFiskaleHyrese(nr: $nr)
  }
`;

//*This is how it should be
export const CREATE_FISCAL_TRANSACTION_QUERY = gql`
  mutation createNewFiskaleHyrese($entity: IncomeDTOInput!) {
    createNewFiskaleHyrese(entity: $entity) {
      fiskaleHyrese_ID
    }
  }
`;

export const GET_SPECIFIC_FISCAL_TRANSACTION_QUERY = gql`
  query ($nr: Int!) {
    specificFiskaleHyrese(nr: $nr) {
      nr
      komitentID
      nrExtern
      dataNeDokument
      shumaTVSH
      shumaPaTVSH
      vleraTVSH
      imageName
      myFile
    }
  }
`;
export const GET_FILE_FISCAL_TRANSACTION_QUERY = gql`
  query ($nr: Int!) {
    specificFiskaleHyrese(nr: $nr) {
      myFile
      imageName
    }
  }
`;

// TODO: Add ability to update shuma Pa TVSH
export const UPDATE_FISCAL_TRANSACTION_QUERY = gql`
  mutation (
    $nr: Int!
    $komitentID: Int!
    $nrExtern: String!
    $dataNeDokument: DateTime!
    $shumaTVSH: Decimal!
    $vleraTVSH: Decimal!
    $shumaPaTVSH: Decimal!
    $fileUploaded: String!
    $imageName: String!
  ) {
    updateFiskaleHyrese(
      nr: $nr
      komitentID: $komitentID
      nrExtern: $nrExtern
      dataNeDokument: $dataNeDokument
      shumaTVSH: $shumaTVSH
      vleraTVSH: $vleraTVSH
      shumaPaTVSH: $shumaPaTVSH
      fileUploaded: $fileUploaded
      imageName: $imageName
    ) {
      fiskaleHyrese_ID
    }
  }
`;
