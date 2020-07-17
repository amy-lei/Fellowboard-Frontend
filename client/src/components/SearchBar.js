import React, { useState, useEffect, useRef } from 'react';
import search from '../assets/search.svg';

function SearchBar(props) {
    const scrollRef = useRef(null);
    const [ inputValue, setInputValue ] = useState("");

    const handleScroll = () => {
        const position = window.pageYOffset;
        if (position < 300) {
            scrollRef.current.className = 'search';
        } else if (position >= 100) {
            scrollRef.current.className = 'search fixed';
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOnChange = (e) => {
        // TODO: perhaps break at new tags? actually use query?
        setInputValue(e.target.value);
    }


    return (
        <div ref={scrollRef} className='search'>
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