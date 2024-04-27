import classNames from 'classnames';
import React from 'react';

type Props = {
    id: string;
    name: string;
    label: string | JSX.Element;
    error?: string;
} & React.PropsWithRef<JSX.IntrinsicElements['input']>;

export default function InputField(props: Props) {
    const { id, label, error, ...rest } = props;
    return (
        <div className="input-wrapper">
            <label htmlFor={id} className="input-label">
                {label}
            </label>
            <div className="input-holder">
                <input
                    className={classNames('textfield', {
                        '-invalid': !!error,
                    })}
                    id={id}
                    {...rest}
                />
            </div>
            {!!error && <div className="input-error">{error}</div>}
        </div>
    );
}
