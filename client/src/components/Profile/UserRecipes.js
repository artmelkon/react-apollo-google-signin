import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "@apollo/client/react/components";

import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
} from "../../queries";

const UserRecipes = ({ username }) => {
  const handleDelete = (deleteUserRecipe) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delet the recipe`
    );
    if (confirmDelete) {
      deleteUserRecipe().then(({ data }) => { 
        // console.log(data) 
      });
    }
  };

  return (
    <div className="App">
      <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error!</p>;

          return (
            <ul>
              <li>
                <h3>Your Recipes</h3>
              </li>
              {!data.getUserRecipes.length && <p>You haven't add recipes yet</p>}
              {data.getUserRecipes.map((recipe) => (
                <li key={recipe._id}>
                  <Link to={`/recipe/${recipe._id}`}>
                    <h4>{recipe.name}</h4>
                  </Link>
                  <p style={{ marginbottom: "0" }}>Like: {recipe.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_RECIPES },
                      { query: GET_CURRENT_USER },
                    ]}
                    update={(cache, { data: { deleteUserRecipe } }) => {
                      // console.log(cache, deleteUserRecipe);
                      const { getUserRecipes } = cache.readQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                      });

                      cache.writeQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                        data: {
                          getUserRecipes: getUserRecipes.filter(
                            (recipe) => recipe._id !== deleteUserRecipe._id
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserRecipe, attrs = {}) => {
                      return (
                        <p
                          className="delete-button"
                          onClick={() => handleDelete(deleteUserRecipe)}
                          id={recipe._id}
                        >
                          {attrs.loading ? "deleteing..." : "X"}
                        </p>
                      );
                    }}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    </div>
  );
};

export default UserRecipes;
