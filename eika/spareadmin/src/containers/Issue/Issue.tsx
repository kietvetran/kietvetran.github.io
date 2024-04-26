import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useForm } from 'react-hook-form';
import { ReducerState } from '../../reducers';
import { getLastPathname, generateId } from '../../common/util/Functions';
import { AppMenu } from '../../domain/app';
import { StringObject, MultipleObject, Order, SparingTilBarnWithTool, PagingConfig } from '../../domain/types';
import { InputContent, ErrorItem } from '../../domain/forms';
import { SearchFlags, SparingTilBarnStatusResultat, SparingTilBarnStatus } from '../../generated-types';
import FormInput from '../../common/FormInput/FormInput'; 
import ResultList from '../../common/ResultList/ResultList';
import TabMenu from '../../common/TabMenu/TabMenu';
import Paging from '../../common/Paging/Paging';
import Spinner from '../../common/Spinner/Spinner';
import Message, {Props as MessageProps} from '../../common/Message/Message';
import Constant from '../../static/data/Constant';
import OrderListIssue from '../../static/data/OrderListIssue';
import InputContentIssue from '../../static/data/InputContentIssue';
import InputContentIssueSearch from '../../static/data/InputContentIssueSearch';
import usePrevious from '../../hooks/usePrevious';
import useIssueSearchResult from '../../hooks/useIssueSearchResult';
import useIssueStatusCount from '../../hooks/useIssueStatusCount';
import IssueComment from './IssueComment';
import IssueAML from './IssueAML';
import IssueCertificate from './IssueCertificate';
import { submit, change, search, click, updateTabMenuDescription } from './Functions';

import './Issue.scss';

export interface Props {
    urlRoot: string;
    action: { dispatch: Dispatch };
};

export interface State {
    id: string;
    onAction: boolean;
    searchTool: InputContent[];
    inputContent: InputContent[];
    menuSelected: string;
    tabMenu: AppMenu[];    
    tabMenuStatusConfig: {[k: string]: SparingTilBarnStatus[]};
    detail?: { 
        data?: null | SparingTilBarnWithTool;
        message?: MessageProps[];
        loading?: boolean;
        aml?: null | StringObject;
        inputContent?: InputContent[];
        moving?: string;
    },
    searchId: string;
    searchConfig: SearchFlags;
    formAction: MultipleObject;
    view: {
        orderList: Order[];
        resultList?: null | SparingTilBarnWithTool[];
        paging?: PagingConfig;
    },
    storage: MultipleObject;
};

