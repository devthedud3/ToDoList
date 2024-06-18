import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        description
        completed
        dueDate
      }
      message
    }
  }
`;

export default UPDATE_TASK;
