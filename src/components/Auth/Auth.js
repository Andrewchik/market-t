import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UALContext} from "ual-reactjs-renderer";
import { IconButton } from '@material-ui/core';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import * as fcl from "@onflow/fcl";



import CustomButton from "../../generics/CustomButton/CustomButton";

import './Auth.scss';

import {
    AUTH_LOGOUT_SUCCESS,
    USER_ITEMS_IDS_SUCCESS,
    OPEN_CONNECTION_WALLET_POPUP,
    OPEN_BALANCES_POPUP,
} from "../../constants";


export default function Auth({ handleRedirect, loggedIn, setLoggedIn, metamask, setMetamask }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { activeUser, logout } = useContext(UALContext);

    const user = useSelector(({ auth }) => auth.auth);


    const shortEthAddres = () => {
        let address = metamask.address
    
        if (typeof address === "string")
            return "0x" + address.substring(0, 4) + "..." + address.substring(36);
    }

    useEffect(() => {
        const metamaskFromStorage = localStorage.getItem('metamask');
        if (metamaskFromStorage) {
            const parsedMetamask = JSON.parse(metamaskFromStorage);
            const address = parsedMetamask;
            setMetamask(address);

            setLoggedIn(true)
        }
    }, [setLoggedIn, setMetamask]);

    const sighOutFromMetamask = () => {
        localStorage.removeItem('metamask');
        setLoggedIn(false);
        setMetamask({})
    
        history.push('/');
    }

    const sighOutFromWAX = () => {
        logout();

        history.push('/');
    }

    const openSignInModal = () => {
        dispatch({
            type: OPEN_CONNECTION_WALLET_POPUP
        });
    }

    const openBalancesModal = () => {
        dispatch({
            type: OPEN_BALANCES_POPUP
        });
    }

    const sighOut = () => {
        fcl.unauthenticate();

        dispatch({
            type: AUTH_LOGOUT_SUCCESS
        });

        dispatch({
            type: USER_ITEMS_IDS_SUCCESS,
            payload: []
        });

        history.push('/');
    }

    if (user && user.address) {
        return (
            <div className="user-info">
                <p onClick={() => handleRedirect(`/profile/${user.address}`)}>{ user.address }</p>
                <CustomButton
                    text={'Sign Out'}
                    onClick={ sighOut }
                />
            </div>
        );
    }

    if (loggedIn) {
        return (
            <div className="user-info">
                <IconButton color="primary" component="label">
                    <AccountBalanceWalletIcon onClick={openBalancesModal}/>
                </IconButton>
                <p onClick={() => handleRedirect(`/profile/${metamask.address}`)}>{ shortEthAddres() }</p>
                <CustomButton
                    text={'Sign Out'}
                    onClick={ sighOutFromMetamask }
                />
            </div>
        );
    }

    if (activeUser) {
        return (
            <div className="user-info">
                <p onClick={() => handleRedirect(`/profile/${activeUser.accountName}`)}>{ activeUser.accountName }</p>
                <CustomButton
                    text={'Sign Out'}
                    onClick={ sighOutFromWAX }
                />
            </div>
        );
    }

    return (
        <div className="sign-in">
            <CustomButton
                text={'Connect wallet'}
                onClick={ openSignInModal }
            />
        </div>
    );
}
