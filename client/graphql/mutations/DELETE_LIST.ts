import { gql } from "@apollo/client";

export const DELETE_LIST = gql`
  mutation DeleteList($input: DeleteListInput!) {
    deleteList(input: $input) {
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

export default DELETE_LIST;
