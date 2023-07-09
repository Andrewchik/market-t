import {
    CONFIG,
} from '../constants';

const initialState = {
    config: {},
};

export default function config(state = initialState, action) {
    switch (action.type) {
        case CONFIG:
            return {
                ...state,
                loading: false,
                config: action.payload
            };

        default:
            return state;
    }
}
