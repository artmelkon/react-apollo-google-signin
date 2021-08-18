import React from "react";
import { Link } from "react-router-dom";

const formatDate = date => {
  date = parseInt(date)
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');

  return `${newDate} at ${newTime}`;
}

const UserInfo = ({ session }) => {

  return (
    <div className="App">
      <h3>Usder Info</h3>
      <p>Uesrname: {session.getCurrentUser.username}</p>
      <p>Email: {session.getCurrentUser.email}</p>
      <p>Jined Data: {formatDate(session.getCurrentUser.joinDate)}</p>
      <ul>
        <li>
          <h3>{session.getCurrentUser.username}'s Favorites</h3>
        </li>
        {session.getCurrentUser.favorites.map((favorit) => (
          <li key={favorit._id}>
            <Link to={`/recipe/${favorit._id}`}>{favorit.name}</Link>
          </li>
        ))}
        {!session.getCurrentUser.favorites.length && (
          <p>
            <strong>You don't have favorites yet!<br></br> Add some now</strong>
          </p>
        )}
      </ul>
    </div>
  );
};

export default UserInfo;
