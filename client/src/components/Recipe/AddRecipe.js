import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "@apollo/client/react/components";

import withAuth from "../Auth/withAuth";
import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButton/CustomButton.component";
import Error from "../Error";

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from "../../queries";

const initialState = {
  name: "",
  category: "Breakfast",
  description: "",
  imageUrl: "",
  instructions: "",
  username: "",
};

class AddRecipe extends React.Component {
  // const [] = useState();
  // const [] = useState();
  // const [] = useState();
  // const [] = useState();

  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount() {
    const username = this.props.session.getCurrentUser.username;
    this.setState({ username }, () => console.log("usernamej ", username));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push("/");
    });
  };

  updateCache = (client, { data: { addRecipe } }) => {
    console.log(client, addRecipe);
    const { getAllRecipes } = client.readQuery({ query: GET_ALL_RECIPES });

    console.log("read Caceh Querey ", getAllRecipes);
    console.log("from data ", addRecipe);

    client.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes],
      },
    });
  };

  validateForm = () => {
    const { name, description, instructions } = this.state;

    const isValid = !name || !description || !instructions;
    return isValid;
  };

  render() {
    const { name, category, description, imageUrl, instructions, username } =
      this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{
          name,
          category,
          description,
          imageUrl,
          instructions,
          username,
        }}
        refetchQueries={() => [
          { query: GET_USER_RECIPES, variables: { username } },
        ]}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Errpr!</p>;

          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, addRecipe)}
              >
                <FormInput
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  placeholder="Recipe Name"
                />
                <select name="category" onChange={this.handleChange}>
                  <option value="Breakfest">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <FormInput
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Description"
                />
                <FormInput
                  type="text"
                  name="imageUrl"
                  value={imageUrl}
                  placeholder="Add Image"
                  onChange={this.handleChange}
                />
                {/* <FormInput
                  type="file"
                  name="imageUrl"
                  // value={imageUrl}
                  placeholder="Add Image"
                  onChange={this.handleChange}
                  accept=".psd, .tif, .tiff"
                /> */}{" "}
                <textarea
                  name="instructions"
                  value={instructions}
                  placeholder="Add instructions"
                  onChange={this.handleChange}
                ></textarea>
                <CustomButton
                  type="submit"
                  disabled={loading || this.validateForm()}
                  className="button-primery"
                >
                  Submit
                </CustomButton>
                {error && <Error error={error.message} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth((session) => session && session.getCurrentUser)(
  withRouter(AddRecipe)
);
