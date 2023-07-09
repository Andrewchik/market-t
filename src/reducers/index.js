import { combineReducers } from 'redux';

import auth from './auth.reducer';
import modal from './modal.reducer';
import user from './user.reducer';
import config from './config.reducer';

const reducers = combineReducers({
    auth,
    modal,
    user,
    config
});

export { reducers };
