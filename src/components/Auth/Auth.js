import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as fcl from "@onflow/fcl";

import axios from "axios";

import CustomButton from "../../generics/CustomButton/CustomButton";

import './Auth.scss';

import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT_SUCCESS,
    USER_ITEMS_IDS_REQUEST,
    USER_ITEMS_IDS_SUCCESS,
    MARKET_USER_API
} from "../../constants";

export default function Auth({ handleRedirect }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(({ auth }) => auth.auth);

    const [processing, setProcessing] = useState(false);

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

    const signIn = () => fcl.authenticate();

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

    return (
        <div className="sign-in">
            <CustomButton
                text={'Connect wallet'}
                onClick={ signIn }
            />
        </div>
    );
}
