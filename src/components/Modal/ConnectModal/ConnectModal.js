import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as fcl from "@onflow/fcl";

import {UALContext} from "ual-reactjs-renderer";

import Rodal from "rodal";
import "rodal/lib/rodal.css";


import BlocktoLogo from '../../../resources/images/icons/blockto_logo.png'
import MetamaskLogo from '../../../resources/images/icons/metamask_logo.png'
import CloudWalletLogo from '../../../resources/images/logos/Mycloudwallet.png'
import CloudWalletLogo2 from '../../../resources/images/logos/Mycloudwallet_logo.png'
import WaxWalletLogo2 from '../../../resources/images/logos/wax_login.png'
import ArrowBlack from '../../../resources/images/next-black.png'
import ArrowWhite from '../../../resources/images/next-white.png'

import {Link} from "@imtbl/imx-sdk";

import './ConnectModal.scss';
import axios from "axios";
import {AUTH_LOGIN_SUCCESS, MARKET_USER_API, SANDBOX_LINK_URL, USER_ITEMS_IDS_REQUEST} from "../../../constants";




function ConnectModal({ visible, handleClose, setLoggedIn, setMetamask }) {
    const dispatch = useDispatch();
    const { showModal } = useContext(UALContext);
    const user = useSelector(({ auth }) => auth.auth);

    const [metaMaskWallet, setMetaMaskWallet] = useState(false);
    const [processing, setProcessing] = useState(false);

    const linkSetup = async () => {
        const link = new Link(SANDBOX_LINK_URL)
        await link.setup({providerPreference: 'metamask'})
            .then((data) => {
                localStorage.setItem('metamask', JSON.stringify(data))
                handleClose()
                setLoggedIn(true);
                setMetamask(data)
    
                handleClose()
            })
            .catch((error) => {
                console.log(error)
            })
    };

    useEffect(() => {
        const loginUser = (user) => {
            dispatch({
                type: AUTH_LOGIN_SUCCESS,
                payload: user
            });

            dispatch({
                type: USER_ITEMS_IDS_REQUEST,
                payload: { address: user.address }
            });
        };

        const registerUser = (address) => {
            axios.post(MARKET_USER_API, { address })
                .then(({ data }) => loginUser(data))
                .catch(e => console.log(e))
                .finally(() => setProcessing(false));
        };

        fcl.currentUser().subscribe(currentUser => {
            if (currentUser.loggedIn && !user.address && !processing) {
                setProcessing(true);

                axios.get(`${MARKET_USER_API}?address=${currentUser.addr}`)
                    .then(({ data }) => !!!data ? registerUser(currentUser.addr) : loginUser(data))
                    .catch(e => {
                        console.log(e);
                        setProcessing(false);
                    });
            }
        });
    }, [user.address, processing, dispatch]);


    const signIn = () => fcl.authenticate()
        .then(() => {
            handleClose()
        });

    const waxSignIn = async () => {
        try {
            await showModal();
            handleClose();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Rodal
            visible={ visible }
            onClose={ () => {} }
            showCloseButton={ false }
            className="connect-modal-box"
            animation="slideUp"
            duration={ 800 }
            closeOnEsc={ false }
        >
            <div className={ 'connect-modal-wrapper' }>
                <div className="header">
                    <h3>Connect your wallet</h3>
                    <span onClick={handleClose}>X</span>
                </div>
                <div className="main">
                    <div className="blockchain-block blockto" onClick={signIn}>
                        <img className={'icon'} src={BlocktoLogo} alt=""/>
                        <img className={'arrow'} src={ArrowWhite} alt=""/>
                    </div>
                    <div className="blockchain-block cloud" onClick={waxSignIn}>
                        <img className={'icon'} src={WaxWalletLogo2} alt=""/>
                        <p className={'text'}>(Anchor, Cloud Wallet)</p>
                        <img className={'arrow'} src={ArrowBlack} alt=""/>
                    </div>
                    <div className="blockchain-block metamask" onClick={linkSetup}>
                        <img className={'icon'} src={MetamaskLogo} alt=""/>
                        <img className={'arrow'} src={ArrowBlack} alt=""/>
                    </div>
                </div>
            </div>
        </Rodal>
    );
}

export default ConnectModal;
