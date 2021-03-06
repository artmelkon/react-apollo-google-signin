import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "@apollo/client/react/components";

import { GET_RECIPE } from "../../queries";
import LikeRecipe from "../../components/Recipe/LikeRecipe.component";

const RecipePage = ({ match }) => {
  const { id } = match.params;
  // console.log(id);
  return (
    <Query query={GET_RECIPE} variables={{ _id: id }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Losding...</p>;
        if (error) return <p>Error</p>;

        return (
          <div className="App">
            <h2>{data.getRecipe.name}</h2>
            <p>Category: {data.getRecipe.category}</p>
            <p>Description: {data.getRecipe.description}</p>
            <img src={data.getRecipe.imageUrl} style={{ width: "35%" }} />
            <p>Instructions: {data.getRecipe.instructions}</p>
            <p>Likes: {data.getRecipe.likes}</p>
            <p>Created by: {data.getRecipe.username}</p>
            <LikeRecipe recipeId={id} />
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
