import React, { useState } from 'react';
import Spinner from '../../common/Spinner/Spinner';
import Message from '../../common/Message/Message';
import useIssueCertificate from '../../hooks/useIssueCertificate';

import './Issue.scss';

export interface Props {
    // eslint-disable-next-line
    id: string | number;
    // eslint-disable-next-line
    parent: string;
};

export interface State {
    url?: null | string;
    mimeType: string;
};

export default ( props: Props ): JSX.Element => {
    const [state, setState] = useState<State>({
        url: undefined,
        mimeType: '',
    });

    useIssueCertificate( props, state, setState );

    return <div className="result-detail-certificate-wrapper">
        { state.url === undefined && <Spinner /> }
        { state.url === null && <Message text="Fødselsattest ikke sendt inn" type="info" /> }
        { state.url && /image/i.test((state.mimeType || '')) && 
            <img className="certificate-image" src={state.url} alt="Fødselsattestbilde" />
        }
        { state.url && /pdf/i.test((state.mimeType || '')) && <object data={state.url} type={state.mimeType} className="certificate-pdf">
            <a href={state.url} download>
                Last ned fødselsattest
            </a>
        </object>}
    </div>;
};

