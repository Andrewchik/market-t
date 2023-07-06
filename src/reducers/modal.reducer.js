import {
    OPEN_SUCCESS_PURCHASE_POPUP,
    HIDE_SUCCESS_PURCHASE_POPUP,
    OPEN_TERMS_AND_CONDITION_POPUP,
    HIDE_TERMS_AND_CONDITION_POPUP,
    OPEN_CONNECTION_WALLET_POPUP,
    HIDE_CONNECTION_WALLET_POPUP,
    OPEN_BALANCES_POPUP,
    HIDE_BALANCES_POPUP
} from '../constants';

const initialState = {
    openSuccessPurchasePopup: false,
    openTermsAndConditionModal: false,
    openConnectWalletModal: false,
    openBalancesModal: false
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

        case OPEN_CONNECTION_WALLET_POPUP:
            return {
                ...state,
                openConnectWalletModal: true
            };

        case HIDE_CONNECTION_WALLET_POPUP:
            return {
                ...state,
                openConnectWalletModal: false
            };

        case OPEN_BALANCES_POPUP:
            return {
                ...state,
                openBalancesModal: true
            };

        case HIDE_BALANCES_POPUP:
            return {
                ...state,
                openBalancesModal: false
            };

        default:
            return state;
    }
}
