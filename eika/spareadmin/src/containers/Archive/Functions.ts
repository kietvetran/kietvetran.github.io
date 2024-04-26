import { MouseEvent } from 'react';
import { getValue, getFormValues, getDefaultValues, openBase64 } from '../../common/util/Functions';
import { StringObject, DokumentMetadataDTOwithTool, Order, Sorting } from '../../domain/types';
import { DokumentMetadataDTO, DokumentDTO, RegisterDokumentRequest, ManualUploadRequest } from '../../generated-types.d';
import { ErrorItem, InputContent } from '../../domain/forms';
import { State, Props } from './Archive';
import Constant from '../../static/data/Constant';
import { getArchiveSearch, getArchiveDocument, postArchiveDocument, postArchiveManualUpload } from '../../actions/archive';

/** ****************************************************************************
 === INTERNAL FUNCTOIN === 
 ***************************************************************************** */
const resetForm = (state: State): void => {
    const keyConfig: StringObject = {
        search: 'searchInputContent',
        upload: 'uploadInputContent',
        manual: 'manualUploadInputContent',
    };
    const key = keyConfig[(state.menuSelected as keyof StringObject)];
    const inputContent  = state[(key as keyof State)] as (InputContent[] | InputContent[][]);
    if ( !inputContent ) { return; }

    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return; }

    const defaultValues = getDefaultValues(inputContent);
    formAction.reset(defaultValues);
};

const changeTab = (state: State, setState: (s: State) => void, selected: string ): void => {
    setState({...state, menuSelected: selected });
};

const displayActionMessage = (state: State, setState: (s: State) => void, text: string, type?: 'error' | 'success' ): void => {
    setState({...state, onAction: false, message: {text, type}});
    setTimeout( () => {
        setState({...state, onAction: false, message: undefined});
    }, 3000);
};

const openDocumentFile = (props: Props, state: State, setState: (s: State) => void, data: DokumentMetadataDTOwithTool ): void => {
    setState({...state, onAction: true});
    props.action.dispatch(getArchiveDocument(data.dokumentId, (result: null | DokumentDTO) => {
        const base64 = result?.base64EncodedPayload;
        if ( !base64 ) { return displayActionMessage(state, setState, 'Ops, noe gikk galt.', 'error'); }

        const isXML = data.filtype.toLowerCase() === 'xml';
        const filename = `${data.dokumentId}.${isXML ? 'xml' : 'pdf'}`;
        const application = isXML ? 'text/xml' : 'application/pdf';

        setState({...state, onAction: false});
        try {
           openBase64( base64, application, filename );        
        } catch {
            displayActionMessage(state, setState, 'Ops, noe gikk galt.', 'error');
        }
    }));
};

const openArchiveSearchResultDetail = (state: State, setState: (s: State) => void, data: DokumentMetadataDTOwithTool ): void => {
    const view = {...state.view};
    if ( !view.search?.resultList ) { return; }

    const list: DokumentMetadataDTOwithTool[] = [];
    const index = view.search.resultList.findIndex( (d: any) => data.dokumentId === d.dokumentId );
    const open = view.search.resultList[(index +1)]?.mode === 'caption';

    view.search.resultList.forEach( (d: DokumentMetadataDTOwithTool) => {
        if ( open ) {
            if ( !d.mode ) { list.push(d); }
        } else if ( d.dokumentId === data.dokumentId ) {
            list.push(d);
            list.push({ ...d, mode: 'caption' });
        } else if ( !d.mode ) {
            list.push( d );
        }
    });

    view.search.resultList = list;
    const detail = open ? undefined : [
        { key: ['emner.dokumentNavn', 'emner.dokumentType'], label: 'Dokument', type: '' },
        { key: ['emner.raadgiverName', 'emner.raadgiverEpost'], label: 'Rådgiver', type: '' },
        { key: ['emner.sourceApplication'], label: 'Application', type: '' },
        { key: ['emner.sakId'], label: 'Sak ID', type: '' },
        { key: ['versjon'], label: 'Versjon', type: '' },
        { key: ['emner.signeringsOrdreId'], label: 'Signeringsordre ID', type: '' },
        { key: ['fritekst'], label: 'System notat', type: '' },

    ].map( (config: any) => {
        return {label: config.label || config.name, value: getValue(data, config).join(', ')};
    });

    setState({...state, view, detail});
};

const sortDocumentArchiveResultView = (sorting: Sorting, result: null | DokumentMetadataDTOwithTool[]): null | DokumentMetadataDTOwithTool[] => {
    if ( !result ) { return null; }

    return sorting.status ? result.sort( (a: DokumentMetadataDTOwithTool, b: DokumentMetadataDTOwithTool) => {
        let x: any = getValue(a, sorting);
        let y: any = getValue(b, sorting);
        if ( sorting.isDate ) {
            x = x ? (new Date( x )).getTime() : 0;
            y = y ? (new Date( y )).getTime() : 0;        
        }

        // eslint-disable-next-line
        return (x < y ? -1 : (x === y ? 0 : 1)) * (sorting.status === 1 ? 1 : -1);
    }) : result;
};

const sortDocumentArchive = (state: State, setState: (s: State) => void): void => {
    if ( !state.view.search.result ) { return; }

    const cloned = JSON.parse(JSON.stringify(state.view.search.result));
    const orderList = JSON.parse(JSON.stringify(state.view.search.orderList));
    const order = orderList.find( (order: Order) => !!order.sorting );
    if ( !order?.sorting ) { return; }

    order.sorting.status += 1;
    if ( order.sorting.status > 2 ) { order.sorting.status = 0; }

    setState({...state, view: {...state.view, search: {
        ...state.view.search,
        orderList,
        resultList: sortDocumentArchiveResultView( order.sorting, cloned ),
    }}});  
};

