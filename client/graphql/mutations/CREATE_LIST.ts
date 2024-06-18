import { gql } from "@apollo/client";

const CREATE_LIST = gql`
  mutation CreateList($input: CreateListInput!) {
    createList(input: $input) {
      list {
        id
        title
        tasks {
          description
          id
          dueDate
        }
      }
    }
  }
`;

export default CREATE_LIST;
