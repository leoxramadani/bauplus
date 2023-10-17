import { gql } from '@apollo/client';

//* Create new Oznaka
const CREATE_NEW_OZNAKA_QUERY = gql`
  mutation createNewOznaka(
    $oznaka_ID: String!
    $organEdinica_ID: String!
    $pershkrim: String!
    $createdBy: String!
    $created: String!
    $modifiedBy: String!
    $modified: String!
    $isDeleted: Boolean!
  ) {
    createNewOznaka(
      oznaka_ID: $oznaka_ID
      organEdinica_ID: $organEdinica_ID
      pershkrim: $pershkrim
      createdBy: $createdBy
      created: $created
      modifiedBy: $modifiedBy
      modified: $modified
      isDeleted: $isDeleted
    ) {
      pershkrim
    }
  }
`;

// In your component code, you can call the mutation like this:
// const [createNewOznaka, { data, loading, error }] = useMutation(CREATE_NEW_OZNAKA_QUERY);

//* we will get the values from the form submit
// const variables = {
//   oznaka_ID: "P",
//   organEdinica_ID: "b",
//   pershkrim: "Pershkrim i thjeshte per oznaka",
//   createdBy: "ARDRIN",
//   created: "04/20/2023",
//   modifiedBy: "MMMMMMMMM",
//   modified: "04/20/2023",
//   isDeleted: false,
// };

// createNewOznaka({ variables })
//   .then((response) => {
//     console.log(response.data.createNewOznaka);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });

const GET_ALL_OZNAKA_QUERY = gql`
  query allOznaka {
    allOznaka {
      oznaka_ID
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

// In your component code, you can call the query like this:
// const { loading, error, data } = useQuery(GET_ALL_OZNAKA_QUERY);

// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error.message}</p>;

// const oznakas = data.allOznaka;
// render the oznakas array

//! The query doesn't have a response
// TODO: Add a response to the remove oznaka query
const REMOVE_OZNAKA_QUERY = gql`
  mutation removeOznaka($cid: String!) {
    removeOznaka(cid: $cid)
  }
`;

// In your component code, you can call the mutation like this:
// const [removeOznaka, { data, loading, error }] = useMutation(REMOVE_OZNAKA_QUERY);

// const variables = {
//   cid: "P",
// };

// removeOznaka({ variables })
//   .then((response) => {
//     console.log(response.data);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });

const UPDATE_OZNAKA_QUERY = gql`
  mutation updateOznaka(
    $oznaka_ID: String!
    $organEdinica_ID: String!
    $pershkrim: String!
    $createdBy: String!
    $created: String!
    $modifiedBy: String!
    $modified: String!
  ) {
    updateOznaka(
      oznaka_ID: $oznaka_ID
      organEdinica_ID: $organEdinica_ID
      pershkrim: $pershkrim
      createdBy: $createdBy
      created: $created
      modifiedBy: $modifiedBy
      modified: $modified
    ) {
      oznaka_ID
      organEdinica_ID
      pershkrim
    }
  }
`;

//* In your component code, you can call the mutation like this:
// const [updateOznaka, { data, loading, error }] = useMutation(UPDATE_OZNAKA_QUERY);

// const variables = {
//   oznaka_ID: "P",
//   organEdinica_ID: "a",
//   pershkrim: "PAS UPDATE KESHTU DOKET",
//   createdBy: "UPDATED_USER",
//   created: "04/20/2023",
//   modifiedBy: "GGGGGGGGGGGGG",
//   modified: "04/20/2023",
// };

// updateOznaka({ variables })
//   .then((response) => {
//     console.log(response.data.updateOznaka);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });

const GET_OZNAKA_QUERY = gql`
  query specificOznaka($oznakaID: String!) {
    specificOznaka(oznakaID: $oznakaID) {
      pershkrim
    }
  }
`;

//* In your component code, you can call the query like this:
// const { loading, error, data } = useQuery(GET_OZNAKA_QUERY, {
//   variables: { oznakaID: "P" },
// });

// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error.message}</p>;

// console.log(data.specificOznaka.pershkrim);
