import { call, all } from "redux-saga/effects";

import { userSagas } from './user.saga';

export function* sagas() {
    yield all([
        call(userSagas)
    ]);
}
