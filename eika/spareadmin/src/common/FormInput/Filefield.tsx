import React, { ChangeEvent, FocusEvent, MouseEvent, useState, useCallback } from 'react';
import InputWrapper from './InputWrapper';
import { generateId, createRegexp } from '../util/Functions';
import { StringObject } from '../../domain/types';
import { InputContent } from '../../domain/forms';

interface Props {
    content: InputContent;
    formAction: any;
    change: (e: ChangeEvent<HTMLInputElement>, c: string, file?: any) => void;
    blur: (e: FocusEvent<HTMLInputElement>) => void;
    click: (e: MouseEvent, k: string) => void;
};

export default (props: Props): JSX.Element => {
    const { content, blur, change, formAction: {formState, register, setValue} } = props;
    const id = content.id || generateId('filefield');
    const error = formState.errors[content.name];
    const [values, setValues] = useState<string[]>([]);

    const attr: StringObject = [
        'required',
        'defaultValue',
        'accept',
        'disabled', 
    ].reduce( (pin: any, key: string) => {
        if ( content[key as keyof InputContent] !== undefined ) { 
            pin[key as keyof InputContent] = content[key as keyof InputContent]; 
        }
        return pin;
    }, {
        id, 
        name: content.name,
        type: 'file',
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

    const dragHandler = useCallback((e: MouseEvent) => {
        e.preventDefault();
        if ( e.type === 'dragover' ) {
            e.currentTarget.classList.add('-is-dragover');
        } else {
            e.currentTarget.classList.remove('-is-dragover');
        }
    }, []);

    const dropHandler = useCallback( async (e: any) => {
        e.preventDefault();
        e.currentTarget.classList.remove('-is-dragover');
        const file = e.dataTransfer.files[0]; 
        if ( !file || !file.type || !file.name ) { return; }

        if ( content.accept ) {
            const reg = createRegexp(content.accept.replace( /,/g, '|'), true, true);
            if ( !file.type.match(reg) ) { return; }
        }
        setValues([file.name]);
        change(e, file.name, file);                
    }, [change, content.accept]);

    const deleteFile = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setValue(content.name, '');
        setValues([]);
    }, [content.name, setValue]);

    return <InputWrapper {...content} error={error?.message} id={id}>
        <>
            <div className="input-holder" onDrop={dropHandler} onDragOver={dragHandler} onDragLeave={dragHandler}>
                <input 
                    {...attr} 
                    {...register(attr.name)} 
                    onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                        const file = (e.target.files ?? [])[0];
                        setValues([e.target.value]);
                        change(e, e.target.value, file);   
                    }} 
                    onBlur={(e: FocusEvent<HTMLInputElement>) => {blur(e);}} 
                />
                <label htmlFor={id} className="input-label">
                    <span>{content.label}</span>
                </label>
            </div>
            {(values || []).length > 0 && <div className="file-list-holder">
                { values.map( (value: string, i: number) => {               
                    return <div key={`file-item-${i}`} className="file-item">
                        <div>
                            <a href="#" id={`${attr.id}-remove-btn`} role="button" className="default-btn -only-icon -cross-left delete-file-btn" onClick={deleteFile}>
                                <span className="aria-visible">{`Slett file ${value}`}</span>
                            </a>
                        </div>
                        <div className="file-name">{value}</div>
                    </div>;
                }) }
            </div>} 
        </>
    </InputWrapper>
};


