import React from 'react';
import classNames from 'classnames';
import { StringObject } from '../../domain/types';

import './Spinner.scss';

interface Props {
    size?: 'big' | 'medium';
    polite?: boolean;
    type?: string;
};

export default (props: Props): JSX.Element => {
    const attr: StringObject = {
        role: 'status',
        ...(props.polite !== false ? { 'aria-live': 'polite'} : {}),
    };

    return (
        <div  {...attr} className={classNames('spinner-wrapper', `-${props.type || 'normal'}`, {
            '-big': props.size === 'big',
            '-medium': props.size === 'medium',
        })}>
            <span>Vent litt</span>
        </div>
    );
};
