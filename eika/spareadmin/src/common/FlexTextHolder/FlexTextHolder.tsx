import React from 'react';
import { StringObject } from '../../domain/types';
import './FlexTextHolder.scss';

export interface FlexText {
    text?: string | string[];
    name?: string;
    title?: string;
    type?: string;
    style?: StringObject;
    role?: string;
    id?: string;
    element?: JSX.Element | null;
    innerElement?: boolean;
};

export interface Props {
    text: FlexText[] | FlexText[][];
    type?: string;
};

const FlexTextSpan = ({ text }: {text: string | string[] | FlexText | FlexText[]}): JSX.Element => {
    const data = typeof(text) === 'object' ? text : {text};
    if ( data instanceof Array ) {
        return <span className="inner-text"> 
            { data.map( (t: string | string[] | FlexText,i: number) => {
                return <FlexTextSpan key={`inner-text-${i}`} text={t} />
            })}
        </span>
    }

    if ( data.element ) { return data.element }

    const attr: StringObject = { id: data.id || '', title: data.title || ''};
    Object.keys( attr ).forEach((key: string) => {
        if ( !attr[key] ) { delete(attr[key]); }
    });

    return <span {...attr} className={`text -${data.type || 'normal'}`} style={data.style || {}}>
        {data.text instanceof Array ? <FlexTextSpan text={data.text} /> : <>{(data.text || data.name || '')}</>}
    </span>
};

export default ({ text, type }: Props): JSX.Element | null => {
    if ( !text ) { return null; }

    const list = text instanceof Array ? text : [text];
    return <div className={`flex-text-wrapper -${type || 'normal'}`}>
        { list.map( (src, i) => {
            const key = `flex-text-${i}`;
            return <div key={key} className={`flex-text-holder -index-${i} ${src instanceof Array ? `-length-${src.length}` : '-basic'} `}>
                { (src instanceof Array ? src : [src]).map( (t, j) => {
                    return <FlexTextSpan key={`${key}-${j}`} text={t} />
                })}
            </div>;
        })}
    </div>;
}