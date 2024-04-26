import * as request from '@eika-infrastruktur/request';
import { Dispatch } from 'redux';

import { SERVICE_PATH } from './index';
import { DokumentDTO, DokumentMetadataDTO, RegisterDokumentRequest, ManualUploadRequest } from '../generated-types.d';

const SET_ARCHIVE_SEARCH = 'SET_ARCHIVE_SEARCH';
const SET_ARCHIVE_DOCUMENT = 'SET_ARCHIVE_DOCUMENT';
const SET_ARCHIVE_MANUAL_UPLOAD = 'SET_ARCHIVE_MANUAL_UPLOAD';

/******************************************************************************
******************************************************************************/
export const getArchiveSearch = ( id: string, callback?: (r: null | DokumentMetadataDTO[] ) => void ): any => async (dispatch: Dispatch) => {
    let result: null | DokumentMetadataDTO[] = null;
    const url = `${SERVICE_PATH}/dokument/search/${id}`;
    try {
        result = await request.get(url);
    } catch (error) {
        result = null;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_ARCHIVE_SEARCH, data: result });
};

/******************************************************************************
******************************************************************************/
export const getArchiveDocument = ( id: string, callback: (r: null | DokumentDTO ) => void ): any => async () => {
    let result: null | DokumentDTO = null;
    const url = `${SERVICE_PATH}/dokument/get/${id}`;
    try {
        result = await request.get(url);
    } catch (error) {
        result = null;
    }

    callback( result );
};

/******************************************************************************
******************************************************************************/
export const postArchiveDocument = ( data: RegisterDokumentRequest, callback?: (r: boolean) => void ): any => async (dispatch: Dispatch) => {
    let result = false;
    const url = `${SERVICE_PATH}/dokument`;
    try {
        result = await request.post(url, data).then(() => {
            return true;
        }).catch(() => false );
    } catch (error) {
        result = false;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_ARCHIVE_DOCUMENT, data: result });
};

/******************************************************************************
******************************************************************************/
export const postArchiveManualUpload = ( data: ManualUploadRequest, callback?: (r: boolean) => void ): any => async (dispatch: Dispatch) => {
    let result = false;
    const url = `${SERVICE_PATH}/dokument/manualupload`;
    try {
        result = await request.post(url, data).then(() => {
            return true;
        }).catch(() => false );
    } catch (error) {
        result = false;
    }

    return typeof(callback) === 'function' ? callback( result ) : 
        dispatch({ type: SET_ARCHIVE_MANUAL_UPLOAD, data: result });
};

/******************************************************************************
******************************************************************************/
export interface AppReducer {
    search?: null | DokumentMetadataDTO[];
    upload?: boolean;
    manualUpload?: boolean;
};

const initialState: AppReducer = {};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_ARCHIVE_SEARCH:
            return {...state, search: action.data };
        case SET_ARCHIVE_DOCUMENT:
            return {...state, upload: action.data };
        case SET_ARCHIVE_MANUAL_UPLOAD:
            return {...state, manualUpload: action.data };
        default:
            return state;
    }
};
