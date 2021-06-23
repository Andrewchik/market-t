import {
    USER_ITEMS_IDS_REQUEST,
    USER_ITEMS_IDS_SUCCESS,
    USER_ITEMS_IDS_FAIL
} from '../constants';

const initialState = {
    userItems: [],
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

        default:
            return state;
    }
}
