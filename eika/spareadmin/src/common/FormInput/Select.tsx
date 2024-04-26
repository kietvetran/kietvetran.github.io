import React, { ChangeEvent, FocusEvent } from 'react';
import InputWrapper from './InputWrapper';
import { generateId } from '../util/Functions';
import { StringObject } from '../../domain/types';
import { InputContent, SelectOption } from '../../domain/forms';

interface Props {
    content: InputContent;
    formAction: any;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
    blur: (e: FocusEvent<HTMLInputElement>) => void;
};

export default (props: Props): JSX.Element => {
    const { content, blur, change, formAction: {formState, register, getValues} } = props;
    const id = content.id || generateId('select');
    const error = formState.errors[content.name];

    const attr: StringObject = [
        'required',
        'defaultValue',
        'disabled', 
    ].reduce( (pin: any, key: string) => {
        if ( content[key as keyof InputContent] !== undefined ) { 
            pin[key as keyof InputContent] = content[key as keyof InputContent]; 
        }
        return pin;
    }, {
        id, 
        name: content.name,
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

    return <InputWrapper {...content} error={error?.message} id={id} hasValue={!!getValues(content.name)}>
        <select 
            {...attr} 
            {...register(attr.name)} 
            onChange={(e: ChangeEvent<HTMLInputElement>) =>{change(e);}} 
            onBlur={(e: FocusEvent<HTMLInputElement>) => {blur(e);}}  
        >
            { (content.option || []).map((data: SelectOption, i: number) => {
                const attr = {value: data.id};
                return <option id={`option-${data.id}`} key={`select-option-${i}`} {...attr}>{data.name}</option>;
            }) }
        </select>
        <span className="input-item-label">{content.label || ''}</span>
    </InputWrapper>
};


