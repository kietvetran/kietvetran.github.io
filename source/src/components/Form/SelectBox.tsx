import classNames from 'classnames';
import React from 'react';
// import { InputHTMLAttributes } from 'react';
// import { FieldError } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
// useForm register type
// https://stackoverflow.com/questions/76803987/what-type-to-use-for-register-from-the-react-hook-form-register-typescript-type

// type props = {
//   register: UseFormRegister<MultipleObject>;
//  children?: JSX.Element;
// } & InputHTMLAttributes<HTMLInputElement>;
//

export type Option = {
  value: string;
  label: string;
}

type Props = {
  id: string;
  name: string;
  label: string | JSX.Element;
  register: UseFormRegister<any>;
  optionList: Option[];
  error?: string;
  children?: JSX.Element;
} & React.PropsWithRef<JSX.IntrinsicElements['select']>;

export default function SelectBox(props: Props) {
  const { id, label, error, register, optionList, ...rest } = props;
  return (
    <div className="input-wrapper">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="input-holder">
        <select
          className={classNames('textfield', {
            '-invalid': !!error,
          })}
          id={id}
          {...register(rest.name)}
          {...rest}
        >
          { optionList.map( (opt: Option) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {!!error && <div className="input-error">{error}</div>}
      {props.children}
    </div>
  );
}
