import React, { useState, useContext } from 'react';
import { getDateDifference, toHexColor } from '../util';
import pin_outline from '../assets/pin-outline.svg'; 
import pin_filled from '../assets/pin-filled.svg'; 
import trash from '../assets/trash.svg'; 
import { Icon } from "semantic-ui-react";
import { AuthContext } from "../App";

function Post(props) {
    const { state, dispatch } = useContext(AuthContext);
    const [ isHovered, setIsHovered ] = useState(false);
    const isPinned = props.pinnedPosts.has(props._id);
    
    
    const deletePost = async () => {
        try {
            const id = props._id;
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE'
            });
            if(res.status === 200) {
                dispatch({
                    type: 'DELETE_POST',
                    payload: {id: id}
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
    const pinPost = async () => {
        /**
         * Update passed pin to be opposite of its current pin state
         */
        const updatedPins = isPinned 
            ? state.dbUser.pinnedPosts.filter(_id =>  _id !== props._id)
            : state.dbUser.pinnedPosts.concat(props._id)
        const body = {
            pinnedPosts: updatedPins,
        }
        const res = await fetch(`/api/users/${state.dbUser.username}/pins`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(body),
        });
        const updatedUser = await res.json();
        dispatch({
            type: 'UPDATE_PINS',
            payload: updatedPins,
        });
    }

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
                    {"url" in props.content 
                        && (
                        <>
                            &#128279;  
                            <a href={props.content.url} target="_blank" rel="noopener noreferrer">
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
                <a href={`https://www.youtube.com/watch?v=${props.content.id}`} target="_blank" rel="noopener noreferrer">
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
                    <div className='post-body_content-bio'>
                        <ContactInfo 
                            icon={'user'} 
                            text={`${props.content.username} | ${props.content.pod}`}
                        />
                        <ContactInfo 
                            icon={'mail'} 
                            text={props.content.mail}
                        />
                        <ContactInfo icon={'location arrow'} text={props.content.location}/>
                        <span>{props.content.bio}</span>
                        <a href={props.content.github_url}>&#128279; Github Profile</a>
                    </div>
                </div>
            );
            break;
        default:
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
        >   {(isHovered) && (props.creator === state.dbUser.username || props.creator === "server") &&(
                <img
                    onClick={deletePost}
                    className='post-delete'
                    src={trash}
                    alt={'trash-can'}
                />
            )}
            {(isHovered || isPinned) && (
                <img 
                    onClick={pinPost}
                    className='post-pin' 
                    src={isPinned ? pin_filled : pin_outline}
                    width='25px'
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
        <div className={`contact-info ${icon === 'user' ? 'name' : ''}`}>
            <Icon name={icon}/>
            {text}
        </div>
    );
}