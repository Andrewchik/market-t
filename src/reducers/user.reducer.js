import {
    USER_ITEMS_IDS_REQUEST,
    USER_ITEMS_IDS_SUCCESS,
    USER_ITEMS_IDS_FAIL,
    USER_ITEMS_IMX,
    USER_ITEMS_WAX
} from '../constants';

const initialState = {
    userItems: [],
    userImxItems: [],
    userWaxItems: [],
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

            case USER_ITEMS_WAX:
                return {
                    ...state,
                    userImxItems: action.payload
                };

        default:
            return state;
    }
}
