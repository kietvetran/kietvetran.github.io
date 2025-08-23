import React, { ReactElement, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { generateId } from '../../utils/stringUtils';
import { InputWrapper } from './InputWrapper';

type InputProps = {
  label: string | ReactElement;
  description?: string | ReactElement;
  'data-test-id'?: string;
  error?: string;
};

/* textfield */
export function InputField({ error, id, label, description, ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? generateId();
  return (
    <InputWrapper id={fieldId} label={label} error={error} description={description}>
      <input
        className={classNames('textfield', {
          '-invalid': !!error,
        })}
        aria-invalid={!!error}
        id={fieldId}
        autoComplete="off"
        {...(description ? { 'aria-describedby': `${fieldId}-description` } : undefined)}
        {...rest}
      />
    </InputWrapper>
  );
}

export function HookInputField({ id, label, name, description, ...rest }: { name: string } & InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? generateId();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = (errors[name]?.message ?? '') as string;
  return (
    <InputWrapper id={fieldId} label={label} error={error} description={description}>
      <input
        className={classNames('textfield', {
          '-invalid': !!error,
        })}
        aria-invalid={!!error}
        id={fieldId}
        autoComplete="off"
        {...(description ? { 'aria-describedby': `${fieldId}-description` } : undefined)}
        {...register(name)}
        {...rest}
      />
    </InputWrapper>
  );
}

/* Textarea */
export function Textarea({ error, id, label, description, ...rest }: InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fieldId = id ?? generateId();
  return (
    <InputWrapper id={fieldId} label={label} error={error} description={description}>
      <textarea
        className={classNames('textarea', {
          '-invalid': !!error,
        })}
        aria-invalid={!!error}
        id={fieldId}
        autoComplete="off"
        {...(description ? { 'aria-describedby': `${fieldId}-description` } : undefined)}
        {...rest}
      />
    </InputWrapper>
  );
}

export function HookTextarea({ id, label, name, description, ...rest }: { name: string } & InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fieldId = id ?? generateId();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = (errors[name]?.message ?? '') as string;
  return (
    <InputWrapper id={fieldId} label={label} error={error} description={description}>
      <textarea
        className={classNames('textarea', {
          '-invalid': !!error,
        })}
        aria-invalid={!!error}
        id={fieldId}
        autoComplete="off"
        {...(description ? { 'aria-describedby': `${fieldId}-description` } : undefined)}
        {...register(name)}
        {...rest}
      />
    </InputWrapper>
  );
}

/* Selecbox */
type SelectboxProps = {
  options: Array<{ value: string; label: string }>;
} & InputProps;

export function Selectbox({ error, id, label, description, options, ...rest }: SelectboxProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const fieldId = id ?? generateId();
  return (
    <InputWrapper id={fieldId} label={label} error={error} description={description}>
      <select
        className={classNames('select-box', {
          '-invalid': !!error,
        })}
        aria-invalid={!!error}
        id={fieldId}
        {...(description ? { 'aria-describedby': `${fieldId}-description` } : undefined)}
        {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
}

export function HookSelectbox({
  id,
  label,
  name,
  description,
  options,
  ...rest
}: { name: string } & SelectboxProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const fieldId = id ?? generateId();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = (errors[name]?.message ?? '') as string;
  return (
    <InputWrapper id={fieldId} label={label} error={error} description={description}>
      <select
        className={classNames('select-box', {
          '-invalid': !!error,
        })}
        aria-invalid={!!error}
        id={fieldId}
        {...(description ? { 'aria-describedby': `${fieldId}-description` } : undefined)}
        {...register(name)}
        {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
}
