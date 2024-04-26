import React, { useState, MouseEvent, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import classNames from 'classnames';
import { Dispatch } from 'redux';
import { useForm } from 'react-hook-form';
import { getLastPathname } from '../../common/util/Functions';
import { StringObject, MultipleObject, ExcelTable, ExcelTableItem, Order, NotificationWithTool, PagingConfig } from '../../domain/types';
import { PensionInfoEpk, PensionInfoPkb, Notification, NotificationsRequest } from '../../generated-types.d';
import { AppMenu } from '../../domain/app';
import { InputContent, ErrorItem } from '../../domain/forms';
import FormInput from '../../common/FormInput/FormInput'; 
import ResultList from '../../common/ResultList/ResultList';
import TabMenu from '../../common/TabMenu/TabMenu';
import Message from '../../common/Message/Message';
import Spinner from '../../common/Spinner/Spinner';
import Paging from '../../common/Paging/Paging';
import FlexTextHolder, {Props as FlexTextHolderProps } from '../../common/FlexTextHolder/FlexTextHolder';
import OrderListEPKperson from '../../static/data/OrderListEPKperson';
import OrderListEPKnotification from '../../static/data/OrderListEPKnotification';
import InputContentEPKperson from '../../static/data/InputContentEPKperson';
import { 
    InputContentEPKnotificationSecond,
    InputContentEPKnotificationThird,
} from '../../static/data/InputContentEPKnotification';
import { submit, change, click, finalize, updateManualProcessingResult, initEPKnotificationInputContentFirst} from './Functions';

import './EPK.scss';

export interface Props {
    urlRoot: string;
    action: { dispatch: Dispatch };
};

export interface State {
    personInputContent: InputContent[];
    notificationInputContentFirst: InputContent[][];
    notificationInputContentSecond: InputContent[];
    notificationInputContentThird: InputContent[];
    menuSelected: string;
    tabMenu: AppMenu[];
    excelTable?: ExcelTable;
    detail?: MultipleObject;
    view: { [k: string]: {
        formAction: MultipleObject;
        orderList: Order[];
        search?: null | StringObject | NotificationsRequest;
        resultList?: null | NotificationWithTool[];
        result?: null | Notification[];
        info?: FlexTextHolderProps;
        epks?: null | PensionInfoEpk[];
        pkbs?: PensionInfoPkb[];
        paging?: PagingConfig;
        checkedList?: NotificationWithTool[];
    }};
};

export default ( props: Props ): JSX.Element => {
    const location = useLocation();
    const [state, setState] = useState<State>({
        view: {
            person: {
                formAction: useForm<StringObject>({mode: 'onBlur'}),
                search: undefined,
                orderList: JSON.parse(JSON.stringify(OrderListEPKperson)),
            },
            notification: {
                formAction: useForm<StringObject>({mode: 'onBlur'}),
                search: undefined,
                orderList: JSON.parse(JSON.stringify(OrderListEPKnotification)),
                paging: {length: 0, count: 20, index: 0},
            },
        },
        personInputContent: JSON.parse(JSON.stringify(InputContentEPKperson)),
        notificationInputContentFirst: initEPKnotificationInputContentFirst(),
        notificationInputContentSecond: JSON.parse(JSON.stringify(InputContentEPKnotificationSecond)),
        notificationInputContentThird: JSON.parse(JSON.stringify(InputContentEPKnotificationThird)),
        menuSelected: getLastPathname(location.pathname),
        tabMenu: [
            {id: 'person',       name: 'EPK - personsøk',      url: `${props.urlRoot}/epk/person`,       tag: 'h2'},
            {id: 'notification', name: 'EPK - notifikasjoner', url: `${props.urlRoot}/epk/notification`, tag: 'h2'},
        ],
    });

    useEffect(() => {
        setState((s: State) => {
            return {...s, menuSelected: getLastPathname(location.pathname)};
        });
    }, [location.pathname, props.action]);

    return (
        <div className={classNames('epk-wrapper', `-${state.menuSelected}`)}>
            <TabMenu list={state.tabMenu} selected={state.menuSelected} />
            <div className="tab-content-wrapper">
                { state.menuSelected === 'person' && <div className="epk-content">
                    <FormInput 
                        type="one-line"
                        content={state.personInputContent} 
                        formAction={state.view.person.formAction} 
                        submitText="Søk"
                        cancelText="Nullstill"
                        submitCallback={ (data: StringObject, errorList: ErrorItem[], cancel=false) => { submit(props, state, setState, data, errorList, cancel); }}
                    />

                    { state.view.person.search === null && <div className="paragraph"><Spinner /></div>}

                    { state.view.person.search && <>
                        { state.view.person.info && <div className="epk-person-info-wrapper">
                            <div className="sub-title_">EPK Tilbyder</div>
                            <Message namespace="epk-person-info">
                                <FlexTextHolder {...state.view.person.info} />
                            </Message>
                        </div>}

                        <div className="epk-person-epk-data-wrapper">
                            { ['epks', 'pkbs'].map( (key: string) => {
                                // @ts-ignore
                                const list = state.view.person[key];
                                const count = (list || []).length;
                                return list === undefined || (key === 'pkbs' && !count) ? null : <div key={`person-${key}`} className="paragraph -large">
                                    <ResultList 
                                        header={{text: [[{text: `${key.replace('s','').toUpperCase()} data`}, {text: count ? `Antall ${count}` : ''}]]}}
                                        orderList={state.view.person.orderList}
                                        resultList={list}
                                    />                                     
                                </div>
                            })}
                        </div>
                    </> }
                </div>}

                { state.menuSelected === 'notification' && <div className="epk-content">
                    <FormInput 
                        content={state.notificationInputContentFirst} 
                        secondContent={state.notificationInputContentSecond} 
                        thirdContent={state.notificationInputContentThird} 
                        formAction={state.view.notification.formAction} 
                        submitText="Søk"
                        cancelText="Nullstill"
                        submitCallback={ (data: StringObject, errorList: ErrorItem[], cancel=false) => { submit(props, state, setState, data, errorList, cancel); }}
                        changeCallback={ (content: InputContent, value: string) => {change( props, state, setState, content, value ); }}
                    />

                    { state.view.notification.search === null && <div className="paragraph"><Spinner /></div>}

                    { state.view.notification.search && <div className="epk-notification-epk-data-wrapper">
                        <ResultList 
                            header={{text: [[
                                {
                                    text: 'Søke resultat'
                                }, {   
                                    text: `Antall ${(state.view.notification.result || []).length}`,
                                }
                            ]]}}
                            orderList={state.view.notification.orderList}
                            resultList={state.view.notification.resultList}
                            click={(e: null | MouseEvent, key='', data: any) => { click(props, state, setState, e, key, data); }}
                        >
                            { !!state.detail && <div className={`result-detail-info note-table-detail-info -${state.detail.needToFinalize ? 'need-finalize' : 'normal'}`}> 
                                { !!state.detail.needToFinalize && <div className="note-detail-action-wrapper">
                                    { state.detail.needManualProcessing && <div className="paragraph -large">
                                        <Message text={state.detail.needManualProcessing} />
                                    </div>}

                                    <FormInput 
                                        content={state.detail.inputContent}
                                        formAction={state.view.notification.formAction} 
                                        submitText={state.detail.allowFinalize ? 'FINALIZED' : ''}
                                        submitCallback={ () => { finalize(props, state, setState); }}
                                        changeCallback={ (content: InputContent, value: string) => {updateManualProcessingResult( props, state, setState, content, value ); }}
                                    />

                                    { state.detail.message && <Message {...state.detail.message}/>}
                                </div> }

                                <ul className="flat note-detail-list table">
                                    { (state.detail.list || []).map( (d: StringObject, i: number) => (
                                        <li key={`note-detail-item-${i}`}>
                                            <div className="note-item-label">{d.label || ''}</div>
                                            <div className="note-item-label">{d.value || ''}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>}
                        </ResultList> 

                        { state.view.notification.paging && state.view.notification.paging.length > 0 && <div className="paragraph center -include-top">
                            <Paging {...state.view.notification.paging} click={(index: number) => { click(props, state, setState, null, 'change-page', index);}} />
                        </div> }
                    </div>}
                </div>}
            </div>

            { state.excelTable && <table id="excel-table" className="aria-visible">
                <thead>
                    <tr>
                        { state.excelTable.head.map( (d: ExcelTableItem, i: number) => (
                            <th key={`xcl-head-${i}`} style={d.style || {}}>{d.text}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    { state.excelTable.body.map( (row: ExcelTableItem[], i: number) => (
                        <tr key={`xcl-body-${i}`}>
                            {row.map( (d: ExcelTableItem, j: number) => (
                                <td key={`xcl-body-${i}-${j}`} style={d.style || {}}>{d.text}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
};
