import { gql } from '@apollo/client';

const CREATE_EXTRA_PRIVILEGES_QUERY = gql`
  mutation createNewExtraPrivileges($entity: ExtraPrivilegesInput!) {
    createNewExtra_Privileges(entity: $entity) {
      userName
      privileges {
        short_Description
        createdBy
      }
      kompanite {
        adresa
        zhiroLlogaria1
      }
      createdBy
    }
  }
`;

//* In your component code, you can call the mutation like this:
// const [createNewExtraPrivileges, { data, loading, error }] = useMutation(CREATE_EXTRA_PRIVILEGES_QUERY);

// const variables = {
//   entity: {
//     privilege_ID: 98,
//     userName: "Ardrin",
//     grant: true,
//     company_ID: 100,
//     createdBy: "USER_CREATE01",
//     created: "04/24/2023",
//     modified: "04/24/2023",
//     modifiedBy: "ARDRIN REXHEPI",
//     isDeleted: false
//   }
// };

// createNewExtraPrivileges({ variables })
//   .then((response) => {
//     console.log(response.data.createNewExtra_Privileges);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });

const GET_ALL_EXTRA_PRIVILEGES_QUERY = gql`
  query {
    allExtra_Privileges {
      userName
      privilege_ID
      grant
    }
  }
`;

//* In your component code, you can call the query like this:
// const { loading, error, data } = useQuery(GET_ALL_EXTRA_PRIVILEGES_QUERY);

// if (loading) return 'Loading...';
// if (error) return `Error! ${error.message}`;

// console.log(data.allExtra_Privileges);

const REMOVE_EXTRA_PRIVILEGES_QUERY = gql`
  mutation removeExtraPrivileges($epid: Int!) {
    removeExtra_Privileges(epid: $epid)
  }
`;

// In your component code, you can call the mutation like this:
// const [removeExtraPrivileges, { data, loading, error }] = useMutation(REMOVE_EXTRA_PRIVILEGES_QUERY);

// removeExtraPrivileges({ variables: { epid: 98 } })
//   .then((response) => {
//     console.log(response.data.removeExtra_Privileges);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });

const GET_EXTRA_PRIVILEGES_BY_ID = gql`
  query specificExtra_Privileges($privilege_ID: Int!) {
    specificExtra_Privileges(privilege_ID: $privilege_ID) {
      privilege_ID
      userName
    }
  }
`;

//* In your component code, you can call the query like this:
// const { loading, error, data } = useQuery(GET_EXTRA_PRIVILEGES_BY_ID, {
//   variables: { privilege_ID: 98 },
// });

// if (loading) return 'Loading...';
// if (error) return `Error! ${error.message}`;

// console.log(data.specificExtra_Privileges); // handle data

const UPDATE_EXTRA_PRIVILEGES_MUTATION = gql`
  mutation updateExtraPrivileges(
    $privilege_ID: Int!
    $userName: String!
    $modifiedBy: String!
    $grant: Boolean!
    $createdBy: String!
    $company_ID: Int!
    $created: String!
    $modified: String!
  ) {
    updateExtra_Privileges(
      privilege_ID: $privilege_ID
      userName: $userName
      modifiedBy: $modifiedBy
      grant: $grant
      createdBy: $createdBy
      company_ID: $company_ID
      created: $created
      modified: $modified
    ) {
      grant
      userName
      privilege_ID
      modifiedBy
      created
    }
  }
`;

//* In your component code, you can call the mutation like this:
// const [updateExtraPrivileges, { data, loading, error }] = useMutation(UPDATE_EXTRA_PRIVILEGES_MUTATION);

// const variables = {
//   privilege_ID: 98,
//   userName: "Ardrin",
//   modifiedBy: "ARDRIN",
//   grant: false,
//   createdBy: "Ardrin",
//   company_ID: 100,
//   created: "04/24/2023",
//   modified: "04/24/2023"
// };

// updateExtraPrivileges({ variables })
//   .then((response) => {
//     console.log(response.data.updateExtra_Privileges);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });
