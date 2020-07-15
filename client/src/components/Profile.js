import React, { useState } from 'react';
import save from '../assets/save.svg';
import edit from '../assets/edit.svg';
import cancel from '../assets/cancel.svg';

function Profile(props) {
    const [ value, setValue ] = useState(props.discord || "");
    const [ editting, setEditting ] = useState(false);

    const discord = (
        <span className='profile-discord'>
            {editting 
                ? (<>
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Set discord username"
                        className="profile-discord_input"
                    />
                    <img
                        src={save}
                        onClick={()=> {alert("saved discord username"); setEditting(false)}}
                    />
                    <img
                        src={cancel}
                        onClick={()=> setEditting(false)}
                    />
                    </>
                ) : (
                    <>
                    <label
                        value={value}
                        className="profile-discord_input"
                    >
                        {props.discord || "Set discord username"}
                    </label>
                    <img
                        src={edit}
                        onClick={()=> setEditting(true)}
                    />

                    </>
                )
            }
        </span>
    );
     

    return (
        <div className='profile'>
            <div className='profile-avatar'></div>
            <section>
                <h2 className='profile-name'>
                    {props.fullname || props.username}
                </h2>
                {discord}
            </section>  
        </div>
    )
}

export default Profile;