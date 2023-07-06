import axios from "axios";

//WARNING: check healthy endpoints on https://tools.ledgerwise.io
const ATOMIC_API_ENDPOINTS = process.env.REACT_APP_MAINNET === "mainnet"
    ? [
        'https://aa.dapplica.io/atomicassets/v1',
        // 'https://aa.dapplica.io/atomicassets/v1',
        'https://atomic2.hivebp.io/atomicassets/v1',
        'https://wax.hkeos.com/aa/atomicassets/v1',
        'https://wax-atomic-api.eosphere.io/atomicassets/v1',
        'https://aa.wax.blacklusion.io/atomicassets/v1',
        'https://api.wax-aa.bountyblok.io/atomicassets/v1',
        'https://wax-aa.eosdublin.io/atomicassets/v1',
        'https://atomic.wax.eosrio.io/atomicassets/v1',
        'https://wax-atomic.wizardsguild.one/atomicassets/v1',
        'https://atomic.hivebp.io/atomicassets/v1',
        'https://wax-aa.eu.eosamsterdam.net/atomicassets/v1',
        'https://atomic.ledgerwise.io/atomicassets/v1',
        'https://api.atomic.greeneosio.com/atomicassets/v1',
        'https://atomic.sentnl.io/atomicassets/v1',
        'https://api-wax-aa.eosarabia.net/atomicassets/v1',
        'https://aa-api-wax.eosauthority.com/atomicassets/v1',
        'https://atomic.tokengamer.io/atomicassets/v1',
        'https://wax-atomic.eosiomadrid.io/atomicassets/v1',
        'https://api.wax.liquidstudios.io/atomicassets/v1',
        'https://atomic.3dkrender.com/atomicassets/v1',
    ]
    : ['https://test.wax.api.atomicassets.io/atomicassets/v1'];

let currentAtomicApiEndpoint = ATOMIC_API_ENDPOINTS[0];

const reinitializeAtomicApi = () => {
    const nextEndpoint = ATOMIC_API_ENDPOINTS[ATOMIC_API_ENDPOINTS.indexOf(currentAtomicApiEndpoint) + 1];

    if (!nextEndpoint)
        return null;

    currentAtomicApiEndpoint = nextEndpoint ? nextEndpoint : ATOMIC_API_ENDPOINTS[0];

    return nextEndpoint;
};

export const getDataFromAtomicApi = async (path) => {
    try {
        const {
            data: { data }
        } = await axios.get(`${currentAtomicApiEndpoint}/${path}`);

        return data;
    } catch (e) {
        if (e.message === 'Network Error' || (e.response && Number(e.response.status) >= 500 || Number(e.response.status) === 429 || Number(e.response.status) >= 416)) {

            const newEndpoint = reinitializeAtomicApi();

            if (!newEndpoint)
                throw new Error('NetworkError!');

            return await getDataFromAtomicApi(path);
        }

        throw new Error(e.message);
    }
};
