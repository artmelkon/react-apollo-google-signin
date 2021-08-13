const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  enum Order {
    asc
    desc
  }
  type Recipe {
    _id: ID!
    name: String!
    category: String!
    description: String!
    instructions: String!
    imageUrl: String!
    likes: Int
    username: String
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  type Token {
    token: String!
    userId: String!
  }

  input AuthUserInput {
    username: String!
    password: String!
  }

  type RootQuery {
    getUsers: [User!]!
    getCurrentUser: User
    getRecipe(_id: ID!): Recipe
    getAllRecipes: [Recipe]
  }

  type RootMutation {
    addRecipe(
      name: String!
      description: String!
      category: String
      imageUrl: String!
      instructions: String!
      username: String
    ): Recipe
    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(username: String!, password: String!): Token
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;
