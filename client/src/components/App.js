import React from "react";
import { Query } from "@apollo/client/react/components";

import { GET_ALL_RECIPES } from "../queries/index";
import "./App.css";


const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if(loading) return <div>Loading...</div>
        if(error) return <div>Error!</div>
        return (<p>Recipes</p>);
      }}
    </Query>
  </div>
)

export default App;
