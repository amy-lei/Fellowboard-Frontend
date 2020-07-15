import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import { POSTS, USER } from '../FAKE_DATA';
import Post from './Post';
import SearchBar from './SearchBar';
import Profile from './Profile';
import '../styles/App.scss';
import Masonry from "react-masonry-css";
import { masonryBreakpoints } from "../constants";
import "../styles/GitHubHome.css";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const { avatar_url, name, public_repos, followers, following } = state.user;

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="home-container">
      <button onClick={handleLogout}>Logout</button>
      <Profile {...USER} />
          <SearchBar/>
          <Masonry
            className="my-masonry-grid posts"
            columnClassName="my-masonry-grid_column"
              breakpointCols={masonryBreakpoints}
          >
              {POSTS.map(post => <Post {...post} />)}
          </Masonry>
    </div>
  );
}
