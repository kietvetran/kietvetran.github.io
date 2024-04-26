import { ChangeEvent, FocusEvent } from 'react';
import Constant from '../../static/data/Constant';
import { validateRule } from '../util/Validations';
import { StringObject } from '../../domain/types';
import { Props } from './FormInput';
import { InputContent, InputValidation, ErrorItem } from '../../domain/forms';

/** ****************************************************************************
 === Internal function ===
 ***************************************************************************** */
const validate = ( validation?: InputValidation[], value?: string, isFile=false): null | InputValidation => {
    return (validation || []).find( (data: InputValidation) => {
        if ( isFile && data.rule === Constant.validationRequired && (!value || !value.length) ) { return true; }
        if ( !value && data.rule !== Constant.validationRequired ) { return false; }
        return !validateRule( data.rule, value );
    }) || null;
};

const getValue = (e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>): string => {
    return e?.target?.value || '';
};

/** ****************************************************************************
 === External function ===
 ***************************************************************************** */
export const submit = (props: Props, data: StringObject): void => {
    const errorList: ErrorItem[] = [];
    props.content.forEach( (cnt: InputContent | InputContent[]) => {
        (cnt instanceof Array ? cnt : [cnt]).forEach( (input: InputContent) => {
            const invalid = validate(input.validation, data[input.name], (input.type === Constant.typeFilefield));
            if ( !invalid ) { return; }

            errorList.push({
                name: input.name,
                message: invalid.message 
            });
        });
    });

    if ( errorList.length ) {
        errorList.forEach( (error: ErrorItem) => {
            props.formAction.setError( error.name, {message: error.message });
        });
    }

    if ( props.submitCallback ) { props.submitCallback(data, errorList); }
};

export const blur = (props: Props, content: InputContent, e: FocusEvent<HTMLInputElement>): void => {
    const { formAction: {setError, clearErrors} } = props; 
    if ( !(content.validation instanceof Array) ) { return; }

    const value = (content.type !== Constant.typeRadio && content.type !== Constant.typeCheckbox) || e.target.checked ? getValue(e) : '';
    const invalid  = content.type === Constant.typeFilefield ? null : validate( content.validation, value );
    if ( invalid ) {
        setError( content.name, {...invalid, type: invalid.rule});
    } else {
        clearErrors(content.name);
    } 
};

export const change = (props: Props, content: InputContent, e: ChangeEvent<HTMLInputElement>, currentValue?: string, file?: any ): void => {
    const { formAction: {formState, clearErrors, setValue} } = props;
    const error = formState.errors[content.name];
    let value = currentValue || getValue(e);

    if ( content.type === Constant.typeCheckbox && !e.target.checked ) {
        value = '';
    }

    setValue( content.name, value );
    if ( props.changeCallback ) {
        props.changeCallback( content, value, file );
    }

    if ( !error || !error.message ) { return; }

    const invalid = validate( content.validation, value );
    if ( !invalid ) { clearErrors( content.name); }
};