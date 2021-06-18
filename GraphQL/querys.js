import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
      date
      colors {
        id
        name
        accentColor
        secondaryColor
      }
      icon
    }
  }
`;

export const GET_TASKS = gql`
  query getTasks($input: TasksInput) {
    getTasks(input: $input) {
      id
      name
      state
    }
  }
`;
