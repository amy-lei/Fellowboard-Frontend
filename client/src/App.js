import React, { useEffect } from 'react';
import { POSTS, USER } from './FAKE_DATA';
import Post from './components/Post';
import SearchBar from './components/SearchBar';
import Profile from './components/Profile';
import './styles/App.scss';
import Masonry from "react-masonry-css";
import { masonryBreakpoints } from "./constants";

function App() {
    return (
        <div className="App">
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

export default App;
