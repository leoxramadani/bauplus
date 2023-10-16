import { gql } from '@apollo/client';

const CREATE_ROLES_PRIVILEGES_QUERY = gql`
  mutation createNewRoles_Privileges(
    $entity: Roles_PrivilegesInput!
  ) {
    createNewRoles_Privileges(entity: $entity) {
      role_ID
      privilege_ID
      modifiedBy
      modified
      createdBy
      created
      id
    }
  }
`;

//* In your component code, you can call the mutation like this:
// const [createNewRolesPrivileges, { data, loading, error }] = useMutation(CREATE_ROLES_PRIVILEGES_QUERY);

// const variables = {
//   entity: {
//     privilege_ID: 98,
//     created: "04/20/2023",
//     createdBy: "LEO",
//     modified: "04/20/2023",
//     modifiedBy: "LEO",
//     isDeleted: false,
//     id: "10D2C035-D88E-4265-9EA8-89819182E675"
//   }
// };

// createNewRolesPrivileges({ variables })
//   .then((response) => {
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });

const UPDATE_ROLES_PRIVILEGES_MUTATION = gql`
  mutation updateRolesPrivileges(
    $role_ID: String!
    $privilege_ID: Int!
    $createdBy: String!
    $modifiedBy: String!
    $modified: String!
    $created: String!
  ) {
    updateRoles_Privileges(
      role_ID: $role_ID
      privilege_ID: $privilege_ID
      createdBy: $createdBy
      modifiedBy: $modifiedBy
      modified: $modified
      created: $created
    ) {
      id
      privilege_ID
      modifiedBy
    }
  }
`;

//* In your component code, you can call the mutation like this:
// const [updateRolesPrivileges, { data, loading, error }] = useMutation(UPDATE_ROLES_PRIVILEGES_MUTATION);

// const variables = {
//   role_ID: "B660FA28-9CDA-43AA-9069-817AFD1C3BC4",
//   privilege_ID: 98,
//   createdBy: "AAAAAAAAAA",
//   modifiedBy: "AAAAAAAAAAAAA",
//   modified: "04/24/2023",
//   created: "04/24/2023"
// };

// updateRolesPrivileges({ variables })
//   .then((response) => {
//     // handle success
//   })

export const GET_ALL_ROLES_PRIVILEGES = gql`
  query {
    allRoles_Privileges {
      privilege_ID
      role_Id
      roles {
        name
      }
    }
  }
`;

//* In your component code, you can call the mutation like this:
// const { data, loading, error } = useQuery(GET_ALL_ROLES_PRIVILEGES);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       {data.allRoles_Privileges.map((rp) => (
//         <div key={rp.id}>
//           <p>ID: {rp.id}</p>
//           <p>Modified By: {rp.modifiedBy}</p>
//         </div>
//       ))}
//     </div>
//   );

const REMOVE_ROLES_PRIVILEGES_MUTATION = gql`
  mutation removeRolesPrivileges($rpid: String!) {
    removeRoles_Privileges(rpid: $rpid)
  }
`;

//* In your component code, you can call the mutation like this:
// const [removeRolesPrivileges, { data, loading, error }] = useMutation(REMOVE_ROLES_PRIVILEGES_MUTATION);

// removeRolesPrivileges({ variables: { rpid: "B660FA28-9CDA-43AA-9069-817AFD1C3BC4" } })
//   .then((response) => {
//     // handle success
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle error
//   });

const GET_ROLES_PRIVILEGES_MUTATION = gql`
  query getRolesPrivileges($role_ID: String!) {
    specificRoles_Privileges(role_ID: $role_ID) {
      id
      modifiedBy
    }
  }
`;

//* In your component code, you can call the query like this:
// const { loading, error, data } = useQuery(GET_ROLES_PRIVILEGES_MUTATION, {
//   variables: { role_ID: "b660fa28-9cda-43aa-9069-817afd1c3bc4" },
// });

// // Render your component
// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error :(</p>;

// return (
//   <div>
//     {data && data.specificRoles_Privileges && (
//       <div>
//         <p>Role ID: {data.specificRoles_Privileges.id}</p>
//         <p>Modified By: {data.specificRoles_Privileges.modifiedBy}</p>
//       </div>
//     )}
//   </div>
// );
