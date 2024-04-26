import * as request from '@eika-infrastruktur/request';
import { Dispatch } from 'redux';

import { SERVICE_PATH } from './index';
import { StringObject, MultipleObject, IssueActionConfig } from '../domain/types';
import { 
    SparingTilBarnSearchResult, SparingTilBarnStatusResultat, SearchFlags,
    SparingTilBarnKommentar, SparingTilBarnFodselsattest,
} from '../generated-types.d';

const SET_ISSUE_STATUS_COUNT = 'SET_ISSUE_STATUS_COUNT';
const SET_ISSUE_SEARCH_RESULT = 'SET_ISSUE_SEARCH_RESULT';
const SET_ISSUE_COMMENT = 'SET_ISSUE_COMMENT';
const SET_ISSUE_CERTIFICATE = 'SET_ISSUE_CERTIFICATE';
const SET_ISSUE_AML = 'SET_ISSUE_AML';
const SET_ISSUE_ACTION = 'SET_ISSUE_ACTION';

/******************************************************************************
******************************************************************************/
export const getIssueStatusCount = ( data?: SearchFlags ) => async (dispatch: Dispatch) => {
    let result = null;
    const url = `${SERVICE_PATH}/saker/count-by-status`;
    try {
        result = await request.post(url, data).then((response: any) => {
            return response || null;
        }).catch(() =>  null );
    } catch ( error ) {
        result = null;
    }
    
    return dispatch({ type: SET_ISSUE_STATUS_COUNT, data: result });
};

/******************************************************************************
******************************************************************************/
export const getIssueSearchResult = ( data: SearchFlags, callback?: (r: null | SparingTilBarnSearchResult) => void ) => async (dispatch: Dispatch) => {
    let result: null | SparingTilBarnSearchResult = null;
    const url = `${SERVICE_PATH}/saker/search`;

    const search = JSON.parse(JSON.stringify(data));
    ['bankregnrFilter', 'foedselsnummerFilter'].forEach( (key: string) => {
        if ( !search[key as keyof SearchFlags] ) { delete(search[key as keyof SearchFlags]); }
    });

    try {
        result = await request.post(url, search).then((response: any) => {
            return response || null;
        }).catch(() =>  null );
    } catch (error) {
        result = null;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_ISSUE_SEARCH_RESULT, data: result });
};

export const setIssueSearchResult = ( data?: null | SparingTilBarnSearchResult ) => async (dispatch: Dispatch) => {
    dispatch({ type: SET_ISSUE_SEARCH_RESULT, data });
};

/******************************************************************************
******************************************************************************/
export const getIssueComment = ( id: string | number, callback?: (r: null | SparingTilBarnKommentar[] ) => void ) => async (dispatch: Dispatch) => {
    let result: null | SparingTilBarnKommentar[] = null;
    const url = `${SERVICE_PATH}/saker/${id}/kommentar`;
    try {
        result = await request.get(url);
    } catch ( error ) {
        result = null;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_ISSUE_COMMENT, data: result });
};

export const setIssueComment = ( data?: null | SparingTilBarnKommentar[] ) => async (dispatch: Dispatch) => {
    dispatch({ type: SET_ISSUE_COMMENT, data });
};

/******************************************************************************
******************************************************************************/
export const getIssueCertificate = ( id: string | number, callback?: (r: null | SparingTilBarnFodselsattest ) => void ) => async (dispatch: Dispatch) => {
    let result: null | SparingTilBarnFodselsattest = null;
    const url = `${SERVICE_PATH}/saker/${id}/fodselsattest`;
    try {
        result = await request.get(url);
    } catch ( error ) {
        result = null;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_ISSUE_CERTIFICATE, data: result });
};

export const setIssueCertificate = ( data?: null | SparingTilBarnFodselsattest ) => async (dispatch: Dispatch) => {
    dispatch({ type: SET_ISSUE_CERTIFICATE, data });
};

/******************************************************************************
******************************************************************************/
export const getIssueAML = ( id: string | number, callback?: (r: null | StringObject ) => void ): any => async (dispatch: Dispatch) => {
    let result: null | StringObject = null;
    const url = `${SERVICE_PATH}/antihvitvask/${id}`;
    try {
        result = await request.get(url);
    } catch ( error ) {
        result = null;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_ISSUE_AML, data: result });
};

export const setIssueAML = ( data?: null | StringObject ) => async (dispatch: Dispatch) => {
    dispatch({ type: SET_ISSUE_AML, data });
};

/******************************************************************************
******************************************************************************/
const postIssueComment = ( data: IssueActionConfig): any => async () => {
    const url = `${SERVICE_PATH}/saker/${data.id}/kommentar`;
    return request.post(url, {kommentar: data.note}).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

const postIssueCertificate = ( data: IssueActionConfig): any => async () => {
    const url = `${SERVICE_PATH}/saker/${data.id}/fodselsattest`;
    const form = new FormData();    
    form.append('file', data.file);
    return request.postFormData(url, form).then(() => {
        return true;       
    }).catch(() => {
        return false;
    });
};

const postIssueStatus = ( data: IssueActionConfig): any => async () => {
    const url = `${SERVICE_PATH}/saker/${data.id}/${data.action === 'decline' ? 'avvis' : 'godkjenn'}`;
    return request.post(url, {}).then(() => {
        return true;       
    }).catch(() => {
        return false;
    });
};

export const postIssueAction = (data: IssueActionConfig, callback: (r: {[k: string]: boolean}) => void,): any => async (dispatch: Dispatch) => {
    let result = null;
    try {
        result = await Promise.all([
            data.note ? dispatch(postIssueComment(data)) : undefined,
            data.file ? dispatch(postIssueCertificate(data)) : undefined,
            /^approve|decline|retransfer$/i.test((data.action ?? '')) ? dispatch(postIssueStatus(data)) : undefined,
        ]);
    } catch (error) {
        result = null;
    }

    const out: MultipleObject = {
        note: result === null ? false : (result ?? [])[0], 
        file: result === null ? false : (result ?? [])[1], 
        action: result === null ? false : (result ?? [])[2], 
    };

    callback( out );
    return dispatch({ type: SET_ISSUE_ACTION, data: out });
}

/******************************************************************************
******************************************************************************/
export interface AppReducer {
    status?: null | SparingTilBarnStatusResultat;
    result?: null | SparingTilBarnSearchResult;
    comment?: null | SparingTilBarnKommentar;
    certificate?: null | SparingTilBarnFodselsattest;
    aml?: null | StringObject;
};

const initialState: AppReducer = {};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_ISSUE_STATUS_COUNT:
            return {...state, status: action.data };
        case SET_ISSUE_SEARCH_RESULT:
            return {...state, result: action.data};
        case SET_ISSUE_COMMENT:
            return {...state, comment: action.data};
        case SET_ISSUE_CERTIFICATE:
            return {...state, certificate: action.data};
        case SET_ISSUE_AML:
            return {...state, aml: action.data};
        default:
            return state;
    }
};
