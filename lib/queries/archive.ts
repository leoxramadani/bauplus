import { gql } from '@apollo/client';

export const GET_ALL_ARCHIVE_QUERY = gql`
  query {
    allArkiva {
      nr
      userName
      osnovenBr
      predmet
      userName
      podBroevi
      datumPriem
      ispracac
      broj
      datum
      organEdinica_ID
      razvodDatum
      oznaka_ID
    }
  }
`;

export const REMOVE_ARCHIVE_ROW_QUERY = gql`
  mutation RemoveArkiva($nr: Int!) {
    removeArkiva(nr: $nr)
  }
`;

export const SPECIFIC_ARKIVA_QUERY = gql`
  query ($nr: Int!) {
    specificArkiva(nr: $nr) {
      nr
      broj
      datum
      datumPriem
      imageName
      ispracac
      organEdinica_ID
      oznaka_ID
      nr_LLHD
      predmet
      razvodDatum
      podBroevi
      myFile
      osnovenBr
    }
  }
`;

export const UPDATE_ARKIVA_QUERY = gql`
  mutation (
    $NrArk: Int!
    $broj: String!
    $datum: DateTime!
    $datumPriem: DateTime!
    $ImageArk: String!
    $ispracac: String!
    $organEdinica_ID: String!
    $oznaka_ID: String!
    $predmet: String!
    $razvodDatum: DateTime!
    $podBroevi: Byte!
    $nrLHD: Int!
    $FileBase64: String!
    $IsUploaded: Boolean!
    $osnovenBr: Int!
  ) {
    updateArkiva2(
      nrArk: $NrArk
      broj: $broj
      datum: $datum
      datumPriem: $datumPriem
      imageArk: $ImageArk
      ispracac: $ispracac
      organEdinica_ID: $organEdinica_ID
      oznaka_ID: $oznaka_ID
      predmet: $predmet
      razvodDatum: $razvodDatum
      podBroevi: $podBroevi
      nrLHD: $nrLHD
      fileBase64: $FileBase64
      isUploaded: $IsUploaded
      osnovenBr: $osnovenBr
    ) {
      nr
      osnovenBr
      predmet
      datumPriem
      ispracac
      datum
      broj
      organEdinica_ID
      oznaka_ID
      razvodDatum
      created
    }
  }
`;

export const CREATE_ARKIVA_QUERY = gql`
  mutation createNewArkiva($entity: ArkivaDTOInput!) {
    createNewArkiva(entity: $entity) {
      nr
    }
  }
`;

export const GET_ALL_OZNAKA_QUERY = gql`
  query {
    allOznaka {
      oznaka_ID
      pershkrim
    }
  }
`;

export const GET_ALL_ORGEDI_QUERY = gql`
  query {
    allOrganEdinica {
      organEdinica_ID
    }
  }
`;
export const GET_ALL_LIHD = gql`
  query {
    llogariteHyreseDalese {
      nr
      imageName
      shumaTVSH
      shumaPaTVSH
      vleraTVSH
      userName
      dataNeDokument
      dosja
      created
    }
  }
`;

export const GET_SPECIFIC_LLHD_QUERY = gql`
  query ($nr: Int!) {
    findLlogariteHyreseDalese(nr: $nr) {
      file
      imageName
      shumaTVSH
      nr
      shumaPaTVSH
      vleraTVSH
      userName
      dataNeDokument
      dosja
      created
    }
  }
`;
