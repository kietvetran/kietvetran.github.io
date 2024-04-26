import React, { useEffect, ChangeEvent, FocusEvent } from 'react';
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
    const { content, change, blur, formAction: {formState, register, setValue} } = props;
    const id = content.id || generateId('radio');
    const error = formState.errors[content.name];

    useEffect(() => {
        setValue( content.name, content.defaultValue);
    }, [content.defaultValue, content.name, setValue]);

    const attr: StringObject = [
        'required',
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
        'aria-invalid': error?.message ? `${!!error?.message}` : '',
        'aria-controls': error?.message ? `${id}-error` : '',
    });

    Object.keys(attr).forEach( (key: string) => {
        if ( attr[key] === '' ) { delete(attr[key]); }
    });

    return <InputWrapper {...content} error={error?.message} id={id}>
        <>
            { (content.list || []).map( (data: any, i: number) => {
                return <div key={`radio-${id}-${i}`} className="input-holder -radio">
                    <input 
                        {...attr} 
                        {...register(attr.name)}
                        id={`radio-${id}-${i}`} 
                        value={data.value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>{change(e);}}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => {blur(e);}}
                    />
                    <label htmlFor={`radio-${id}-${i}`}>{data.label}</label>
                </div>
            })}
        </>
    </InputWrapper>
};
