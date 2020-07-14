import React, { useEffect } from 'react';
import { POSTS } from './FAKE_DATA';
import Post from './components/post';
import './styles/App.scss';

function App() {
    // testing
    useEffect(() => {
        fetch("/api/")
        .then(res => res.json())
        .then(body => console.log(body))
        .catch(err => console.log(err));
    });
    return (
        <div className="App">
            {POSTS.map(post => <Post {...post} />)}
        </div>
    );
}

export default App;