export default ( props: Props): JSX.Element => {
    const location = useLocation();
    const issue = useSelector((state: ReducerState) => state.issue );
    const [state, setState] = useState<State>({
        id: generateId('issue'),
        onAction: false,
        formAction: useForm<StringObject>({mode: 'onBlur'}),
        searchTool: JSON.parse(JSON.stringify(InputContentIssueSearch)),
        view: {
            orderList: JSON.parse(JSON.stringify(OrderListIssue)),
        },
        inputContent: JSON.parse(JSON.stringify(InputContentIssue)),
        menuSelected: getLastPathname(location.pathname),        
        tabMenu: [
            {id: 'lead',     name: 'Opprettede saker', url: `${props.urlRoot}/issue/lead`,      tag: 'h2', },
            {id: 'new',      name: 'Nye saker',       url: `${props.urlRoot}/issue/new`,       tag: 'h2', },
            {id: 'approved', name: 'Godkjente saker', url: `${props.urlRoot}/issue/approved`,  tag: 'h2', },
            {id: 'rejected', name: 'Avslåtte saker',  url: `${props.urlRoot}/issue/rejected`,  tag: 'h2', },
            {id: 'failed',   name: 'Feilede saker',   url: `${props.urlRoot}/issue/failed`,    tag: 'h2', },
        ],
        tabMenuStatusConfig: JSON.parse(JSON.stringify(Constant.issueTabMenuStatusConfig)),
        searchId: generateId('search'),
        searchConfig: {
            pageNumber: 0,
            pageSize: 20,
            sortingColumns: {opprettet: 'asc'},
            statuses: Constant.issueTabMenuStatusConfig[getLastPathname(location.pathname)] || [],
            bankregnrFilter: '',
            foedselsnummerFilter: '',
        },
        storage: useRef<MultipleObject>({}).current,
    });

    useIssueStatusCount( state );
    useIssueSearchResult( state, setState );
    const previousStatus: null | SparingTilBarnStatusResultat = usePrevious( issue.status );

    useEffect(() => {
        setState((s: State) => { 
            const menuSelected = getLastPathname(location.pathname);
            const searchConfig = {...s.searchConfig, statuses: s.tabMenuStatusConfig[menuSelected] ?? []};
            const resultList = s.menuSelected === menuSelected ? s.view.resultList : undefined;
            const searchId = s.menuSelected === menuSelected ? s.searchId : generateId('search');
            return {...s, searchId, menuSelected, searchConfig, view: {...s.view, resultList}};
        });
    }, [location.pathname]);

    useEffect(() => {
        updateTabMenuDescription(state, setState, issue.status, previousStatus);
    }, [state, setState, issue.status, previousStatus]);

    return (
        <div id={state.id} className={classNames('issue-wrapper', {})}>
            <div className="issue-header-wrapper">
                <FormInput
                    type="one-line"
                    content={state.searchTool} 
                    formAction={state.formAction} 
                    submitText="Søk"
                    cancelText="Nullstill"
                    submitCallback={ (data: StringObject, errorList: ErrorItem[], cancel=false) => { search(props, state, setState, data, errorList, cancel); }}
                />
            </div>

            <TabMenu list={state.tabMenu} selected={state.menuSelected} />
            <div className="tab-content-wrapper">
                <ResultList
                    header={{text: [[{text: ''}, {text: state.view.paging ? `Antall ${state.view.paging.length || 0}` : '' }]]}}
                    orderList={state.view.orderList}
                    resultList={state.view.resultList}
                    click={(e: null | MouseEvent, key='', data: any) => { click(props, state, setState, e, key, data); }}
                > 
                    { !!state.detail && <div className="result-detail-wrapper">
                        { !!state.detail.moving && <div className="on-action-holder -moving">
                            <Message text={state.detail.moving} type="success"/>
                        </div> }
                        { !!state.detail.loading && <div className="on-action-holder"><Spinner /></div> }
                        { !!state.detail.data && <div className="result-detail-info">
                            <div className="result-detail-image-wrapper">
                                <IssueCertificate id={state.detail.data.id} parent={state.id}/>
                            </div>
                            <div className="result-detail-form-wrapper">
                                <IssueAML data={state.detail.data} aml={state.detail.aml} />

                                { !!state.detail.inputContent && <FormInput 
                                    content={state.detail.inputContent} 
                                    formAction={state.formAction} 
                                    submitText="Lagre"
                                    submitCallback={ (data: StringObject, errorList: ErrorItem[]) => { submit(props, state, setState, data, errorList); }}
                                    changeCallback={ (content: InputContent, value: string, file?: any) => {change( props, state, setState, content, value, file ); }}
                                /> }
                                { (state.detail.message || []).map( (msg: MessageProps, i: number) => (
                                    <div key={`msg-${i}`} className="detail-message-holder"><Message {...msg} /></div>
                                ))}
                                <IssueComment id={state.detail.data.id} parent={state.id} /> 
                            </div>
                        </div>}
                    </div>}
                </ResultList>

                { state.view.paging && <div className="paragraph center -include-top">
                    <Paging {...state.view.paging} click={(index: number) => { click(props, state, setState, null, 'change-page', index);}} />
                </div> }
            </div>
            { state.onAction && <div className="on-action-holder"><Spinner /></div>}
        </div>
    );
};
