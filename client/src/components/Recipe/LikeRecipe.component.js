import React, { useState, useEffect, useCallback } from "react";
import { Mutation } from "@apollo/client/react/components";

import withSession from "../withSession";
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from "../../queries";

const LikeRecipe = (props) => {
  const [theState, setTheState] = useState({
    liked: false,
    username: "",
  });

  useEffect(() => {
    // console.log(props.session.getCurrentUser);
    if (props.session.getCurrentUser) {
      const { username, favorites } = props.session.getCurrentUser;
      const { recipeId } = props;
      console.log('favorites ', favorites)
      console.log("props ", props.recipeId);
      const prevLiked =
        favorites.findIndex((favorite) => favorite._id === recipeId) > -1;
      setTheState(theState => ({...theState, username}));
    }

  }, [props]);

  console.log(theState)

  const handleClick = useCallback((likeRecipe, unlikeRecipe) => {
    setTheState(
      (prevState) => ({...theState, liked: !prevState.liked,
      }),
      () => handleLike(likeRecipe, unlikeRecipe)
    );
  });

  const handleLike = (likeRecipe, unlikeRecipe) => {
    if (theState.liked) {
      likeRecipe().then(async ({ data }) => {
        // console.log(data);
        await props.refetch();
      });
    } else {
      // unlike recipoe mutation
      unlikeRecipe().then(async ({ data }) => {
        // console.log(data);
        await props.refetch();
      });
    }
  };

  const updateLike = (client, { data: { likeRecipe } }) => {
    const { recipeId } = props;
    // console.log(client, data);
    const { getRecipe } = client.readQuery({
      query: GET_RECIPE,
      variables: { _id: recipeId },
    });

    client.writeQuery({
      query: GET_RECIPE,
      variables: { _id: recipeId },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 },
      },
    });
  };

  const updateUnlike = (client, { data: { unlikeRecipe } }) => {
    const { recipeId } = props;
    // console.log(client, unlikeRecipe);

    const { getRecipe } = client.readQuery({
      query: GET_RECIPE,
      variables: { _id: recipeId },
    });

    client.writeQuery({
      query: GET_RECIPE,
      variables: { _id: recipeId },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 },
      },
    });
  };

  const { liked, username } = theState;
  const { recipeId } = props;
  return (
    // <p>- Liked -</p>
    <Mutation
      mutation={UNLIKE_RECIPE}
      variables={{ _id: recipeId, username }}
      update={updateUnlike}
    >
      {(unlikeRecipe) => (
        <Mutation
          mutation={LIKE_RECIPE}
          variables={{ _id: recipeId, username }}
          update={updateLike}
        >
          {(likeRecipe) =>
            username && (
              <button onClick={() => handleClick(likeRecipe, unlikeRecipe)}>
                {liked ? "Unlike" : "Like"}
              </button>
            )
          }
        </Mutation>
      )}
    </Mutation>
  );
};

export default withSession(LikeRecipe);
