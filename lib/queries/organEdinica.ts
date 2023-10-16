import { gql } from '@apollo/client';

const CREATE_NEW_ORGAN_EDINICA_QUERY = gql`
  mutation createNewOrganEdinica(
    $organEdinica_ID: String!
    $pershkrim: String!
    $createdBy: String!
    $created: String!
    $modifiedBy: String!
    $modified: String!
    $isDeleted: Boolean!
  ) {
    createNewOrganEdinica(
      entity: {
        organEdinica_ID: $organEdinica_ID
        pershkrim: $pershkrim
        createdBy: $createdBy
        created: $created
        modifiedBy: $modifiedBy
        modified: $modified
        isDeleted: $isDeleted
      }
    ) {
      pershkrim
    }
  }
`;

// In your component code, you can call the mutation like this:
// const [createNewOrganEdinica, { data, loading, error }] = useMutation(CREATE_NEW_ORGAN_EDINICA_QUERY);

// const variables = {
//   organEdinica_ID: "s",
//   pershkrim: "pershkrimi1",
//   createdBy: "Ardrin",
//   created: "04/20/2023",
//   modifiedBy: "IIIII",
//   modified: "04/20/2023",
//   isDeleted: false
// };

// createNewOrganEdinica({ variables });

const GET_ALL_ORGAN_EDINICA_QUERY = gql`
  query allOrganEdinica {
    allOrganEdinica {
      pershkrim
      createdBy
      created
      modified
    }
  }
`;

// In your component code, you can call the query like this:
// const { loading, error, data } = useQuery(GET_ALL_ORGAN_EDINICA_QUERY);

// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error.message}</p>;

// const organizationUnits = data.allOrganEdinica;
// render the list of organization units

//! the query in the backend doesnt have a response so this is just an example
// TODO: Change the response

const REMOVE_ORGAN_EDINICA_QUERY = gql`
  mutation removeOrganEdinica($cid: String!) {
    removeOrganEdinica(cid: $cid) {
      success
      message
    }
  }
`;

// TODO: In your component code, you can call the mutation like this:
//! Example only
// const [removeOrganEdinica, { data, loading, error }] = useMutation(REMOVE_ORGAN_EDINICA_QUERY);

// removeOrganEdinica({ variables: { cid: "a" } })
//   .then((response) => {
//     console.log(response.data.removeOrganEdinica);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });

//* UPDATE ORGAN EDINICA

const UPDATE_ORGAN_EDINICA_QUERY = gql`
  mutation updateOrganEdinica(
    $organEdinica_ID: String!
    $pershkrim: String!
    $createdBy: String!
    $created: String!
    $modifiedBy: String!
    $modified: String!
  ) {
    updateOrganEdinica(
      organEdinica_ID: $organEdinica_ID
      pershkrim: $pershkrim
      createdBy: $createdBy
      created: $created
      modifiedBy: $modifiedBy
      modified: $modified
    ) {
      organEdinica_ID
      pershkrim
      createdBy
      created
      modifiedBy
      modified
      isDeleted
    }
  }
`;

// In your component code, you can call the mutation like this:
//! Example only
// const [updateOrganEdinica, { data, loading, error }] = useMutation(UPDATE_ORGAN_EDINICA_QUERY);

// const variables = {
//   organEdinica_ID: "s",
//   pershkrim: "PERSHKRIM I RI PAS UPDATE",
//   createdBy: "NEW_USER",
//   created: "04/20/2023",
//   modifiedBy: "NEW_USER",
//   modified: "04/20/2023",
// };

// updateOrganEdinica({ variables });

//* This is a query for retrieving the createdBy property of a specific organizational unit.

const GET_SPECIFIC_ORGAN_EDINICA_QUERY = gql`
  query specificOrganEdinica($organEdinicaID: String!) {
    specificOrganEdinica(organEdinicaID: $organEdinicaID) {
      # The user who created the organizational unit.
      createdBy
    }
  }
`;

// In your component code, you can call the query like this:
// const { loading, error, data } = useQuery(GET_SPECIFIC_ORGAN_EDINICA_QUERY, {
//     variables: { organEdinicaID: "s" },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const createdBy = data.specificOrganEdinica.createdBy;
// render the createdBy property
