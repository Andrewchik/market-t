import { toast } from "react-toastify";

import {
    NO_ITEM_WITH_THAT_ID,
    ITEM_IS_NOT_AVAILABLE_FOR_PURCHASE,
    NOT_ENOUGH_BALANCE,
    UNABLE_TO_SIGN_TRANSACTION,
    TRANSACTION_WAS_EXECUTING,
    TRANSACTION_EXPIRED,
    BILLED_CPU,
    NO_RAM,
    NO_BALANCE, NO_BALANCE_SDM, ITEM_ANNOUNCED
} from "../constants";

//TODO: add more custom errors here
export const showErrorMessage = (e) => {

    if (e && e.toString().includes(NO_ITEM_WITH_THAT_ID))
        return toast.error(ITEM_IS_NOT_AVAILABLE_FOR_PURCHASE);

    if (e && e.toString().includes(NOT_ENOUGH_BALANCE))
        return toast.error(NOT_ENOUGH_BALANCE);

    if (e && e.toString().includes(UNABLE_TO_SIGN_TRANSACTION))
        return toast.error(UNABLE_TO_SIGN_TRANSACTION);

    if (e && e.toString().includes(TRANSACTION_WAS_EXECUTING))
        return toast.error(TRANSACTION_WAS_EXECUTING);
        
    if (e && e.toString().includes(TRANSACTION_EXPIRED))
        return toast.error(TRANSACTION_EXPIRED);
        
    if (e && e.toString().includes(BILLED_CPU))
        return toast.warning('To continue buy more CPU');

    if (e && e.toString().includes(NO_RAM))
        return toast.warning('You need more RAM');

    if (e && e.toString().includes(NO_BALANCE))
        return toast.error(NO_BALANCE);

    if (e && e.toString().includes(NO_BALANCE_SDM))
        return toast.error('No balance');

    if (e && e.toString().includes(ITEM_ANNOUNCED))
        return toast.error('Item announced');

    toast.error(e);
}
