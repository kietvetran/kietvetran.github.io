import React, { ReactElement } from 'react';
import classNames from 'classnames';
// import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type InputWrapper = {
  id: string;
  label: string | ReactElement;
  description?: string | ReactElement;
  error?: string;
  children?: ReactElement;
};

export function InputWrapper({ error, children, id, label, description }: InputWrapper) {
  return (
    <div
      className={classNames('input-wrapper', {
        '-invalid': !!error,
      })}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      {description ? (
        <p className="input-description" id={`${id}-description`}>
          {description}
        </p>
      ) : null}
      <div className="input-holder">{children}</div>
      {error ? (
        <p aria-live="polite" className="input-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
