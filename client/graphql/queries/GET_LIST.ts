import { gql } from "@apollo/client";

const GET_LIST = gql`
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

export default GET_LIST;
