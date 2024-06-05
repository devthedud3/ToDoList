import { gql } from "@apollo/client";

export const GET_LIST = gql`
  query {
    lists {
      id
      title
      tasks {
        id
        description
        completed
        dueDate
        createdAt
      }
    }
  }
`;
