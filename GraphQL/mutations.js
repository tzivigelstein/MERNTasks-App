import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      text
      state
    }
  }
`;

export const AUTH_USER = gql`
  mutation authUser($input: UserAuthInput) {
    authUser(input: $input) {
      text
      state
      token
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($input: ProjectInput) {
    createProject(input: $input)
  }
`;

export const EDIT_PROJECT = gql`
  mutation editProject($input: ProjectEditInput) {
    editProject(input: $input)
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($input: ProjectDeleteInput) {
    deleteProject(input: $input)
  }
`;
