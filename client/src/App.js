import React, { useEffect } from 'react';
import { POSTS } from './FAKE_DATA';
import Post from './components/post';
import './styles/App.scss';
import Masonry from "react-masonry-css";
import { masonryBreakpoints } from "./constants";

function App() {
    return (
        <div className="App">
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
