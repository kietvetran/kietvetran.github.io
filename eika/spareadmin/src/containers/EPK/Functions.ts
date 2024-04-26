import { MouseEvent } from 'react';
import { getText, getValue, getFormValues, getDefaultValues, scrollBodyTop, getMonthListText } from '../../common/util/Functions';
import { 
    StringObject, NotificationWithTool, Tool, Sorting, 
    Order, PagingConfig, NotificationsRequestExtension, NotificationResult,
} from '../../domain/types';
import { InputContent, ErrorItem, SelectOption } from '../../domain/forms';
// eslint-disable-next-line
import { State, Props } from './EPK';
import Constant from '../../static/data/Constant';
import { getEPKpersonInfo, getEPKnotification, postEPKnotificationFinalize } from '../../actions/epk';
import { GetEpkPkbPensionInfoResponse, Notification, OriginType } from '../../generated-types.d';
import InputContentEPKnotificationFinalize from '../../static/data/InputContentEPKnotificationFinalize';
import { InputContentEPKnotificationFirst } from '../../static/data/InputContentEPKnotification';

/** ****************************************************************************
 === Internal function ===
 ***************************************************************************** */
const needToFinalize = (note: Notification): boolean => {
    return note.status === Constant.notificationStatusNotAccepted || 
        note.status === Constant.notificationStatusFailed ||
         !!note.requiresManualProcessing;
};

const getEPKnotificationDate = (state: State, isTo=false): Date => {
    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return (new Date()); }

    const values: any = getFormValues( formAction.getValues, state.notificationInputContentFirst);
    Object.keys( values ).forEach( (key: string) => {
        if ( /^(from|to)(Month|Year|Date)$/.test(key) ) {
            values[key] = parseInt( values[key], 10 );
        }
    });

    const now = new Date();
    const date = new Date( 0 );
    const list: any = (isTo ? ['toYear', 'toMonth', 'toDate'] : ['fromYear', 'fromMonth', 'fromDate'])
        .map( (key: string) => values[key]);

    date.setFullYear( list[0] );
    date.setMonth( list[1] );
    date.setDate( list[2] );
    return date.getTime() > now.getTime() ? now : date;
};

const openNotificationResultDetail = (state: State, setState: (s: State) => void, data: Notification ): void => {
    const view = {...state.view};
    if ( !view.notification?.resultList ) { return; }

    const resultList = JSON.parse(JSON.stringify(view.notification.resultList));
    const list: NotificationWithTool[] = [];
    const index = resultList.findIndex( (d: any) => data.notificationId === d.notificationId );
    const open = resultList[(index +1)]?.mode === 'caption';
    resultList.forEach( (d: NotificationWithTool) => {
        if ( open ) {
            if ( !d.mode ) { list.push(d); }
        } else if ( d.notificationId === data.notificationId ) {
            list.push(d);
            list.push({ ...d, mode: 'caption' });
        } else if ( !d.mode ) {
            list.push( d );
        }
    });

    view.notification.resultList = list;
    const inputContent = data.requiresManualProcessing ? JSON.parse(JSON.stringify(InputContentEPKnotificationFinalize)) : [];
    const detail = open ? undefined : { 
        data,
        list: [
            { key: 'fraPkbId', label: 'Fra PKB id', },
            { key: 'tilPkbId', label: 'Til PKB id', },
            { key: 'fraEpkId', label: 'Fra EPK id', },
            { key: 'tilEpkId', label: 'Til EPK id', },
            { key: 'bankkonto.value', label: 'Bankkonto' },
            { key: 'kid.value', label: 'KID' },
            { key: 'kidAktiv.value', label: 'KID aktiv' },
            { key: 'kidPassiv.value', label: 'KID passiv' },
            { key: 'activeBalancePaymentState', label: 'Aktiv balansestatus' },
            { key: 'passiveBalancePaymentState', label: 'Passiv balansestatus' },
            { key: 'balancePaymentState', label: 'Balansestatus' },
            // { key: 'belop', label: 'Beløp', format: 'amount', type: 'amount' },
            { key: 'fromActiveCapital', label: 'Fra aktiv kapital', valueOption: { 'true': 'Ja', 'false': 'Nei'} },
            { key: 'requiresManualProcessing', label: 'Krever manuell behandling', valueOption: { 'true': 'Ja', 'false': 'Nei'} },
            { key: 'manualProcessingSuccess', label: 'Manuell behandling vellykket', valueOption: { 'true': 'Ja', 'false': 'Nei'} },
        ].map( (config: any) => {
            return {label: config.label || config.name, value: getValue(data, config).join(', ')};
        }),
        inputContent,
        allowFinalize: true,
        needToFinalize: needToFinalize( data ),
        needManualProcessing: data.requiresManualProcessing ?
            'Denne notifikasjonen har requiresManualProcessing=true. Vi må derfor svare på om manuell prosessering var vellykket når vi setter finalisert (FINALIZED).' : '',
    };

    setState({...state, view, detail});
};

