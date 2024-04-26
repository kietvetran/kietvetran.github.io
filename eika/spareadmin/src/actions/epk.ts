import * as request from '@eika-infrastruktur/request';
import { Dispatch } from 'redux';

import { SERVICE_PATH } from './index';
import { GetEpkPkbPensionInfoResponse } from '../generated-types.d';
import { NotificationsRequestExtension, NotificationResult } from '../domain/types';

const SET_EPK_PERSON_INFO = 'SET_EPK_PERSON_INFO';
const SET_EPK_NOTIFICATION = 'SET_EPK_NOTIFICATION';
const SET_EPK_NOTIFICATION_FINALIZE = 'SET_EPK_NOTIFICATION_FINALIZE';

/******************************************************************************
******************************************************************************/
export const getEPKpersonInfo = ( fnr: string, callback?: (r: null | GetEpkPkbPensionInfoResponse) => void ): any => async (dispatch: Dispatch) => {
    let result: null | GetEpkPkbPensionInfoResponse = null;
    const url = `${SERVICE_PATH}/epk/person/`;
    const data = {value: fnr};
    try {
        result = await request.post(url, data).then((response: any) => {
            return response || null;
        }).catch(() =>  null );
    } catch (error) {
        result = null;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_EPK_PERSON_INFO, data: result });
};

export const setEPKpersonInfo = ( data?: null | GetEpkPkbPensionInfoResponse ) => async (dispatch: Dispatch) => {
    dispatch({ type: SET_EPK_PERSON_INFO, data });
};

/******************************************************************************
******************************************************************************/
export const getEPKnotification = ( data: NotificationsRequestExtension, callback?: (r: null | NotificationResult) => void ): any => async (dispatch: Dispatch) => {
    let result: null | NotificationResult = null;
    const { pageNumber, pageSize, ...rest } = data;
    const url = `${SERVICE_PATH}/epk/notification/pageNumber/${pageNumber}/pageSize/${pageSize}`;
    try {
        result = await request.post(url, rest).then((response: any) => {
            return response || null;
        }).catch(() =>  null );
    } catch (error) {
        result = null;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_EPK_NOTIFICATION, data: result });
};

export const setEPKnotification = ( data?: null | NotificationResult ) => async (dispatch: Dispatch) => {
    dispatch({ type: SET_EPK_NOTIFICATION, data });
};

/******************************************************************************
******************************************************************************/
export const postEPKnotificationFinalize = ( data: {notificationId: number}, callback?: (r: boolean) => void ): any => async (dispatch: Dispatch) => {
    let result = false;
    const url = `${SERVICE_PATH}/epk/notification/finalize`;
    try {
        result = await request.post(url, data).then(() => {
            return true;
        }).catch(() => false );
    } catch (error) {
        result = false;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_EPK_NOTIFICATION_FINALIZE, data: result });
};

/******************************************************************************
******************************************************************************/
export interface AppReducer {
    person?: null | GetEpkPkbPensionInfoResponse;
    notification?: null | Notification[];
    finalize?: boolean;
};

const initialState: AppReducer = {};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_EPK_PERSON_INFO:
            return {...state, person: action.data };
        case SET_EPK_NOTIFICATION:
            return {...state, notification: action.data };            
        case SET_EPK_NOTIFICATION_FINALIZE:
            return {...state, finalize: action.data };            
        default:
            return state;
    }
};
