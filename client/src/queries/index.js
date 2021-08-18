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
      favorites {
        _id
        name
      }
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
      imageUrl
      instructions
      likes
      username
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query SearchRecipes($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query GetUserRecipes($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      likes
      username
    }
  }
`;
/* Recipes Mutation */
export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $name: String!
    $category: String!
    $description: String!
    $imageUrl: String!
    $instructions: String!
    $username: String!
  ) {
    addRecipe(
      name: $name
      category: $category
      description: $description
      imageUrl: $imageUrl
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      category
      description
      instructions
      username
    }
  }
`;

export const DELETE_USER_RECIPE = gql`
  mutation DelteUserRecipe($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
      name
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
