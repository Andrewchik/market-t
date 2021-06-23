import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import * as fcl from "@onflow/fcl";

import './Navigation.scss'

import Auth from "../Auth/Auth";

import logo from '../../resources/images/TopExpo_LOGO1_2.png'

function Navigation() {
    const history = useHistory();

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
            <div
                className={`navigation-menu  ${menuOpened ? 'menu-opened' : 'menu-closed'}`}>
                <div className={'navigation-logo'}>
                    <img src={logo} alt="logo" onClick={() => handleRedirect('/')}/>
                </div>
                <div className={'navigation-options'}>
                    <p onClick={ () => handleRedirect('/market') }>Market</p>
                    <p onClick={ user && user.address
                        ? () => handleRedirect(`/profile/${user.address}`)
                        : () => fcl.authenticate()
                    }>My Inventory</p>
                </div>
                <Auth handleRedirect={handleRedirect} />
            </div>
        </div>
    )
}

export default Navigation
