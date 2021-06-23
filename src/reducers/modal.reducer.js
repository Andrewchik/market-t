import {
    OPEN_SUCCESS_PURCHASE_POPUP,
    HIDE_SUCCESS_PURCHASE_POPUP
} from '../constants';

const initialState = {
    openSuccessPurchasePopup: false
};

export default function modal(state = initialState, action) {
    switch (action.type) {
        case OPEN_SUCCESS_PURCHASE_POPUP:
            return {
                ...state,
                openSuccessPurchasePopup: true
            };

        case HIDE_SUCCESS_PURCHASE_POPUP:
            return {
                ...state,
                openSuccessPurchasePopup: false
            };

        default:
            return state;
    }
}
