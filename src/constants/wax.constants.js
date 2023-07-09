// //MAINNET
export const WAX_CHAIN_ID_MAINNET = '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4';
export const WAX_RPC_ENDPOINTS_HOST_MAINNET = "wax.cryptolions.io";
export const WAX_RPC_ENDPOINTS_PROTOCOL_MAINNET = "https";

//TESTNET
export const WAX_CHAIN_ID_TESTNET = 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12';
export const WAX_RPC_ENDPOINTS_HOST_TESTNET = "testnet.waxsweden.org";
export const WAX_RPC_ENDPOINTS_PROTOCOL_TESTNET = "https";

// //choose endpoints based on REACT_APP_MAINNET value
const WAX_CHAIN_ID = process.env.REACT_APP_MAINNET === 'mainnet' ? WAX_CHAIN_ID_MAINNET : WAX_CHAIN_ID_TESTNET;
const WAX_RPC_ENDPOINTS_HOST = process.env.REACT_APP_MAINNET === 'mainnet' ? WAX_RPC_ENDPOINTS_HOST_MAINNET : WAX_RPC_ENDPOINTS_HOST_TESTNET;
const WAX_RPC_ENDPOINTS_PROTOCOL = process.env.REACT_APP_MAINNET === 'mainnet' ? WAX_RPC_ENDPOINTS_PROTOCOL_MAINNET : WAX_RPC_ENDPOINTS_PROTOCOL_TESTNET;

export { WAX_CHAIN_ID, WAX_RPC_ENDPOINTS_HOST, WAX_RPC_ENDPOINTS_PROTOCOL };



export const ATOMIC_ASSETS_API_MAINNET = 'https://wax.api.atomicassets.io/atomicassets/v1';
export const ATOMIC_ASSETS_API_TESTNET = 'https://test.wax.api.atomicassets.io/atomicassets/v1';

//choose API endpoint based on REACT_APP_MAINNET value
export const ATOMIC_ASSETS_API = process.env.REACT_APP_MAINNET === 'mainnet' ? ATOMIC_ASSETS_API_MAINNET : ATOMIC_ASSETS_API_TESTNET;

export const NEWMARKETNEW_CONTRACT = 'darkmarketdc' //atomicmarket // newmarketnew
export const EOSIO_TOKEN ='eosio.token';
export const EOSIO ='eosio';

// Dolar
// export const DELPHI_ORACLE = 'delphioracle';
export const ATOMIC_ASSETS ='atomicassets';

export const CONFIG = 'CONFIG';
