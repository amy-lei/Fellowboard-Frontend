import React, { useEffect } from 'react';
import './App.css';

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
        Hello World!
        </div>
    );
}

export default App;
