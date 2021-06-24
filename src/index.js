import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducers } from './reducers';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import { sagas } from './sagas';
import createSagaMiddleware from "redux-saga";

import reportWebVitals from './reportWebVitals';

import * as fcl from "@onflow/fcl";

import App from './App';

import './styles/index.scss'
import './styles/fonts/Saira_SemiExpanded-Regular.ttf';
import './styles/fonts/Saira_SemiExpanded-SemiBold.ttf';

//TESTNET
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn")

// //MAINNET
// fcl.config()
//     .put("accessNode.api", "https://access-mainnet-beta.onflow.org")
//     .put("challenge.handshake", "https://flow-wallet.blocto.app/authn")

const saga = createSagaMiddleware();

const middleware = process.env.NODE_ENV === "development" ? [saga, logger] : [saga];

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

saga.run(sagas);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
