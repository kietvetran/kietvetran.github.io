import React, { useState } from 'react';
import { Order } from '../../domain/types';
import OrderListIssueLog from '../../static/data/OrderListIssueLog';
import ResultList from '../../common/ResultList/ResultList';
import useIssueComment from '../../hooks/useIssueComment';
import { SparingTilBarnKommentar } from '../../generated-types.d';

import './Issue.scss';

export interface Props {
    // eslint-disable-next-line
    id: string | number;
    // eslint-disable-next-line
    parent: string;
};

export interface State {
    orderList: Order[];
    resultList?: null | SparingTilBarnKommentar[];
};

export default ( props: Props ): JSX.Element => {
    const [state, setState] = useState<State>({
        orderList: JSON.parse(JSON.stringify(OrderListIssueLog)),
    });

    useIssueComment( props, state, setState );

    return <div className="result-detail-log-wrapper">
        <ResultList
            header={{text: [[{text: 'Notater'}, {text: state.resultList !== undefined ? `Antall ${(state.resultList || []).length}` : '' }]]}}
            orderList={state.orderList}
            resultList={state.resultList}
            emptyText="Ingen notat er lagt inn."
            errorText="Noe gikk galt ved henting av notater."
        /> 
    </div>;
};
