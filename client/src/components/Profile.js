import React, { useState } from 'react';

function Profile(props) {
    return (
        <div className='profile'>
            <div className='profile-avatar'></div>
            <section>
                <h2 className='profile-name'>
                    {props.fullname || props.username}
                </h2>
                <span className='profile-discord'>
                    {props.discord || "Please enter your discord username"}
                </span>
            </section>  
        </div>
    )
}

export default Profile;