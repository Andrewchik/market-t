import {
    USER_ITEMS_IDS_REQUEST,
    USER_ITEMS_IDS_SUCCESS,
    USER_ITEMS_IDS_FAIL,
    USER_ITEMS_IMX
} from '../constants';

const initialState = {
    userItems: [],
    userImxItems: [],
    loading: false
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_ITEMS_IDS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case USER_ITEMS_IDS_SUCCESS:
            return {
                ...state,
                loading: false,
                userItems: action.payload
            };

        case USER_ITEMS_IDS_FAIL:
            return {
                ...state,
                loading: false,
                userItems: []
            };

        case USER_ITEMS_IMX:
            return {
                ...state,
                userImxItems: action.payload
            };

        default:
            return state;
    }
}
