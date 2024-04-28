import classNames from 'classnames';
import React from 'react';

type Props = {
    id: string;
    name: string;
    label: string | JSX.Element;
    register: any;
    error?: string;
    children?: JSX.Element;
} & React.PropsWithRef<JSX.IntrinsicElements['input']>;

export default function InputField(props: Props) {
    const { id, label, error, register, ...rest } = props;
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
                    {...register(rest.name)}
                />
            </div>
            {!!error && <div className="input-error">{error}</div>}

            { props.children }
        </div>
    );
}
