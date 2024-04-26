import React from 'react';
import classNames from 'classnames';
import Constant from '../../static/data/Constant';

interface Props {
    id: string;
    label?: string;
    legend?: string;
    required?: boolean;
    disabled?: boolean;
    children?: boolean | JSX.Element | JSX.Element[];
    error?: string;
    type?: string;    
    namespace?: string;
    hasValue?: boolean;
};

export default (props: Props): JSX.Element => {
    const style = classNames('input-wrapper', props.namespace, `-${props.type || 'none-type'}`, {
        '-required': !!props.required,
        '-invalid': !!props.error,
        '-disabled': !!props.disabled,
        '-has-value': !!props.hasValue,
    });

    return <div className={style}>
        { props.type === Constant.typeRadio || props.type === Constant.typeCheckbox || props.type === Constant.typeFilefield ? <fieldset>
                <legend>{props.legend || 'Velg et alternativ'}</legend>
                {props.children}
            </fieldset> : <>
                <label htmlFor={props.id}>{props.label}</label>
                <div className="input-holder">{props.children}</div>
            </>
        }

        { !!props.error && <div id={`${props.id}-error`} className="input-wrapper-error-message">
            <span aria-live="polite">{props.error}</span>
        </div> }
    </div>
};
