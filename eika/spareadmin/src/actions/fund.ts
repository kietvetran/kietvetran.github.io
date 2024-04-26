import * as request from '@eika-infrastruktur/request';
import { Dispatch } from 'redux';

import { SERVICE_PATH } from './index';
import { FundInfo } from '../generated-types.d';

const SET_FUND_LIST = 'SET_FUND_LIST';

/******************************************************************************
******************************************************************************/
export const getFundList = (): any => async (dispatch: Dispatch) => {
    let result: any = null;
    const url = `${SERVICE_PATH}/funds`;
    try {
        result = await request.get(url);
    } catch (error) {
        result = null;
    }

    if ( result ) {
        result = result.sort( (a: FundInfo, b: FundInfo) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;            
        });
    }

    return dispatch({ type: SET_FUND_LIST, data: result });
};

/******************************************************************************
******************************************************************************/
export interface AppReducer {
    list?: null | FundInfo[];
};

const initialState: AppReducer = {};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_FUND_LIST:
            return {...state, list: action.data };
        default:
            return state;
    }
};