const getEPKnotificationResultView = ( result: null | Notification[], paging?: PagingConfig): null | NotificationWithTool[] => {
    if ( !result ) { return null; }

    const list = paging?.count ? result.filter( (d: Notification, i:number) => {
        return i >= (paging.count * paging.index) && i < ((paging.count * paging.index) + paging.count); 
    }) : result;

    const resultList = list.map( (d: Notification) => {
        return {...d, tool: [
            { id: 'open-detail', name: 'Detaljer', action: 'open-detail', style: needToFinalize(d) ? 'need-finalize' : '' },
        ]}
    });
    return resultList;
};

const sortEPKnotificationResultView = (sorting: Sorting, result: null | Notification[]): null | Notification[] => {
    if ( !result ) { return null; }

    return sorting.status ? result.sort( (a: Notification, b: Notification) => {
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

const getEPKpersonResultView = ( result: null | GetEpkPkbPensionInfoResponse, fnr: string ): any => {
    if ( !result ) { return { epks: null, info: undefined, pkbs: undefined}; }

    const provider = result.personSelectedProvider;
    const info = provider ? {type: 'table', text: [
        [
            {text: 'Fødselsnummer'}, 
            {text: fnr },
        ], [
            {text: 'Valgt tilbyder'}, 
            {text: [getText({key: 'personSelectedProvider.name'}, provider), getText({key: 'personSelectedProvider.orgNr.value'}, provider)] },
        ], [
            {text: 'Endret av tilbyder'}, 
            {text: [getText({key: 'modifiedByProvider.name'}, provider), getText({key: 'modifiedByProvider.orgNr.value'}, provider)] } ,          
        ], [
            {text: 'Dato endret'}, 
            {text: [getText({key: 'modifiedDate', config: {dateFormat: 'dd MMm yyyy'}}, provider)] },
        ]
    ]} : null;

    return { epks: result.epks || [], pkbs: result.pkbs || [], info };
};


const submitGetEPKpersonInfo = (props: Props, state: State, setState: (s: State) => void): void => {
    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return; }

    const values = getFormValues( formAction.getValues, state.personInputContent);
    if ( !values.personFnr ) { return; }
    setState({...state, view: {...state.view, person: {...state.view.person, search: null}}});
    props.action.dispatch( getEPKpersonInfo(values.personFnr, (result: null | GetEpkPkbPensionInfoResponse) => {
        setState({...state, view: {...state.view, person: {
            ...state.view.person,
            search: values,
            ...getEPKpersonResultView(result, values.personFnr),
        }}});
    }));
};

const submitGetEPKnotification = (props: Props, state: State, setState: (s: State) => void): void => {
    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return; }

    const values = getFormValues( formAction.getValues, state.notificationInputContentFirst);
    const typeValues = getFormValues( formAction.getValues, state.notificationInputContentSecond);
    const statusValues = getFormValues( formAction.getValues, state.notificationInputContentThird);

    const types: any = Object.keys(typeValues).map( (key: string) => {
        return /all_/i.test(key) || !typeValues[key] ? '' : key;
    }).filter( (key: string) => !!key);
    const statuses: any = Object.keys(statusValues).map( (key: string) => {
        return /all_/i.test(key) || !statusValues[key] ? '' : key;
    }).filter( (key: string) => !!key);

    const pageSize = 100;
    const data: NotificationsRequestExtension = {
        types: types.length ? types : undefined,
        statuses: statuses.length ? statuses : undefined,
        pkbkId: parseInt( `${values.pkbId || 0}`, 10) || undefined, // Incorrect generated type key, the fix is on backend.
        epkId: parseInt( `${values.epkId || 0}`, 10) || undefined,
        fnr: values.fnr ? {value: values.fnr} : undefined,
        fromDatetime: getEPKnotificationDate(state, false),
        toDatetime: getEPKnotificationDate(state, true),
        pageSize,
        pageNumber: 0, 
    };

    if ( values.origin ) {
        data.origin = values.origin as OriginType;
    }


    setState({...state, view: {...state.view, notification: {...state.view.notification, search: null}}});
    const setResult = ( result: null | Notification[] ) => {
        let cloned = result ? JSON.parse(JSON.stringify(result)) : null;
        const order = state.view.notification.orderList.find( (order: Order) => !!order.sorting );
        if ( order?.sorting ) { cloned = sortEPKnotificationResultView( order.sorting, cloned ); }

        const paging = state.view.notification.paging ?
            JSON.parse(JSON.stringify(state.view.notification.paging)) : undefined;
        if ( paging ) { 
            paging.index = 0; 
            paging.length = (cloned ?? []).length;
        }

        setState({...state, view: {...state.view, notification: {
            ...state.view.notification,
            search: data,
            result,
            paging,
            checkedList: [],
            resultList: getEPKnotificationResultView(cloned, paging),
        }}});
    };

    props.action.dispatch( getEPKnotification(data, (result: null | NotificationResult) => {
        if ( !result ) { return setResult( null ); }

        let collection: Notification[] = result.notifications;
        let length = result.totalPages - 1;
        if ( !length || collection.length === 0 ) { return setResult(collection); }

        const requestList: NotificationsRequestExtension[] = 
            Array.from({length}).map( (_x: any, i: number): NotificationsRequestExtension => {
                return {...data, pageNumber: (i + 1) };
            });

        requestList.forEach( (request: NotificationsRequestExtension) => {
            props.action.dispatch( getEPKnotification(request, (result: null | NotificationResult) => {
                if ( result ) { collection = collection.concat( result.notifications ); }
                if ( --length ) { return; } 
                setResult( collection );
            }));
        });
    }));
};

const sortEPKnotification = (state: State, setState: (s: State) => void): void => {
    if ( !state.view.notification.result ) { return; }

    let cloned = JSON.parse(JSON.stringify(state.view.notification.result));
    const orderList = JSON.parse(JSON.stringify(state.view.notification.orderList));
    const order = orderList.find( (order: Order) => !!order.sorting );
    if ( !order?.sorting ) { return; }

    order.sorting.status += 1;
    if ( order.sorting.status > 2 ) { order.sorting.status = 0; }

    cloned = sortEPKnotificationResultView( order.sorting, cloned );

    const paging = state.view.notification.paging ?
        JSON.parse(JSON.stringify(state.view.notification.paging)) : undefined;
    if ( paging ) { 
        paging.index = 0; 
        paging.length = (cloned ?? []).length;
    }

    setState({...state, view: {...state.view, notification: {
        ...state.view.notification,
        orderList,
        paging,
        resultList: getEPKnotificationResultView(cloned, paging),
    }}});      
};

const changePageEPKnotification = (state: State, setState: (s: State) => void, index=0): void => {
    if ( !state.view.notification.result ) { return; }

    let cloned = JSON.parse(JSON.stringify(state.view.notification.result));
    const order = state.view.notification.orderList.find( (order: Order) => !!order.sorting );
    if ( order?.sorting ) { cloned = sortEPKnotificationResultView( order.sorting, cloned ); }

    const paging = state.view.notification.paging ?
        JSON.parse(JSON.stringify(state.view.notification.paging)) : undefined;
    if ( paging ) { 
        paging.index = index; 
        paging.length = (cloned ?? []).length;
    }

    scrollBodyTop( 0 );
    setState({...state, view: {...state.view, notification: {
        ...state.view.notification,
        paging,
        resultList: getEPKnotificationResultView(cloned, paging),
    }}});  
};

const setEPKnotificationDate = (state: State, date: Date, isTo=false): void => {
    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return; }

    const values: { [k: string]: number } = isTo ? {
        'toYear': date.getFullYear(),
        'toMonth': date.getMonth(),
        'toDate': date.getDate(),
    } : {
        'fromYear': date.getFullYear(),
        'fromMonth': date.getMonth(),
        'fromDate': date.getDate(),
    };

    Object.keys( values ).forEach( (key: string) => {
        formAction.setValue( key, `${values[key]}` );
    });
};

