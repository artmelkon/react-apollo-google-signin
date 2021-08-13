import { gql } from "apollo-boost";

/* Recipes Queries */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      joinDate
    }
  }
`;

export const GET_RECIPE = gql`
  query GetRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      likes
      username
    }
  }
`;

/* Recipes Mutation */
export const ADD_RECIPE = gql`
  mutation (
    $name: String!
    $description: String!
    $category: String
    $instructions: String!
    $imageUrl: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
      imageUrl: $imageUrl
      username: $username
    ) {
      _id
      name
      category
      description
      instructions
      imageUrl
      likes
      username
    }
  }
`;

/* User Query */
/* User Mutation */
export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SigninUser($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
