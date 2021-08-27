import { toast } from "react-toastify";

import {
    NO_ITEM_WITH_THAT_ID,
    ITEM_IS_NOT_AVAILABLE_FOR_PURCHASE,
    NOT_ENOUGH_BALANCE
} from "../constants";

//test for commit

//TODO: add more custom errors here
export const showErrorMessage = (e) => {
    if (e && e.toString().includes(NO_ITEM_WITH_THAT_ID))
        return toast.error(ITEM_IS_NOT_AVAILABLE_FOR_PURCHASE);

    if (e && e.toString().includes(NOT_ENOUGH_BALANCE))
        return toast.error(NOT_ENOUGH_BALANCE);

    toast.error(e);
}
