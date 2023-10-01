import { gql } from "@apollo/client";


//* the mutation takes an argument for the entity input object & returns long description
const CREATE_PRIVILEGES_QUERY = gql`
  mutation createNewPrivileges($entity: PrivilegesInput!) {
    createNewPrivileges(entity: $entity) {
      long_Description
    }
  }
`;

// In your component code, you can call the mutation like this:
// const [createPrivileges, { data, loading, error }] = useMutation(CREATE_PRIVILEGES_QUERY);

// const entity = {
//   privilege_ID: 98,
//   short_Description: "This is a short desc",
//   long_Description: "LONG description on creating the Privilege and what it's about",
//   createdBy: "USER_101",
//   created: "04/23/2023",
//   modifiedBy: "",
//   modified: "04/23/2023",
//   isDeleted: false,
// };

// createPrivileges({ variables: { entity } })
//   .then((response) => {
//     console.log(response.data.createNewPrivileges.long_Description);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });


const GET_ALL_PRIVILEGES_QUERY = gql`
  query {
    allPrivileges {
      privilege_ID
      long_Description
      short_Description
      createdBy
      created
      modifiedBy
      modified
      isDeleted
    }
  }
`;
export const GET_ALL_PRIVILEGES_SMALL_QUERY = gql`
  query {
    allPrivileges {
      privilege_ID
      long_Description
      short_Description
    }
  }
`;

export type Privilege = {
  privilege_ID: string;
  long_Description: string;
  short_Description: string;
};

export type AllPrivilegesQueryData = {
  allPrivileges: Privilege[];
};

//* In your component you can use this to display the privileges
// const { loading, error, data } = useQuery(GET_ALL_PRIVILEGES_QUERY);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return (
//     <div>
//       {data.allPrivileges.map((privilege) => (
//         <div key={privilege.privilege_ID}>
//           <h2>{privilege.long_Description}</h2>
//           <p>{privilege.short_Description}</p>
//           <p>Created By: {privilege.createdBy}</p>
//           <p>Created At: {privilege.created}</p>
//         </div>
//       ))}
//     </div>
//   );


const UPDATE_PRIVILEGES_QUERY = gql`
  mutation updatePrivileges(
    $privilegeID: Int!,
    $created: String!,
    $createdBy: String!,
    $long_Description: String!,
    $short_Description: String!,
    $modifiedBy: String!,
    $modified: String!
  ) {
    updatePrivileges(
      privilegeID: $privilegeID,
      created: $created,
      createdBy: $createdBy,
      long_Description: $long_Description,
      short_Description: $short_Description,
      modifiedBy: $modifiedBy,
      modified: $modified
    ) {
      long_Description,
      modifiedBy
    }
  }
`;

//*In your component code, you can call the mutation like this:
// const [updatePrivileges, { data, loading, error }] = useMutation(UPDATE_PRIVILEGES_QUERY);

// const variables = {
//   privilegeID: 98, 
//   created: "04/24/2023",
//   createdBy: "Ardrin",
//   long_Description: "MODIFIED LONG description for the Privileges",
//   short_Description: "Short description",
//   modifiedBy: "Ardrin",
//   modified: "04/24/2023"
// };

// updatePrivileges({ variables })
//   .then((response) => {
//     console.log(response.data.updatePrivileges);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });


const REMOVE_PRIVILEGES_QUERY = gql`
  mutation removePrivileges($pid: Int!) {
    removePrivileges(pid: $pid)
  }
`;

//* In your component code, you can call the mutation like this:
// const [removePrivileges, { data, loading, error }] = useMutation(REMOVE_PRIVILEGES_QUERY);

// removePrivileges({ variables: { pid: 98 } })
//   .then((response) => {
//     console.log(response.data.removePrivileges);
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });


const SPECIFIC_PRIVILEGES_QUERY = gql`
  query specificPrivileges($privilegeID: Int!) {
    specificPrivileges(privilegeID: $privilegeID) {
      short_Description
      long_Description
      created
      createdBy
    }
  }
`;

//* In your component code, you can call the query like this:
// const { loading, error, data } = useQuery(SPECIFIC_PRIVILEGES_QUERY, {
//   variables: { privilegeID: 98 },
// });

// if (loading) return "Loading...";
// if (error) return `Error! ${error.message}`;

// console.log(data.specificPrivileges);

