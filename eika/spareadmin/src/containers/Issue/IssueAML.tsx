import React, { useState } from 'react';
import Message from '../../common/Message/Message';
import { getText } from '../../common/util/Functions';
import { StringObject, SparingTilBarnWithTool } from '../../domain/types';
import Constant from '../../static/data/Constant';

import './Issue.scss';

export interface AMLitem {
    id: string;
    name: string;
    note: string;
    style: string;
};

export interface Props {
    data: SparingTilBarnWithTool;
    aml?: null | StringObject;
};

export interface State {
    data: SparingTilBarnWithTool,
    resultList: null | AMLitem[];
};

export default ( props: Props ): JSX.Element => {
    const [state] = useState<State>({
        data: props.data,
        resultList: props.aml ? [
            {id: getText({key: 'foedselsnummer.value'}, props.data ),                   name: 'Barn',     note: '', style: ''},
            {id: getText({key: 'oppretterForelder.foedselsnummer.value'}, props.data ), name: '1. verge', note: '', style: ''},
            {id: getText({key: 'andreForelder.foedselsnummer.value'}, props.data ),     name: '2. verge', note: '', style: ''},
        ].filter( (data: AMLitem) => !!data.id ).map( (data: AMLitem ) => {
            return {
                ...data,
                // @ts-ignore
                note: Constant.dictionary[props.aml[data.id]] || props.aml[data.id] || 'Ikke vurdert', 
                // @ts-ignore
                style: (props.aml[data.id] || '').toLowerCase().replace( /_/g, '-' ), 
            };
        }) : null,
    });

    return <div className="result-detail-aml-wrapper flex-row">
        <div className="sub-title">AHV</div>
        <div className="aml-content">
            { state.resultList === null && <Message text="Ops, noe gikk galt." type="error" /> }
            { state.resultList instanceof Array &&  <>{
                state.resultList.map( (d: AMLitem, i: number) => {
                    return <div key={`aml-item-${i}`} className={`aml-item -${d.style || 'normal'}`}>
                        <span>{`${d.name}: `}</span>
                        <span>{d.note}</span>
                    </div>
                })}
            </>}
        </div>
    </div>;
};
