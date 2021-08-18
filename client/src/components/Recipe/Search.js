import React from "react";
import { ApolloConsumer } from "@apollo/client";

import { SEARCH_RECIPES } from "../../queries";
import SearchItem from "./SearchItem";

class Search extends React.Component {
  state = {
    searchResults: [],
  };
  handleChange = ({ searchRecipes }) => {
    this.setState({ searchResults: searchRecipes }, () =>
      console.log(searchRecipes)
    );
  };

  render() {
    const { searchResults } = this.state;

    
    return (
      <ApolloConsumer>
        {(client) => (
          <div className="App">
            <h5>Search</h5>
            <input
              type="search"
              placeholder="Search for recipes"
              onChange={async (event) => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value },
                });

                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map((recipe) => (
                <SearchItem key={recipe._id} {...recipe} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
