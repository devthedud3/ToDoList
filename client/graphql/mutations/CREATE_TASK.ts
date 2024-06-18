import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      task {
        id
        description
        dueDate
      }
      message
    }
  }
`;

export default CREATE_TASK;
