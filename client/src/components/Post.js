import React, { useState } from 'react';
import { getDateDifference, toHexColor } from '../util';
import pin_outline from '../assets/pin-outline.svg'; 
import pin_filled from '../assets/pin-filled.svg'; 

function Post(props) {
    const [ isPinned, setIsPinned ] = useState(false); // MADE INTO A STATE FOR TESTING
    const [ isHovered, setIsHovered ] = useState(isPinned);

    let content;
    const { type } = props;
    switch(type.toLowerCase()) {
        case "discord":
        case "text":
            let thumbnail;
            if (type === 'discord') {
                thumbnail = (
                    <img
                        src={props.content.thumbnail.url}
                        className='post-body_thumbnail'
                    />
                );
            }
            content = (
            <>
                <div className='post-body_content text'>
                    {"link" in props.content 
                        && (
                        <>
                            &#128279;  
                            <a href={props.content.url} target="_blank">
                                Resource 
                            </a>
                        </>
                    )}
                    <p>
                        {props.content.description}
                    </p>
                </div>
                {thumbnail}
            </>
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
        case "contacts":
            content = (
                <div className='post-body_content contacts'>
                    <img
                        className='post-body_content-avatar'
                        src={props.content.avatar}
                        alt='Avatar'
                    />
                    <ContactInfo icon={'user'} text={`${props.content.username} | ${props.content.pod}`}/>
                    <ContactInfo icon={'mail'} text={props.content.mail}/>
                    <ContactInfo icon={'location arrow'} text={props.content.location}/>
                    <p>{props.content.bio}</p>
                    <a href={props.content.github_url}>&#128279;</a>
                </div>
            );
            break;
        default:
            break; // TODO: account for discord
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
                    {props.type !== 'contacts'
                        &&
                    (<label className='creator'>
                        Shared by {props.creator === 'server' ? 'Team GARY': props.creator}
                    </label>)
                    }
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


function ContactInfo(props) {
    const { icon, text } = props;
    if (!text) {
        return <></>;
    }
    
    return (
        <div className='contact-info'>
            {text}
        </div>
    );
}