/** ****************************************************************************
 === EXTERNAL FUNCTOIN === 
 ***************************************************************************** */
export const manualUpload = (props: Props, state: State, setState: (s: State) => void, data: StringObject, errorList: ErrorItem[], cancel=false  ): void => {
    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return; }

    if ( cancel ) { return resetForm(state); }
    if ( errorList.length ) { return; }
    const values = getFormValues( formAction.getValues, state.manualUploadInputContent );
    const config: ManualUploadRequest = {
        // @ts-ignore
        sourceApplication: values.source,
        signeringsOrdreIds: values.orderId.trim().split("\n"),
    };

    setState({...state, onAction: true});
    props.action.dispatch( postArchiveManualUpload(config, (result: boolean) => {
        if ( result ) { 
            displayActionMessage(state, setState, 'Opplasting er vellykket.', 'success');
            resetForm(state);
        } else {
            displayActionMessage(state, setState, 'Opplasting feilet.', 'error');             
        }
    }));
};

export const search = (props: Props, state: State, setState: (s: State) => void, data: StringObject, errorList: ErrorItem[], cancel=false ): void => {
    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return; }

    if ( cancel ) { 
        setState({...state, view: {...state.view, search: {
            ...state.view.search,
            search: undefined,
            result: undefined,
            resultList: undefined
        }}});
        return resetForm(state); 
    }

    if ( errorList.length ) { return; }

    const values = getFormValues( formAction.getValues, state.searchInputContent );
    if ( !values.id ) { return; }

    setState({...state, view: {...state.view, search: {...state.view.search, search: null}}});
    props.action.dispatch( getArchiveSearch(values.id, (result: null | DokumentMetadataDTO[]) => {
        const list: null | DokumentMetadataDTOwithTool[] = result === null ? null : result.map( (d: DokumentMetadataDTO) => {
            return {
                ...d,
                documentFile: `${d.dokumentnavn}.${d.filtype}`,  
                tool: [
                    { id: 'open-detail', name: 'Detaljer', action: 'open-detail', style: ''},
                ]
            }
        });

        const order = state.view.search.orderList.find( (order: Order) => !!order.sorting );
        setState({...state, view: {...state.view, search: {
            ...state.view.search,
            search: values.id,
            result: list,
            resultList: order?.sorting ? sortDocumentArchiveResultView( order.sorting, list ) : list,
        }}});
    }));
};

export const upload = (props: Props, state: State, setState: (s: State) => void, data: StringObject, errorList: ErrorItem[], cancel=false ): void => {
    const formAction = state.view[state.menuSelected]?.formAction;

    if ( !formAction ) { return; }

    if ( cancel ) { 
        setState({...state, view: {...state.view, upload: {...state.view.upload,formMessage: undefined,}}});
        resetForm(state);
        const fileRemoveBtn = document.getElementById('file-field-remove-btn');
        if ( fileRemoveBtn ) { fileRemoveBtn.click(); }
        return;
    }

    if ( errorList.length ) { return; }

    const values = getFormValues( formAction.getValues, state.uploadInputContent );
    if ( !values.id ) { return; }

    const file = state.storage[values.file];
    const config: RegisterDokumentRequest = {
        offentligId: {value: values.id }, 
        bankregnr: {value: values.bank},
        base64EncodedPayload: file.source || '',
        beskrivelse: values.note || '',
        // @ts-ignore
        ekfDokumentType: values.type || undefined,
        filtype: file.filtype,
        mimetype: file.mimetype,
    };

    setState({...state, onAction: true});
    props.action.dispatch( postArchiveDocument(config, (result: boolean) => {
        if ( result ) { 
            displayActionMessage(state, setState, 'Fila er lastet opp.', 'success');
            resetForm(state);
            const fileRemoveBtn = document.getElementById('file-field-remove-btn');
            if ( fileRemoveBtn ) { fileRemoveBtn.click(); }
        } else {
            displayActionMessage(state, setState, 'Fila feilet ved å laste opp til server.', 'error');             
        }
    }));
}

export const change = async (props: Props, state: State, setState: (s: State) => void, content: InputContent, value: string, file?: any ): Promise<void> => {
    if ( content.type !== Constant.typeFilefield ) { return; }

    const convertBase64 = async (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => { resolve(fileReader.result); };
            fileReader.onerror = (error) => { reject(error); };
        });
    };

    const converted: any = await convertBase64( file );
    state.storage[value] = {
        filtype: file.type.match(/\/(\w+)$/)[1].toUpperCase(),
        mimetype: file.type,
        source: converted.replace( /.*;base64,/, ''),
    };
};

export const click = (props: Props, state: State, setState: (s: State) => void, e: null | MouseEvent, key='', data: any ): void => {
    if ( e && typeof(e.preventDefault) === 'function' ) {
        e.preventDefault();
    }

    if ( key === 'open-detail' ) {
        openArchiveSearchResultDetail( state, setState, data );
    } else if ( key === 'change-tab' ) {
        changeTab( state, setState, data );
    } else if ( key === 'open-document-file' ) {
        openDocumentFile( props, state, setState, data );
    } else if ( key === 'sorting' ) {
        sortDocumentArchive(state, setState);
    }
};


