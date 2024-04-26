import React, { ChangeEvent, FocusEvent } from 'react';
import InputWrapper from './InputWrapper';
import { generateId } from '../util/Functions';
import { StringObject } from '../../domain/types';
import { InputContent } from '../../domain/forms';

interface Props {
    content: InputContent;
    formAction: any;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
    blur: (e: FocusEvent<HTMLInputElement>) => void;
};

export default (props: Props): JSX.Element => {
    const { content, blur, change, formAction: {formState, register, getValues} } = props;
    const id = content.id || generateId('textfield');
    const error = formState.errors[content.name];

    const attr: StringObject = [
        'required',
        'defaultValue',
        'placeholder',
        'maxLength',
        'minLength',
        'disabled', 
    ].reduce( (pin: any, key: string) => {
        if ( content[key as keyof InputContent] !== undefined ) { 
            pin[key as keyof InputContent] = content[key as keyof InputContent]; 
        }
        return pin;
    }, {
        id, 
        name: content.name,
        type: content.type,
        autoCapitalize: 'off',
        autoComplete: 'off',
        autoCorrect: 'off',
        spellCheck: 'false',
        'aria-invalid': error?.message ? `${!!error?.message}` : '',
        'aria-controls': error?.message ? `${id}-error` : '',
    });

    Object.keys(attr).forEach( (key: string) => {
        if ( attr[key] === '' ) { delete(attr[key]); }
    });

    attr.placeholder = attr.placeholder || ' ';
    return <InputWrapper {...content} error={error?.message} id={id} hasValue={!!getValues(content.name)}>
        <input 
            {...attr} 
            {...register(attr.name)} 
            className={`${getValues(content.name) ? 'has-value' : 'no-value'} ${error?.message ? 'has-error' : 'no-error'}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>{change(e);}} 
            onBlur={(e: FocusEvent<HTMLInputElement>) => {blur(e);}} 
        />
        <span className="input-item-label">{content.label || ''}</span>
    </InputWrapper>
};


