import { toast } from "react-toastify";

import { NO_ITEM_WITH_THAT_ID, ITEM_IS_NOT_AVAILABLE_FOR_PURCHASE } from "../constants";

//TODO: add more custom errors here
export const showErrorMessage = (e) => {
    if (e && e.toString().includes(NO_ITEM_WITH_THAT_ID))
        return toast.error(ITEM_IS_NOT_AVAILABLE_FOR_PURCHASE);

    toast.error(e);
}
