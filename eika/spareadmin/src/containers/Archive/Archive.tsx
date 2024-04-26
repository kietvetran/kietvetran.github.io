import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Dispatch } from 'redux';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { ReducerState } from '../../reducers';
import { getLastPathname } from '../../common/util/Functions';
import { StringObject, MultipleObject, DokumentMetadataDTOwithTool, Order } from '../../domain/types';
import { Bank } from '../../generated-types.d';
import { InputContent, SelectOption, ErrorItem } from '../../domain/forms';
import { AppMenu } from '../../domain/app';
import FormInput from '../../common/FormInput/FormInput'; 
import ResultList from '../../common/ResultList/ResultList';
import TabMenu from '../../common/TabMenu/TabMenu';
import Spinner from '../../common/Spinner/Spinner';
import Message, {Props as MessageProps} from '../../common/Message/Message';
import InputContentArchiveManualUpload from '../../static/data/InputContentArchiveManualUpload';
import InputContentArchiveSearch from '../../static/data/InputContentArchiveSearch';
import InputContentArchiveUpload from '../../static/data/InputContentArchiveUpload';
import OrderListArchiveSearch from '../../static/data/OrderListArchiveSearch';
import { search, upload, manualUpload, change, click } from './Functions';

import './Archive.scss';

export interface Props {
    urlRoot: string;
    // eslint-disable-next-line
    action: { dispatch: Dispatch };
};

export interface State {
    onAction: boolean;
    message?: MessageProps;
    manualUploadInputContent: InputContent[];
    uploadInputContent: InputContent[][];
    searchInputContent: InputContent[];
    menuSelected: string;
    tabMenu: AppMenu[];
    detail?: MultipleObject[];
    view: { [k: string]: {
        formMessage?: {failed?: string; success?: string};
        formAction: MultipleObject;
        orderList: Order[];
        search?: null | string;
        result?: null | DokumentMetadataDTOwithTool[];
        resultList?: null | DokumentMetadataDTOwithTool[];
    }};
    storage: MultipleObject;
    initedBankList: boolean;
};

export default ( props: Props ): JSX.Element => {
    const reducer = useSelector((state: ReducerState) => state );
    const location = useLocation();
    const [state, setState] = useState<State>({
        onAction: false,
        manualUploadInputContent: JSON.parse(JSON.stringify(InputContentArchiveManualUpload)),
        uploadInputContent: JSON.parse(JSON.stringify(InputContentArchiveUpload)),
        searchInputContent: JSON.parse(JSON.stringify(InputContentArchiveSearch)),
        menuSelected: getLastPathname(location.pathname),
        tabMenu: [
            {id: 'search',  name: 'Søk',               url: `${props.urlRoot}/archive/search`,  tag: 'h2'},
            {id: 'upload',  name: 'Opplasting',        url: `${props.urlRoot}/archive/upload`,  tag: 'h2'},
            {id: 'manual',  name: 'Signeringsordre opplasting', url: `${props.urlRoot}/archive/manual`,   tag: 'h2'},
        ],
        view: {
            search: {
                formAction: useForm<StringObject>({mode: 'onBlur'}),
                search: undefined,
                orderList: JSON.parse(JSON.stringify(OrderListArchiveSearch)),
            },
            upload: {
                formAction: useForm<StringObject>({mode: 'onBlur'}),
                orderList: [],
            },
            manual: {
                formAction: useForm<StringObject>({mode: 'onBlur'}),
                orderList: [],
            },
        },
        storage: useRef<MultipleObject>({}).current,
        initedBankList: false,
    });

   useEffect(() => {
        setState((s: State) => {
            const uploadInputContent = JSON.parse(JSON.stringify(s.uploadInputContent));
            const pin: { [k: string]: InputContent } = {};
            uploadInputContent.forEach( (list: InputContent[]) => {
                list.forEach( (input: InputContent) => { pin[input.name] = input;});
            });

            if ( pin.bank && !(pin.bank.option ?? []).length ) {
                const optionList: SelectOption[] = [];
                pin.bank.defaultValue = reducer.app.advisor?.bankregnr?.value ?? '';
                if ( pin.bank.defaultValue === '0501' ) {
                    pin.bank.defaultValue = '0770';
                }
                (reducer.app.bankList ?? []).forEach( (bank: Bank) => {
                    optionList.push({
                        id: bank.bankregnr.value,
                        name: `${bank.navn} (${bank.bankregnr.value})`,
                    });
                });
                pin.bank.option = optionList;
            }
            return {...s, uploadInputContent, initedBankList: true, menuSelected: getLastPathname(location.pathname),};
        });
    }, [location.pathname, props.action, reducer.app.bankList, reducer.app.advisor]);

    return (
        <div className={classNames('archive-wrapper', `-${state.menuSelected}`)}>
            <TabMenu list={state.tabMenu} selected={state.menuSelected} />
            <div className="tab-content-wrapper">
                { state.menuSelected === 'search' && state.view.search && <div className="archive-content">
                    <FormInput 
                        type="one-line"
                        content={state.searchInputContent} 
                        formAction={state.view.search.formAction} 
                        submitText="Søk"
                        cancelText="Nullstill"
                        submitCallback={ (data: StringObject, errorList: ErrorItem[], cancel=false) => { search(props, state, setState, data, errorList, cancel); }}
                    />

                    { state.view.search.search === null && <div className="paragraph"><Spinner /></div>}

                    { state.view.search.search && <>
                        { !!state.view.search && <div className="archive-search-info-wrapper">
                            <ResultList 
                                header={{text: [[{text: 'Søke resultat'}, {text: `Antall: ${(state.view.search.resultList ?? []).length}`}]]}}
                                orderList={state.view.search.orderList}
                                resultList={state.view.search.resultList}
                                click={(e: null |MouseEvent, key='', data: any) => { click(props, state, setState, e, key, data); }}
                            > 
                                { (state.detail || []).length > 0 && <div className="result-detail-info note-table-detail-info"> 
                                    <ul className="flat note-detail-list table">
                                        { (state.detail || []).map( (d: StringObject, i: number) => (
                                            <li key={`note-detail-item-${i}`}>
                                                <div className="note-item-label">{d.label || ''}</div>
                                                <div className="note-item-label">{d.value || ''}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>}
                            </ResultList>
                        </div>}
                    </>}
                </div>}

                { state.menuSelected === 'upload' && state.view.upload && state.initedBankList && <div className="archive-content">
                    <FormInput 
                        content={state.uploadInputContent} 
                        formAction={state.view.upload.formAction} 
                        submitText="Lagre"
                        cancelText="Nullstill"
                        submitCallback={ (data: StringObject, errorList: ErrorItem[], cancel=false) => { upload(props, state, setState, data, errorList, cancel); }}
                        changeCallback={ (content: InputContent, value: string, file?: any) => {change( props, state, setState, content, value, file ); }}
                    />
                </div>}

                { state.menuSelected === 'manual' && state.view.manual && <div className="archive-content">
                    <FormInput 
                        content={state.manualUploadInputContent} 
                        formAction={state.view.manual.formAction} 
                        submitText="Lagre"
                        cancelText="Nullstill"
                        submitCallback={ (data: StringObject, errorList: ErrorItem[], cancel=false) => { manualUpload(props, state, setState, data, errorList, cancel); }}
                    />
                </div>}
            </div>
            { state.onAction && <div className="on-action-holder"><Spinner /></div>}
            { state.message && <div className="on-action-holder"><Message {...state.message} /></div>}
        </div>
    );
};
