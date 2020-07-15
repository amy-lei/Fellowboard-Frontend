import React, { useState } from 'react';
import { getDateDifference, toHexColor } from '../util';
import pin_outline from '../assets/pin-outline.svg'; 
import pin_filled from '../assets/pin-filled.svg'; 

function Post(props) {
    const [ isPinned, setIsPinned ] = useState(false); // MADE INTO A STATE FOR TESTING
    const [ isHovered, setIsHovered ] = useState(isPinned);

    let content;
    switch(props.type) {
        case "text":
            content = (
                <div className='post-body_content text'>
                    {"link" in props.content 
                        && (
                        <>
                            &#128279;  
                            <a href={props.content.link} target="_blank">
                                Resource 
                            </a>
                        </>
                    )}
                    <p>
                        {props.content.description}
                    </p>
                </div>
            )
            break;
        case "youtube":
            content = (
            <div className='post-body_content youtube'>
                <a href={`https://www.youtube.com/watch?v=${props.content.id}`} target="_blank">
                    &#128279;  
                    Video link
                </a>
                <img 
                    className='post-body_thumbnail' 
                    src={props.content.thumbnails.url}
                /> 
            </div>
            );
            break;
    }

    const tags = props.tags.map((tag, i) => 
        <span 
            key={i}
            className='tag' 
            style={{backgroundColor: toHexColor(tag)}}
        >
            {`#${tag}`}
        </span>
    );

    let timestamp;
    const numDays = getDateDifference(props.timestamp);
    if (numDays === 0) {
        timestamp = "today";
    } else if (numDays === 1) {
        timestamp = "yesterday";
    } else {
        timestamp = numDays + " days ago";
    }

    return (
        <div 
            className='post'
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {(isHovered || isPinned) && (
                <img 
                    onClick={() => setIsPinned(!isPinned)}
                    className='post-pin' 
                    src={isPinned ? pin_filled : pin_outline}
                />
            )}
            <section className='post-body'>
                <div className='post-body_header'>
                    <h3 className='title'>
                        {props.title}
                    </h3>
                    <label className='creator'>
                        Shared by {props.creator}
                    </label>
                    <label className='time'>
                        Posted {timestamp}
                    </label>
                </div>
                {content}
            </section>
            <section className='post-tags'>
                {tags}
            </section>
        </div>
    )
}

export default Post;