const updateDateOption = ( cnt: InputContent, date: Date, setDefaultValue=false ): void => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const optionList: SelectOption[] = [];
    const cloned = new Date( date.getTime() );

    Array.from({length: 31}).forEach((x: any, i: number) => {
        const d = i + 1;
        cloned.setDate( d );

        if ( cloned.getDate() !== d ) { return; }
        if ( year === cloned.getFullYear() && month === cloned.getMonth() && d > now.getDate() ) { return; }
        optionList.push({id: `${d}`, name: `${d < 10 ? '0': ''}${d}`});
    });

    cnt.option = optionList.reverse();
    if ( setDefaultValue ) { cnt.defaultValue = `${date.getDate()}`; }
};

const updateMonthOption = ( cnt: InputContent, date: Date, setDefaultValue=false ): void => {
    const year = (new Date()).getFullYear();
    const optionList: SelectOption[] = [];
    const monthListText = getMonthListText();
    monthListText.forEach( (text: string, i: number) => {
        if ( year > date.getFullYear() || i <= date.getMonth() ) {
            optionList.push({id: `${i}`, name: text});
        }
    });

    cnt.option = optionList.reverse();
    if ( setDefaultValue ) { cnt.defaultValue = `${date.getMonth()}`; }
};

const updateEPKnotificationDateOption = (props: Props, state: State, setState: (s: State) => void ): void => {
    const cloned = JSON.parse(JSON.stringify(state.notificationInputContentFirst));
    const pin: {[k: string]: InputContent} = cloned.reduce( (p: {[k: string]: InputContent}, list: InputContent[] ) => {
        list.forEach( (cnt: InputContent) => { p[cnt.name] = cnt; });
        return p;
    }, {});

    const from = getEPKnotificationDate( state, false );
    const to = getEPKnotificationDate( state, true );

    updateMonthOption( pin.fromMonth, from, );
    updateMonthOption( pin.toMonth, to);
    updateDateOption( pin.fromDate, from);
    updateDateOption( pin.toDate, to );
    setState({...state, notificationInputContentFirst: cloned});

    setTimeout( () => {
        setEPKnotificationDate( state, from, false );
        setEPKnotificationDate( state, to, true );
    }, 20);
};

