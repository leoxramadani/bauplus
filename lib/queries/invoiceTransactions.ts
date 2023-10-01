import { gql } from "@apollo/client";

export const GET_INVOICE_TRANSACTIONS_QUERY = gql`
  query {
    allFaturaHyrese {
      nr
      nrExtern
      userName
      companyName
      dataNeDokument
      dataKohaRec
      shumaTVSH
      vleraTVSH
      shumaPaTVSH
      statusiPageses
      afatiPageses
    }
  }
`;

export const REMOVE_INVOICE_TRANSACTIONS_QUERY = gql`
  mutation RemoveFaturaHyrese($nr: Int!) {
    removeFaturaHyrese(nr: $nr)
  }
`;

export const CREATE_INVOICE_TRANSACTION_QUERY = gql`
  mutation CreateNewFaturaHyrese($entity: IncomeDTOInput!) {
    createNewFaturaHyrese(entity: $entity) {
      faturaHyrese_ID
    }
  }
`;

export const GET_SPECIFIC_INVOICE_TRANSACTION_QUERY = gql`
  query ($nr: Int!) {
    findFaturaHyrese(nr: $nr) {
      nrExtern
      komitentID
      dataNeDokument
      shumaTVSH
      vleraTVSH
      shumaPaTVSH
      statusiPageses
      afatiPageses
      dosja
      shenim
      imageName
      myFile
    }
  }
`;

export const UPDATE_INVOICE_TRANSACTION_QUERY = gql`
  mutation (
    $nr: Int!
    $komitentiID: Int!
    $nrExtern: String!
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
    updateFaturaHyrese(
      nr: $nr
      komitentiID: $komitentiID
      nrExtern: $nrExtern
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
      faturaDalese_ID
    }
  }
`;

export const GET_FILE_INVOICE_TRANSACTION_QUERY = gql`
  query ($nr: Int!) {
    findFaturaHyrese(nr: $nr) {
      imageName
      myFile
    }
  }
`;

//** Fitlered */
export const GET_INVOICE_TRANSACTION_FILTERED_QUERY = gql`
  query {
    allOutflowHyrese_filtered {
      nr
      nrExtern
      companyName
      userName
      tipi
      dataNeDokument
    }
  }
`;
