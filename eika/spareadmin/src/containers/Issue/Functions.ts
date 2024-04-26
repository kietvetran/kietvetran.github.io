import { MouseEvent } from 'react';
import { getFormValues, generateId, getDefaultValues } from '../../common/util/Functions';
import {Props as MessageProps} from '../../common/Message/Message';
import { State, Props } from './Issue';
import Constant from '../../static/data/Constant';
import { SparingTilBarnStatusResultat } from '../../generated-types';
import { AppMenu } from '../../domain/app';
import { StringObject, IssueActionConfig, Order, SparingTilBarnWithTool } from '../../domain/types';
import { InputContent, ErrorItem, SelectOption } from '../../domain/forms';
import { postIssueAction, getIssueAML } from '../../actions/issue';

/******************************************************************************
 == INTERNAL FUNCTION ==
******************************************************************************/
const isAbleToApprove = (status: string, aml: null | StringObject ): boolean => {
    const found = !!['SIGNERT_AV_ALLE_VERGER', 'PABEGYNT_AV_RADGIVER', 'OPPRETTET_SPAREMAAL_FEILET', 'AHV_SCORE_FOR_HOY']
        .find( (s: string) => s === status);

    return found && !!aml && !Object.keys(aml).find( (key: string) => !/ok/i.test(aml[key]) );
};

const isAbleToDecline = (status: string ): boolean => {
    return !['GODKJENT', 'AVVIST'].find( (s: string) => s === status);
};

const isAbleToTransferAgain = (status: string ): boolean => {
    return !!['OPPRETTET_SPAREMAAL_FEILET', 'AHV_SCORE_FOR_HOY'].find( (s: string) => s === status);
};

const resetForm = (state: State): void => {
    const defaultValues = getDefaultValues(state.inputContent);
    state.formAction.reset(defaultValues);
};

const toggleDetailResult = (props: Props, state: State, setState: (s: State) => void, data: SparingTilBarnWithTool, remove=false ): void => {
    const view = JSON.parse(JSON.stringify(state.view));
    const list: SparingTilBarnWithTool[] = [];
    const index = view.resultList.findIndex( (d: any) => data.id === d.id );
    const open = view.resultList[(index +1)]?.mode === 'caption';

    view.resultList.forEach( (d: SparingTilBarnWithTool) => {
        if ( open ) {
            if ( !d.mode && (!remove || data.id !== d.id) ) { list.push(d); }
        } else if ( d.id === data.id ) {
            list.push(d);
            list.push({...d, mode: 'caption' });
        } else if ( !d.mode ) {
            list.push( d );
        }
    });

    view.resultList = list;
    resetForm( state );
    const update = {...state, view, detail: open ? undefined : {loading: true }};
    setState(update);

    if ( open ) { return; }
    props.action.dispatch(getIssueAML(data.id, (aml: null | StringObject ) => {
        const inputContent = JSON.parse(JSON.stringify(state.inputContent));
        const action = inputContent.find( (input: InputContent) => input.name === 'action' );
        if ( action && action.option ) {
            if ( !isAbleToApprove(data.status, aml) ) {
                action.option = action.option.filter( (option: SelectOption) => !/approve|retranfer/i.test(option.id) ); 
            }
            if ( !isAbleToDecline(data.status) ) {
                action.option = action.option.filter( (option: SelectOption) => option.id !== 'decline' ); 
            }
            if ( !isAbleToTransferAgain(data.status) ) {
                action.option = action.option.filter( (option: SelectOption) => option.id !== 'retranfer' ); 
            }
        }
        setState({...update, detail: {loading: false, data, aml, inputContent}});
    }));
};

const changeTab = (state: State, setState: (s: State) => void, selected: string ): void => {
    setState({...state, menuSelected: selected });
};

const sortView = (state: State, setState: (s: State) => void, order: Order ): void => {
    if ( !order.sorting ) { return; }

    const orderList = JSON.parse(JSON.stringify(state.view.orderList));
    const searchConfig = JSON.parse(JSON.stringify(state.searchConfig));

    const found = orderList.find( (d: Order) => d.id === order.id );
    if ( !found ){ return; }

    found.sorting.status += (found.sorting.status === 2 ? -2 : 1);
    searchConfig.sortingColumns = orderList.reduce( (p:StringObject, d: Order) => {
        if ( d.sorting?.status ) {
            p[d.sorting.key] = d.sorting.status === 1 ? 'asc' : 'desc';
        }  
        return p;
    }, {});

    setState({...state, searchConfig, searchId: generateId('search'), view: {orderList, resultList: undefined, paging: undefined}});
};

/******************************************************************************
 == EXTERNAL FUNCTION ==
******************************************************************************/
export const search = (props: Props, state: State, setState: (s: State) => void, data: StringObject, errorList: ErrorItem[], cancel=false ): void => {
    if ( cancel ) { resetForm(state); }
    if ( errorList.length && !cancel ) { return; }

    const values = getFormValues( state.formAction.getValues, state.searchTool );
    const searchConfig = JSON.parse(JSON.stringify(state.searchConfig));
    searchConfig.bankregnrFilter = values.searchBankId;
    searchConfig.foedselsnummerFilter = values.searchPersonId;
    setState({...state, searchId: generateId('search'), searchConfig, view: {...state.view, resultList: undefined, paging: undefined}});
};

