import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { getText } from '../util/Functions';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import { Order, MultipleObject, SparingTilBarnWithTool, DokumentMetadataDTOwithTool, Tool } from '../../domain/types';
import FlexTextHolder, { Props as FlexTextHolderProps } from '../FlexTextHolder/FlexTextHolder';

import './ResultList.scss';

interface Props {
    // click?: ( e: null | MouseEvent<HTMLButtonElement | HTMLAnchorElement>, key: string, data?: any) => void;
    click?: ( e: null | MouseEvent, key: string, data?: any) => void;
    resultList?: null | MultipleObject[] | SparingTilBarnWithTool[] | DokumentMetadataDTOwithTool[];
    orderList?: Order[];
    toolList?: Tool[];
    children?: JSX.Element | JSX.Element[] | boolean;
    header?: FlexTextHolderProps;
    emptyText?: string;
    errorText?: string;
};

export default ({orderList=[], toolList=[], resultList, header, click, children, emptyText, errorText}: Props): JSX.Element => {
    const isError = resultList === null;
    const isEmpty = resultList && resultList.length === 0;

    return <div className={classNames('result-wrapper', {
        '-is-error': isError,
        '-is-empty': isEmpty,
    })}>
        { (resultList ?? []).length > 0 && header && <div className="result-header">
            <FlexTextHolder {...header} />
        </div>}
        <div className="result-holder">
            { (resultList || []).length > 0 && <table className="result-list table -has-header">
                <thead>
                    <tr className="result-header">
                        { orderList.map( (order: Order, j: number) => {
                            const title = (order.title instanceof Array ? order.title : [order.title || '']).join(' ').trim();
                            return <th 
                                key={`result-item-header-${j}`} 
                                className={`item -${order.id} -${order.style || 'normal'} -${(order.key instanceof Array ? order.key : [order.key]).join(' -') }`}
                            >
                                <div className="label-row">
                                    { !!order.name && order.sorting && click ? 
                                        <a href="#" title={title} role="button" onClick={(e: MouseEvent)=>{ click(e, 'sorting', order)}} className={classNames('sort-item', {
                                            '-sorted-decrease':  order.sorting.status === 1,
                                            '-sorted-increase': order.sorting.status === 2,
                                        })}>{order.name}</a> : <span>{order.name || ''}</span> }
                                </div>
                            </th>  
                        })}
                    </tr>
                </thead>
                <tbody>
                    { (resultList || []).map( (data: any, i: number) => {
                        const nextMode = (resultList || [])[(i+1)]?.mode || 'normal';
                        return <tr key={`result-item-data-${i}`} className={`result-info -${data.mode || '-basic'} -next-mode-${nextMode}`}>

                            { data.mode === 'caption' && <td colSpan={orderList.length} className="item -caption">{children}</td> }
                            { data.mode === 'colspan' && <td colSpan={orderList.length} className="item -colspan">{data.colspanElement}</td> }

                            { data.mode !== 'caption' && data.mode !== 'colspan' && <>
                                { orderList.map( (order: Order, j: number) => {
                                    const cellStyle = `item -${order.id} -${order.style || 'normal'} -${(order.key instanceof Array ? order.key : [order.key]).join(' -') }`.replace( /\./g, '-');
                                    return <td  key={`result-item-data-${i}-${j}`} className={cellStyle}>
                                        {order.id !== 'tool' && <div>
                                            { ['key', 'secondKey', 'thirdKey', 'fourthKey'].map( (key: string, x: number) => {
                                                const config = order.config instanceof Array ? (order.config[x] || {}) : (order.config || {});
                                                const text = getText({...order, key: order[key]}, data, x); 
                                                const optionalText = !config.optionalKey ? '' : 
                                                    getText({...order, key: config.optionalKey}, data, x);

                                                const itemStyle = `block type-${config.type || 'text'} -${!text && !!optionalText ? 'optional-text' : 'normal'}`;                                            
                                                /* eslint-disable */
                                                return text  || optionalText ? <span key={`text-${i}-${j}-${x}`} className={itemStyle}>
                                                    { !!config.label && <span className="item-label" title={config.title || ''}>{config.label}</span> }

                                                    { config.click && click ? <a href="#" role="button" className={`link -decoration -${config.style || 'normal'}`} onClick={(e: MouseEvent) => { click(e, config.click, data); }}>
                                                        {text || optionalText}
                                                    </a> : <span className="item-text">{text || optionalText}</span>}                                                    
                                                </span> : null;
                                                /* eslint-enable */
                                            })}
                                        </div>}

                                        {order.id === 'tool' && <div>
                                            { (data.tool || toolList).map( (tool: Tool, x: number) => {
                                                return <div key={`tool-${i}-${j}-${x}`}>
                                                    { !!tool.url && <a href={tool.url} target="blank" className={`link -${tool.style || 'normal'}`}>{tool.name}</a> }
                                                    { !tool.url && click && tool.action &&  <a 
                                                        href="#" role="button" className={classNames(`link -${tool.style || 'normal'}`, {'-checked': tool.checked})} 
                                                        onClick={(e: MouseEvent) => { click(e, tool.action, data); }}
                                                    >{tool.name}</a>}
                                                </div>
                                            })}
                                        </div>}
                                    </td>
                                })}
                            </>}
                        </tr>;

                    })}
                </tbody>
            </table>}

            { isError && <div className="paragraph -include-top"><Message text={errorText || 'Ops, noe gikk galt!'} type="error"/></div> }
            { resultList === undefined && <div className="paragraph -include-top"><Spinner /></div> }
            { isEmpty && <div className="result-empty-list">{emptyText || 'Tomt'}</div> }
        </div>
    </div>
};
