import { gql } from "@apollo/client";

export const UPDATE_LIST = gql`
  mutation UpdateList($input: UpdateListInput!) {
    updateList(input: $input) {
      list {
        id
        title
        tasks {
          __typename
          id
          description
          completed
          dueDate
        }
      }
      response
    }
  }
`;
export default UPDATE_LIST;
