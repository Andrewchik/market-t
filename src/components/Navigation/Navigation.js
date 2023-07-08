import React, {useContext, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {useDispatch ,useSelector} from "react-redux";


import './Navigation.scss'

import Auth from "../Auth/Auth";

import logo from '../../resources/images/logos/TopExpo_LOGO1_2.webp'
import {OPEN_CONNECTION_WALLET_POPUP} from "../../constants";
import {UALContext} from "ual-reactjs-renderer";

export default function Navigation({loggedIn, setLoggedIn, metamask, setMetamask}) {
    const { activeUser } = useContext(UALContext);
    const history = useHistory();
    const dispatch = useDispatch()

    const [menuOpened, openMenu] = useState(false);

    const user = useSelector(({ auth }) => auth.auth);

    const handleRedirect = (link) => {
        openMenu(false);
        history.push(link);
    };

    return (
        <div className={`navigation-wrapper`}>
            <div
                className={'mobile-nav-icon'}
                onClick={() => openMenu(!menuOpened)}
            />

            <div className={`navigation-menu  ${menuOpened ? 'menu-opened' : 'menu-closed'}`}>
                <div className={'navigation-logo'}>
                    <Link to={'/'}>
                        <img src={logo} alt="logo" onClick={() => handleRedirect('/')}/>
                    </Link>
                </div>

                <div className={'navigation-options'}>
                    <Link to={activeUser ? '/market?blockchain=WAX' : '/market'}>
                        <p onClick={ () => handleRedirect(activeUser ? '/market?blockchain=WAX' : '/market') }>Market</p>
                    </Link>

                    <p onClick={ (user && user.address) || (metamask && metamask.address) || (activeUser && activeUser.accountName)
                        ? () =>{
                            if (user && user.address)
                                handleRedirect( `/profile/${user.address}`)

                            if (metamask && metamask.address)
                                handleRedirect( `/profile/${metamask.address}`)

                            if (activeUser && activeUser.accountName)
                                handleRedirect( `/profile/${activeUser.accountName}`)
                        }
                        : () => dispatch({type: OPEN_CONNECTION_WALLET_POPUP})
                    }>My Inventory</p>

                </div>

                <Auth handleRedirect={handleRedirect} loggedIn={loggedIn} setLoggedIn={setLoggedIn} metamask={metamask} setMetamask={setMetamask}/>
            </div>
        </div>
    )
}
