import {
    OPEN_SUCCESS_PURCHASE_POPUP,
    HIDE_SUCCESS_PURCHASE_POPUP,
    OPEN_TERMS_AND_CONDITION_POPUP,
    HIDE_TERMS_AND_CONDITION_POPUP
} from '../constants';

const initialState = {
    openSuccessPurchasePopup: false,
    openTermsAndConditionModal: false
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

        case OPEN_TERMS_AND_CONDITION_POPUP:
            return {
                ...state,
                openTermsAndConditionModal: true
            };

        case HIDE_TERMS_AND_CONDITION_POPUP:
            return {
                ...state,
                openTermsAndConditionModal: false
            };

        default:
            return state;
    }
}
