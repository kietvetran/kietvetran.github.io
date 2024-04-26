
import { combineReducers } from 'redux';

import app from '../actions/app';
import issue from '../actions/issue';
import epk from '../actions/epk';
import fund from '../actions/fund';

const rootReducer = combineReducers({
    app,
    issue,
    epk,
    fund,
});

export type ReducerState = ReturnType<typeof rootReducer>;
export default rootReducer;