const updateEPKnotificationCheckList = (props: Props, state: State, setState: (s: State) => void, content: InputContent, value: string ): void => {
    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return; }

    const checkList = [state.notificationInputContentSecond, state.notificationInputContentThird].find( (list: InputContent[]) => {
        return !!list.find( (cnt: InputContent) => cnt.name === content.name );
    });

    if ( !checkList ) { return; }    

    if ( checkList[0].name === content.name ) {
        checkList.forEach( (cnt: InputContent) => { formAction.setValue(cnt.name, value); })
    } else {
        const names = checkList.map( (cnt: InputContent, i: number) => {
            return i === 0 ? '' : cnt.name; 
        }).filter( (v: string) => !!v);
        const onList = formAction.getValues( names ).map( (v?: string) => v ? 'on' : '');
        const anyOff = onList.find( (v?: string) => !v );
        formAction.setValue(checkList[0].name, (anyOff === undefined) );
    }
};

/** ****************************************************************************
 === External function ===
 ***************************************************************************** */
export const finalize = (props: Props, state: State, setState: (s: State) => void): void => {
    const id = state.detail?.data?.notificationId; 
    if ( !id) { return; }

    props.action.dispatch( postEPKnotificationFinalize({notificationId: id}, ( result: boolean ) => {
        const list = JSON.parse(JSON.stringify(state.view.notification.resultList));
        const found = list.find( (d: NotificationWithTool) => d.notificationId === id);
        if ( found && result ) {
            const tool = found.tool.find( (d: Tool) => d.id === 'open-detail');
            if ( tool ) { tool.style = ''; }
        }

        const detail = JSON.parse(JSON.stringify(state.detail));
        detail.message = result ? {text: 'Suksess', type: 'success'} : {text: 'Ops, noe gikk galt.', type: 'error'};
        setState({...state, detail, view: {...state.view, notification: {...state.view.notification, resultList: list}}});
        setTimeout( () => {
            const next = JSON.parse(JSON.stringify(detail));
            next.needToFinalize = !result;
            delete( next.message );       
            setState({...state, detail: next});
        }, 3000);
    }))
};

