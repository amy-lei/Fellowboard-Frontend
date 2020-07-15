import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import Post from "./Post";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import "../styles/App.scss";
import Masonry from "react-masonry-css";
import { masonryBreakpoints } from "../constants";
import "../styles/GitHubHome.css";
import { getUserPosts } from "../store/reducer/index";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const userPosts = await getUserPosts(state.user, state.proxy_url);
      dispatch({
        type: "POSTS",
        payload: { posts: userPosts },
      });
    }
    fetchData();
  }, []);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const { posts, user } = state;
  const {
    login: username,
    id: githubId,
    avatar_url: avatarUrl,
    name: fullname,
  } = user;
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div className="home-container">
      <button onClick={handleLogout}>Logout</button>
      <Profile {...{ githubId, username, avatarUrl, fullname }} />
      <SearchBar />
      <Masonry
        className="my-masonry-grid posts"
        columnClassName="my-masonry-grid_column"
        breakpointCols={masonryBreakpoints}
      >
        {posts.map((post) => (
          <Post {...post} />
        ))}
      </Masonry>
    </div>
  );
}
