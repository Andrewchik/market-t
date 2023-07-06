import { Anchor } from "ual-anchor";
import { Wax } from "@eosdacio/ual-wax";

import {
    WAX_CHAIN_ID,
    WAX_RPC_ENDPOINTS_HOST,
    WAX_RPC_ENDPOINTS_PROTOCOL,
} from "../constants";


export const waxChain = {
    chainId: WAX_CHAIN_ID,
    rpcEndpoints: [
        {
            protocol: WAX_RPC_ENDPOINTS_PROTOCOL,
            host: WAX_RPC_ENDPOINTS_HOST,
            port: "",
        },
    ],
};


const anchor = new Anchor([waxChain], { appName: "TopExpo" });
const waxCloudWallet = new Wax([waxChain], { appName: "TopExpo" });

export const waxAuthenticators =
    process.env.REACT_APP_MAINNET === "mainnet"
        ? [waxCloudWallet, anchor]
        : [waxCloudWallet, anchor];
