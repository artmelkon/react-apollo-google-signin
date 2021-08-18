import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ _id, name, likes }) => (
  <li>
    <Link to={`/recipe/${_id}`}>
      <h5>{name}</h5>
    </Link>
    <p>Likes: {likes}</p>
  </li>
);

export default SearchItem;
