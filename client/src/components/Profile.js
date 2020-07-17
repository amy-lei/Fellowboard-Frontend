import React, { useState, useContext } from 'react';
import save from '../assets/save.svg';
import edit from '../assets/edit.svg';
import cancel from '../assets/cancel.svg';
import { AuthContext } from '../App';

function Profile(props) {
    const {state, dispatch} = useContext(AuthContext);
    const [ value, setValue ] = useState(props.discord || "");
    const [ editting, setEditting ] = useState(false);

    
    const setDiscordUsername = async (username) => {
        try {
            const body = {
                "discord": username
            };
            const res = await fetch(`/api/users/${state.dbUser.username}`, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (res.status === 200) {
                setEditting(false);
                setValue(username);
                dispatch({
                    type: 'UPDATE_DISCORD',
                    payload: {discord: username}
                });
            }
            
        } catch (err) {
            console.log(err);
        }     
    }


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
                        onClick={async () => setDiscordUsername(value)}
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
            <div className='profile-avatar'>
                <img className='profile-avatar-img' src={props.avatarUrl} alt=''/>
            </div>
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