import { gql } from "@apollo/client";

export const GET_ALL_ACTIVITIES_QUERY = gql`
  query {
    allActivities {
      nr,
      activity,
      act_Description,
      userName,
      companyName,
      datetimeCreated,
    }
  }
`;



export const REMOVE_ACITIVITY_QUERY = gql`
mutation($nr:Int!){
  removeActivity(nr: $nr)
}
`;