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

export const getAllTasks = gql`
  query {
    tasks {
      id
      title
      description
      completed
      dueDate
      createdAt
    }
  }
`;

export const getTask = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      completed
      dueDate
    }
  }
`;