export const updateTabMenuDescription = (state: State, setState: (f: (s: State) => State) => void, status?: null | SparingTilBarnStatusResultat, previous?: null | SparingTilBarnStatusResultat  ): void => {
    const ignore = !status?.statusCountMap ||
        JSON.stringify((previous?.statusCountMap ?? {})) === JSON.stringify(status.statusCountMap);
    if ( ignore ) { return; }

    const pin: { [k: string]: number } = status.statusCountMap;
    const tabMenu = JSON.parse(JSON.stringify(state.tabMenu));
    tabMenu.forEach( (menu: AppMenu) => {
        // const count = state.tabMenuStatusConfig[menu.id].reduce( (sum: number, key: string) => {
        //     return (sum + (pin[key] || 0));
        // }, 0) - ( /lead|new/i.test(menu.id) ? (pin['SIGNERT_AV_ALLE_VERGER'] || 0) : 0);
        const count = state.tabMenuStatusConfig[menu.id].reduce( (sum: number, key: string) => {
            return (sum + (pin[key] || 0));
        }, 0);
        menu.description = count > 0 ? `#${count}` : '';
    });

    setState( (s: State) => {
        return {...s, tabMenu};
    });
};

export const submit = (props: Props, state: State, setState: (s: State) => void, data: StringObject, errorList: ErrorItem[], cancel=false  ): void => {
    if ( cancel ) { return resetForm(state); }
    if ( errorList.length || !state.detail?.data?.id ) { return; }

    setState({...state, detail: {...state.detail, message: undefined}});
    const values = getFormValues( state.formAction.getValues, state.inputContent );
    const config: IssueActionConfig = {
        id: state.detail.data.id,
        note: (values.note || '').trim() || undefined,
        action: values.action || undefined,
        file: values.file ? state.storage[values.file] : undefined,
    };

    const keys = ['note', 'file', 'action'];
    const any = keys.find( (key: string) => !!config[key as keyof IssueActionConfig] );
    if ( !any ) { return; }

    setState({...state, onAction: true});
    props.action.dispatch(postIssueAction(config, (result: {[k: string]: boolean; }) => {
        const message = keys.map( (key: string) => {
            const msg: MessageProps = {type: 'success', text: ''};
            if ( !config[key as keyof IssueActionConfig] || result[key as keyof IssueActionConfig] === undefined ) { return msg; }

            const failed = result[key as keyof IssueActionConfig] === false;
            if ( failed ) { msg.type = 'error'; }

            if ( key === 'note' ) {
                msg.text = `Kommentar ${failed ? 'feilet.' : 'er lagt til.'}`;
            } else if ( key === 'file' ) {
                msg.text = `Filopplasting ${failed ? 'feilet.' : 'er fullført.'}`;
            } else if ( key === 'action' ) {
                msg.text = `Status endring ${failed ? 'feilet.' : 'er endret.'}`;
            }
            return msg;
        }).filter( (msg: MessageProps) => !!msg.text);

        const id = generateId('issue');
        if ( result.action && config.action && state.detail && state.detail.inputContent ) {
            const textConfig: StringObject = {
                approve: 'Saken er flyttet til mappen "Godkjente saker"',
                decline: 'Saken er flyttet til mappen "Avslåtte saker"',
                retranfer: 'Saken er flyttet til mappen "Godkjente saker"',
            };
            const moving = textConfig[values.action] || `Saken er flyttet til "${values.action}"`;
            const update = {...state, id, detail: {...state.detail, moving, message}};
            setState(update);
            // @ts-ignore
            setTimeout( () => { toggleDetailResult(props, update, setState, update.detail.data, true); }, 2000);
        } else {
            setState({...state, id, detail: {...state.detail, message}});
            resetForm( state );
            const fileRemoveBtn = document.getElementById('file-field-remove-btn');
            if ( fileRemoveBtn ) { fileRemoveBtn.click(); }
            setTimeout( () => { setState({...state, id, detail: {...state.detail, message: undefined}}); }, 3000);
        }
    }));
};

export const change = (props: Props, state: State, setState: (s: State) => void, content: InputContent, value: string, file?: any ): void => {
    if ( content.type !== Constant.typeFilefield ) { return; }
    // @ts-ignore
    state.storage[value] = file;
};

export  const click = (props: Props, state: State, setState: (s: State) => void, e: null | MouseEvent, key='', data: any ): void => {
    if ( e && typeof(e.preventDefault) === 'function' ) {
        e.preventDefault();
    }

    if ( key === 'open-detail' ) {
        toggleDetailResult(props, state, setState, data );
    } else if ( key === 'change-tab' ) {
        changeTab( state, setState, data );
    } else if ( key === 'change-page' ) {
        setState({
            ...state, 
            searchId: generateId('search'),
            view: {...state.view, paging: undefined, resultList: undefined},
            searchConfig: {...state.searchConfig, pageNumber: data || 0 },
        });
    } else if ( key === 'sorting' && data ) {
        sortView(state, setState, data);
    }
};



