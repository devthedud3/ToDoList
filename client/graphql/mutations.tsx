import { gql } from "@apollo/client";

export const CREATE_LIST = gql`
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

export const DELETE_TASK = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      task {
        id
        description
      }
      message
    }
  }
`;
