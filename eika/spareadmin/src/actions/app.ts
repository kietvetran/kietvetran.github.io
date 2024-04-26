import * as request from '@eika-infrastruktur/request';
import { Dispatch } from 'redux';

import { SERVICE_PATH } from './index';
import { Message, SpareadminRaadgiver, Bank } from '../generated-types.d';
import Constant from '../static/data/Constant';

const SET_ADVISOR = 'SET_ADVISOR';
const SET_SERVICE_MESSAGE = 'SET_SERVICE_MESSAGE';
const SET_BANK_LIST = 'SET_BANK_LIST';

/******************************************************************************
******************************************************************************/
export const getBankList = () => async (dispatch: Dispatch) => {
    let result: null | Bank[] = null;
    const url = `${SERVICE_PATH}/banker`;
    try {
        result = await request.get(url);
    } catch ( error ) {
        result = null;
    }

    if ( Constant.dictionary && result ) {
        result.forEach( (bank: Bank) => {
            Constant.dictionary[bank.bankregnr.value] = bank.navn;
        });
    }

    return dispatch({ type: SET_BANK_LIST, data: result });
};

/******************************************************************************
******************************************************************************/
export const getServiceMessage = () => async (dispatch: Dispatch) => {
    let result = null;
    const url = `${SERVICE_PATH}/messages`;
    try {
        result = await request.get(url);
    } catch ( error ) {
        result = null;
    }

    return dispatch({ type: SET_SERVICE_MESSAGE, data: result });
};

/******************************************************************************
******************************************************************************/
export const getAdvisor = () => async (dispatch: Dispatch) => {
    let result = null;
    const url = `${SERVICE_PATH}/raadgiver`;
    try {
        result = await request.get(url);
    } catch ( error ) {
        result = null;
    }

    return dispatch({ type: SET_ADVISOR, data: result });
};

/******************************************************************************
******************************************************************************/
export interface AppReducer {
    advisor?: null | SpareadminRaadgiver;
    appMessage?: null | Message[];
    bankList?: Bank[];
};

const initialState: AppReducer = {};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_ADVISOR:
            return {...state, advisor: action.data };
        case SET_SERVICE_MESSAGE:
            return {...state, appMessage: action.data};
        case SET_BANK_LIST:
            return {...state, bankList: action.data };
        default:
            return state;
    }
};
