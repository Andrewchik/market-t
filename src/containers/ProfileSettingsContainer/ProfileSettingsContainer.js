import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";

import { TextField } from "@material-ui/core";

import './ProfileSettingsContainer.scss';

import CustomButton from '../../generics/CustomButton/CustomButton';
import CustomTextField from "../../generics/CustomTextField/CustomTextField";
import Loader from "../../components/Loader/Loader";

import AvatarPlaceholder from '../../resources/images/avatar_placeholder.png';

import { MARKET_USER_API } from '../../constants';
import { showErrorMessage } from "../../helpers";

function ProfileSettingsContainer() {
    const [settingChosen, chooseSetting] = useState(0);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [ownWebsite, setOwnWebsite] = useState('');
    const [twitter, setTwitter] = useState('');
    const [bio, setBio] = useState('');
    const [avatarLink, setAvatarLink] = useState('');
    const [processing, setProcessing] = useState(false);

    const user = useSelector(({ auth }) => auth.auth);

    useEffect(() => {
        if (user && user.username)
            setUsername(user.username);

        if (user && user.email)
            setEmail(user.email);

        if (user && user.twitter_username)
            setTwitter(user.twitter_username);

        if (user && user.own_website)
            setOwnWebsite(user.own_website);

        if (user && user.bio)
            setBio(user.bio);

        if (user && user.avatar_link)
            setAvatarLink(user.avatar_link);
    }, [user]);

    const handleProfileUpdate = () => {
        setProcessing(true);

        axios.put(MARKET_USER_API, {
            address: user.address,
            username,
            email,
            twitter_username: twitter,
            own_website: ownWebsite,
            bio,
            avatar_link: avatarLink
        })
            .then(() => toast.success('Profile updated!'))
            .catch(e => showErrorMessage(e))
            .finally(() => setProcessing(false));
    };

    return (
        <div className={ 'profile-settings-container' }>
            <h1>Profile settings</h1>
            <div className={ 'settings-wrapper' }>
                {/*<div className={ 'setting-icons' }>*/}
                {/*    <div*/}
                {/*        className={ settingChosen === 0 && 'setting-chosen' }*/}
                {/*        onClick={ () => chooseSetting(0) }*/}
                {/*    >*/}
                {/*        <img src={ userIcon } alt=""/>*/}
                {/*        <a>User info</a>*/}
                {/*    </div>*/}
                {/*</div>*/}
                { settingChosen === 0 &&
                    <form className={ 'settings-form' }>
                        <div className={ 'settings-profile-icon' }>
                            <img src={ AvatarPlaceholder } alt=""/>
                            {/*<input type="file" id={ 'file-input' }/>*/}
                        </div>

                        <p>{ user.address ? user.address : 'walletname' }</p>

                        <div className={ 'settings-fields-wrapper' }>
                            <CustomTextField
                                placeholder={'Username'}
                                value={username}
                                onChange={({ target: { value } }) => setUsername(value)}
                            />
                            <CustomTextField
                                placeholder={'Email'}
                                value={email}
                                onChange={({ target: { value } }) => setEmail(value)}
                            />
                            <CustomTextField
                                placeholder={'Own website(URL)'}
                                value={ownWebsite}
                                onChange={({ target: { value } }) => setOwnWebsite(value)}
                            />
                            <CustomTextField
                                placeholder={'Twitter'}
                                value={twitter}
                                onChange={({ target: { value } }) => setTwitter(value)}
                            />
                            <TextField
                                id="outlined-price-input"
                                type="text"
                                autoComplete="Bio"
                                placeholder="Bio"
                                variant="outlined"
                                multiline
                                value={bio}
                                onChange={({ target: { value } }) => setBio(value)}
                            />
                        </div>

                        { processing
                            ? <Loader />
                            : <CustomButton
                                text={ 'Submit' }
                                onClick={handleProfileUpdate}
                            />
                        }
                    </form>
                }
            </div>
        </div>
    )
}

export default ProfileSettingsContainer
