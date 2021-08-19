import React from "react";
import { Mutation } from "@apollo/client/react/components";

import withSession from "../withSession";
import { LIKE_RECIPE } from "../../queries";

class LikeRecipe extends React.Component {
  state = {
    username: "",
  };

  handleLIke = (likeRecipe) => {
    
  }

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username } = this.props.session.getCurrentUser;
      console.log(username);
      this.setState({ username });
    }
  }

  render() {
    const { username } = this.state;
    const { recipeId } = this.props;
    return (
      <Mutation mutation={LIKE_RECIPE} variables={{ _id: recipeId, username }}>
        {(likeRecipe) =>
          username && (
            <button onClick={() => this.handleLIke(likeRecipe)}>Like</button>
          )
        }
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
