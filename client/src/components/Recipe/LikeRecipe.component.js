import React from "react";

import withSession from "../withSession";

class LikeRecipe extends React.Component {
  state = {
    username: "",
  };

  componentDidCatch() {
    if(this.props.session.getCurrentUser) {
      const { username } = this.props.session.getCurrentUser;
      console.log(username)
    }
  }
  render() {
    console.log(this.props);
    return <button></button>;
  }
}

export default withSession(LikeRecipe);