export const updateManualProcessingResult = (props: Props, state: State, setState: (s: State) => void, content: InputContent, value: string ): void => {
    const detail = JSON.parse(JSON.stringify(state.detail));
    detail.allowFinalize = !!value;
    setState({...state, detail});
};

export const submit = (props: Props, state: State, setState: (s: State) => void, data: StringObject, errorList: ErrorItem[], cancel=false ): void => {
    const formAction = state.view[state.menuSelected]?.formAction;
    if ( !formAction ) { return; }

    if ( cancel ) { 
        if ( state.menuSelected === 'person' ) {   
            formAction.reset( getDefaultValues(state.personInputContent) ); 
            setState({...state, view: {...state.view, person: {...state.view.person, search: undefined, epks: undefined, info: undefined, pkbs: undefined}}});           
        } else {
            const defaultValues = {
                ...getDefaultValues(state.notificationInputContentFirst),
                ...getDefaultValues(state.notificationInputContentSecond),
                ...getDefaultValues(state.notificationInputContentThird),
            };
            formAction.reset( defaultValues ); 
            setState({...state, view: {...state.view, notification: {...state.view.notification, search: undefined, resultList: undefined}}});
        }
    } else {
        if ( errorList.length ) { return; }
        
        if ( state.menuSelected === 'person' ) {
            submitGetEPKpersonInfo(props, state, setState);
        } else {
            submitGetEPKnotification(props, state, setState);
        }
    }   
};

export const change = (props: Props, state: State, setState: (s: State) => void, content: InputContent, value: string ): void => {
    if ( /^(from|to)-/i.test(content.id) ) {
        updateEPKnotificationDateOption( props, state, setState );
    } else {
        updateEPKnotificationCheckList( props, state, setState, content, value );
    }
};

export const click = (props: Props, state: State, setState: (s: State) => void, e: null | MouseEvent, key='', data: any ): void => {
    if ( e && typeof(e.preventDefault) === 'function' ) {
        e.preventDefault();
    }

    if ( key === 'open-detail' ) {
        openNotificationResultDetail( state, setState, data );
    } else if ( key === 'sorting' && state.menuSelected === 'notification' ) {
        sortEPKnotification(state, setState);
    } else if ( key === 'change-page' && state.menuSelected === 'notification' ) {
        changePageEPKnotification(state, setState, data);
    } 
};

export const initEPKnotificationInputContentFirst = (): InputContent[][] => {
    const inputContent: InputContent[][] = JSON.parse(JSON.stringify(InputContentEPKnotificationFirst));
    const back = 1000 * 60 * 60* 24 * 182;
    const now = new Date();
    const from = new Date((now.getTime() - back));
    const pin: {[k: string]: InputContent} = inputContent.reduce( (p: {[k: string]: InputContent}, list: InputContent[] ) => {
        list.forEach( (cnt: InputContent) => { p[cnt.name] = cnt; });
        return p;
    }, {});

    const yearList: SelectOption[] = [];
    let year = now.getFullYear();
    while ( year > 2019 ) {
        yearList.push({id: `${year}`, name: `${year}`});
        year--;
    }

    pin.fromYear.option = JSON.parse(JSON.stringify(yearList));
    pin.fromYear.defaultValue = `${from.getFullYear()}`;

    pin.toYear.option = JSON.parse(JSON.stringify(yearList));
    pin.toYear.defaultValue = `${now.getFullYear()}`;

    updateMonthOption( pin.fromMonth, from, true );
    updateMonthOption( pin.toMonth, now, true );
    updateDateOption( pin.fromDate, from, true );
    updateDateOption( pin.toDate, now, true );

    return inputContent;
};