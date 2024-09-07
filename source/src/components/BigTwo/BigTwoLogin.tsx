import classNames from 'classnames';
import React, { useState, ChangeEvent } from 'react';

type Props = {
    success: () => void;
};

type State = {
    code: string;
    value: string;
    error: string;
    isOnFocus: boolean;
};

export default function BigTwoLogin({ success }: Props) {
    const [state, setState] = useState<State>({
        code: '111111',
        value: '',
        error: '',
        isOnFocus: false,
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length !== state.code.length) {
            return setState({ ...state, value, error: '' });
        }

        if (value === state.code) {
            setState({ ...state, value, error: '' });
            return success();
        }
        setState({ ...state, value: '', error: 'Incorrect pin' });
    };

    const onFocus = () => {
        setState({ ...state, isOnFocus: true });
    };

    const onBlur = () => {
        setState({ ...state, isOnFocus: false });
    };

    return (
        <div className="big-two-login-wrapper">
            <h2>Pin</h2>
            <div className="pin-board">
                {state.code.split('').map((x: string, i: number) => {
                    return (
                        <span
                            key={`pin-card-${i}`}
                            className={classNames('pin-card', {
                                '-active': i < state.value.length,
                                '-focus': state.isOnFocus && i === state.value.length,
                            })}
                        />
                    );
                })}

                <label htmlFor="big-two-login-pin">Pin</label>
                <input
                    type="tel"
                    id="big-two-login-pin"
                    maxLength={state.code.length}
                    value={state.value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
            {!!state.error && (
                <div aria-live="polite" className="input-error">
                    {state.error}
                </div>
            )}
        </div>
    );
}
