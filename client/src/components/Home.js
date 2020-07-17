import React, { useContext, useEffect, useState, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import Post from "./Post";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import "../styles/App.scss";
import Masonry from "react-masonry-css";
import { masonryBreakpoints } from "../constants";
import AddForm from "./AddForm";
import { getUserPosts } from "../store/reducer/index";
import TopButton from "./TopButton";

export default function Home() {
  const [filter, setFilter] = useState("");
  const { state, dispatch } = useContext(AuthContext);
  const pinnedPosts = useMemo(() => {
    return new Set(state.dbUser.pinnedPosts)
  }, [state.dbUser.pinnedPosts]);

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

  const { posts, dbUser } = state;
  const {
    githubId,
    username,
    avatarUrl,
    fullname,
    discord
  } = dbUser;
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
    .map((post, i) => <Post key={i} {...post} pinnedPosts={pinnedPosts} user={dbUser}/>);

  return (
    <div className="home-container">
      <div className="header-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <div className="header">
          
          <Profile {...{ githubId, username, avatarUrl, fullname, discord}} />
          <SearchBar setFilter={setFilter} />
        </div>
      </div>
      <div className="masonry-container">
        <Masonry
          className="my-masonry-grid posts"
          columnClassName="my-masonry-grid_column"
          breakpointCols={masonryBreakpoints}
        >
          {allPosts}
        </Masonry>
      </div>
      <TopButton/>
      <AddForm/>
    </div>
  );
}
