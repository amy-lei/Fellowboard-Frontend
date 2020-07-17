import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import Post from "./Post";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import "../styles/App.scss";
import Masonry from "react-masonry-css";
import { masonryBreakpoints } from "../constants";
import { getUserPosts } from "../store/reducer/index";

export default function Home() {
  const [filter, setFilter] = useState("");
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const { dbUser, posts } = await getUserPosts(state.user, state.proxy_url);
      dispatch({
        type: "POSTS",
        payload: { posts, dbUser },
      });
    }
    fetchData();
  }, []);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const { posts, user, selectedFilter, dbUser } = state;
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

  const allPosts = posts
    .filter((post) => {
      if (filter.startsWith("#")) {
        return post.tags.find((tag) => ("#" + tag).startsWith(filter));
      }
      return post.title.toLowerCase().includes(filter.toLowerCase());
    })
    .filter((post) => {
      switch (selectedFilter) {
        case "dashboard": {
          return dbUser.pinnedPosts.includes(post._id);
        }
        case "contacts": {
          return post.type === "contacts";
        }
        default: {
          return true;
        }
      }
    })
    .map((post) => <Post {...post} />);

  return (
    <div className="home-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <div className="header">
        <Profile {...{ githubId, username, avatarUrl, fullname }} />
        <SearchBar setFilter={setFilter} />
      </div>
      <Masonry
        className="my-masonry-grid posts"
        columnClassName="my-masonry-grid_column"
        breakpointCols={masonryBreakpoints}
      >
        {allPosts}
      </Masonry>
    </div>
  );
}
