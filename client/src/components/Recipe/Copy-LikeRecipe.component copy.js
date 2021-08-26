import React from "react";
import { Mutation } from "@apollo/client/react/components";

import withSession from "../withSession";
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from "../../queries";

class LikeRecipe extends React.Component {
  state = {
    liked: false,
    username: "",
  };

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(
      (prevState) => ({
        liked: !prevState.liked,
      }),
      () => this.handleLike(likeRecipe, unlikeRecipe)
    );
  };

  handleLike = (likeRecipe, unlikeRecipe) => {
    if (this.state.liked) {
      likeRecipe().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    } else {
      // unlike recipoe mutation
      unlikeRecipe().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    }
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { recipeId } = this.props;
      const prevLiked =
        favorites.findIndex((favorite) => favorite._id === recipeId) > -1;
      // console.log("favorite ", favorites);
      this.setState({ liked: prevLiked, username });
    }
  }

  updateLike = (client, { data: { likeRecipe } }) => {
    const { recipeId } = this.props;
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

  updateUnlike = (client, { data: { unlikeRecipe } }) => {
    const { recipeId } = this.props;
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

  render() {
    const { liked, username } = this.state;
    const { recipeId } = this.props;
    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id: recipeId, username }}
        update={this.updateUnlike}
      >
        {(unlikeRecipe) => (
          <Mutation
            mutation={LIKE_RECIPE}
            variables={{ _id: recipeId, username }}
            update={this.updateLike}
          >
            {(likeRecipe) =>
              username && (
                <button
                  onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}
                >
                  {liked ? "Unlike" : "Like"}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
