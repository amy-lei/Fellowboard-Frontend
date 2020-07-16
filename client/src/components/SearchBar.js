import React, { useState } from 'react';
import search from '../assets/search.svg';
import { toHexColor } from '../util';

function SearchBar(props) {
    const [ inputValue, setInputValue ] = useState("");
    const [ query, setQuery ] = useState([]);

    const handleOnChange = (e) => {
        // TODO: perhaps break at new tags? actually use query?
        setInputValue(e.target.value);
    }

    const tags = query.map((tag, i) => {
        const text = tag.substring(1);
        return (
            <span 
                key={i}
                className='tag' 
                style={{backgroundColor: toHexColor(text)}}
            >
                {tag}
            </span>
        );
    });

    return (
        <div className='search'>
            {tags}
            <input
                value={inputValue}
                placeholder="Search by title or by tags by prepending #..."
                onChange={handleOnChange}
                onKeyUp={() => props.setFilter(inputValue)}
            />
            <img 
                src={search}
                className='search-btn'
                onClick={() => props.setFilter(inputValue)}
            />
        </div>
    )
}

export default SearchBar;