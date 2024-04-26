import React from 'react';
import classNames from 'classnames';
import './Message.scss';

export interface Props {
    text?: string;
    h1?: string;
    h2?: string;
    children?: JSX.Element;
    icon?: boolean;
    type?: 'info' | 'error' | 'attention' | 'empty' | 'error-page' | 'success';
    namespace?: string;
    polite?: boolean;
};

export default ({ text, children, h1, h2, namespace, polite, icon=false, type='info'}: Props): JSX.Element => {
    return (
        <div 
            aria-live={polite ? 'polite' : 'off'} 
            role="presentation" 
            className={classNames('message-wrapper', `-${type}`, !!icon && '-icon', namespace, {
                '-has-title': !!h1 || !!h2,
            })}
        >
            <div className="message-content">
                { !!h1 && <h1 className="message-title paragraph-small">{h1}</h1> }
                { !!h2 && <h2 className="message-title paragraph-small">{h2}</h2> }
                { !!text && <div className="message-text">{text}</div> }
                { children }
            </div>
        </div>
    );
};
