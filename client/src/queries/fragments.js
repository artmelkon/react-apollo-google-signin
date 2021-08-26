import { gql } from "@apollo/client";

export const recipeFragments = {
  recipe: gql`
    fragment CompleteRecipe on Recipe {
      _id
      name
      category
      description
      imageUrl
      instructions
      likes
      username
      createdDate
    }
  `,
  like: gql`
    fragment LikeRecipe on Recipe {
      _id
      likes
    }
  `,
};
