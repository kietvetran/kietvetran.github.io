import React, { useState, useEffect, useRef  } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Dispatch } from 'redux';
import { useForm } from 'react-hook-form';
import { ReducerState } from '../../reducers';
import { getLastPathname, createRegexp } from '../../common/util/Functions';
import { StringObject, MultipleObject, Order, FundwithTool } from '../../domain/types';
import { InputContent } from '../../domain/forms';
import { AppMenu } from '../../domain/app';
import FormInput from '../../common/FormInput/FormInput'; 
import ResultList from '../../common/ResultList/ResultList';
import TabMenu from '../../common/TabMenu/TabMenu';
import InputContentFundFilter from '../../static/data/InputContentFundFilter';
import OrderListFundList from '../../static/data/OrderListFundList';
import useFundList from '../../hooks/useFundList';
import { FundInfo } from '../../generated-types.d';

import './Fund.scss';

export interface Props {
    urlRoot: string;
    action: { dispatch: Dispatch };
};

export interface State {
    fundList?: FundInfo[];
    overviewFundFilterInputContent: InputContent[];
    menuSelected: string;
    tabMenu: AppMenu[];
    view: { [k: string]: {
        formAction: MultipleObject;
        orderList: Order[];
        showDescription?: boolean;
        search?: string;
        resultList?: null | FundwithTool[];
    }};
    timer: MultipleObject;
};

const getFundList = (fundList?: FundInfo[], search='', showDescription=false ): any => {
    let out: any = [];
    if ( !fundList ) { return out; }

    const reg = search ? createRegexp(search, true, true, 2) : null;
    const searchKeyList = ['name', 'isin', 'id'];
    const list = JSON.parse(JSON.stringify(fundList)).map( (d: FundInfo) => {
        const found = reg ? !!searchKeyList.find( (key: string) => {
            return !!`${d[key as keyof FundInfo] || ''}`.match( reg );
        }) : true;

        return found ? {    
            ...d,                    
            isASKcompatible: d.shareSavingsAccountCompatible ? 'Ja' : 'Nei',
            tool: [
                { id: 'morningstar', name: 'Produktark', url: d.keyInvestorInformationDocumentUrl, style: 'link -external'},
            ]
        } : null;
    }).filter( (d: FundInfo) => !!d);

    if ( showDescription ) {
        list.forEach( (data: any) => {
            out.push( data );
            if ( !data.description ) { return;}

            out.push({ mode: 'colspan', colspanElement: <ul className="fund-description-list">
                {data.description.split("\n").map((t: string, i:number) => { return <li key={`desc-${i}`}>{t}</li> })}
            </ul>})
        });
    } else { out = list; }

    return out;
};

const searchOnFundlist = (state: State, setState: (s: State) => void, cnt: InputContent, value: string ): void => {
    if ( cnt.name === 'fundShowDescription' ) {
        const list = getFundList(state.fundList, state.view.overview.search, (!!value) );        
        setState({...state, view: {...state.view, overview: {...state.view.overview, showDescription: !!value, resultList: list} }});
    } else {
        clearTimeout( (state.timer.search || 0 ));
        state.timer.search = setTimeout( () => {
            const list = getFundList(state.fundList, value, state.view.overview.showDescription );
            setState({...state, view: {...state.view, overview: {...state.view.overview, search: value, resultList: list} }});
        }, 300);
    }
};

export default ( props: Props ): JSX.Element => {
    useFundList();
    const fund = useSelector((state: ReducerState) => state.fund );
    const location = useLocation();
    const [state, setState] = useState<State>({
        timer: useRef<StringObject>({}).current,
        overviewFundFilterInputContent: JSON.parse(JSON.stringify(InputContentFundFilter)),
        menuSelected: getLastPathname(location.pathname),
        tabMenu: [
            {id: 'overview',  name: 'Oversikt', url: `${props.urlRoot}/fund/overview`,  tag: 'h2'},
        ],
        view: {
            overview: {
                formAction: useForm<StringObject>({mode: 'onBlur'}),
                search: '',
                showDescription: false,
                orderList: JSON.parse(JSON.stringify(OrderListFundList)),
                resultList: undefined,
            }
        },
    });

    const resultCount = (state.view.overview.resultList ?? [])
        .filter( (d: any) => d.mode !== 'colspan').length;

    useEffect(() => {
        setState((s: State) => {
            return {...s, menuSelected: getLastPathname(location.pathname),};
        });
    }, [location.pathname, props.action]);

    useEffect(() => {
        if ( fund.list ) {
            setState((s: State) => {
                return {
                    ...s, 
                    fundList: fund.list,
                    view: {...s.view, overview: {...s.view.overview, resultList: getFundList(fund.list) }}
                };
            });
        } else if ( fund.list === null ) {
            setState((s: State) => {
                return {...s, view: {...s.view, overview: {...s.view.overview, resultList: null}}};
            });
        }
    }, [fund.list, setState]);

    return (
        <div className={classNames('fund-wrapper', `-${state.menuSelected}`)}>
            <TabMenu list={state.tabMenu} selected={state.menuSelected} />
            <div className="tab-content-wrapper">
                { state.menuSelected === 'overview' && <div className="fund-content">
                    <FormInput 
                        type="one-line"
                        content={state.overviewFundFilterInputContent} 
                        formAction={state.view.overview.formAction}
                        changeCallback={(content: InputContent, value: string) => { searchOnFundlist(state, setState, content, value); }}
                    />

                    { !!state.view.overview && <div className="fund-overview-info-wrapper">
                        <ResultList 
                            header={{text: [[{text: ' '}, {text: `Antall ${resultCount}`}]]}}
                            orderList={state.view.overview.orderList}
                            resultList={state.view.overview.resultList}
                        /> 
                    </div>}
                </div>}
            </div>
        </div>
    );
};
