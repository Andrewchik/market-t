import { call, put, all, takeLatest } from "redux-saga/effects";

import { USER_ITEMS_IDS_FAIL, USER_ITEMS_IDS_REQUEST, USER_ITEMS_IDS_SUCCESS } from "../constants";
import { readCollectionIds } from "../flow";

export function* requestUserItemsIds(action) {
    try {
        const response = yield call(readCollectionIds, action.payload);

        yield put({
            type: USER_ITEMS_IDS_SUCCESS,
            payload: response
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: USER_ITEMS_IDS_FAIL,
            payload: []
        });
    }
}

export function* requestUserItemsIdsSaga() {
    yield takeLatest(USER_ITEMS_IDS_REQUEST, requestUserItemsIds);
}

export function* userSagas() {
    yield all([
        call(requestUserItemsIdsSaga)
    ]);
}
