import React, { ChangeEvent, FocusEvent, MouseEvent } from 'react';
import classNames from 'classnames';
import Textfield from './Textfield';
import Textarea from './Textarea';
import Filefield from './Filefield';
import Select from './Select';
import RadioButton from './RadioButton';
import Checkbox from './Checkbox';
import Constant from '../../static/data/Constant';
import Message from '../Message/Message'; 
import { StringObject } from '../../domain/types';
import { InputContent, ErrorItem } from '../../domain/forms';
import { submit, blur, change } from './Functions';

import './FormInput.scss';

export interface Props {
    content: InputContent[] | InputContent[][];
    secondContent?: InputContent[] | InputContent[][];
    thirdContent?: InputContent[] | InputContent[][];
    formAction: any;
    submitText?: string;
    submitCallback?: (data: StringObject, errorList: ErrorItem[], cancel?: boolean) => void;
    // eslint-disable-next-line
    changeCallback?: (content: InputContent, value: string, file?: any) => void;
    cancelText?: string;
    children?: JSX.Element;
    failed?: string;
    success?: string;
    type?: string;
    // eslint-disable-next-line
    click?: (e: MouseEvent, k: string) => void;
};

const FormRowInput = ({props, cnt }: {props: Props, cnt: InputContent}): JSX.Element => {
    return <div className={classNames('form-input-row', cnt.namespace, `-${cnt.id || cnt.name || 'normal'}`)}>
        { cnt.type === Constant.typeFilefield && 
            <Filefield
                {...props} 
                content={cnt} 
                blur={(e:FocusEvent<HTMLInputElement>)=> { blur(props, cnt, e); }} 
                change={(e:ChangeEvent<HTMLInputElement>, value: string, file?: any)=> { change(props, cnt, e, value, file); }}
                click={(e: MouseEvent, k='')=> { if ( props.click ) { props.click(e, k); } } }
            /> 
        }
        { cnt.type === Constant.typeTextarea && 
            <Textarea
                {...props} 
                content={cnt} 
                blur={(e:FocusEvent<HTMLInputElement>)=> { blur(props, cnt, e); }} 
                change={(e:ChangeEvent<HTMLInputElement>)=> { change(props, cnt, e); }}
            /> 
        }
        { (cnt.type === Constant.typeText || cnt.type === Constant.typeTel || cnt.type === Constant.typeEmail || cnt.type === Constant.typePassword) && 
            <Textfield 
                {...props} 
                content={cnt} 
                blur={(e:FocusEvent<HTMLInputElement>)=> { blur(props, cnt, e); }} 
                change={(e:ChangeEvent<HTMLInputElement>)=> { change(props, cnt, e); }}
            /> 
        }
        { cnt.type === Constant.typeSelect && <Select {...props} content={cnt}  blur={(e:FocusEvent<HTMLInputElement>)=> { blur(props, cnt, e); }} change={(e:ChangeEvent<HTMLInputElement>)=> { change(props, cnt, e); }}/> }
        { cnt.type === Constant.typeRadio && <RadioButton {...props} content={cnt}  blur={(e:FocusEvent<HTMLInputElement>)=> { blur(props, cnt, e); }} change={(e:ChangeEvent<HTMLInputElement>)=> { change(props, cnt, e); }}/> }
        { cnt.type === Constant.typeCheckbox && <Checkbox {...props} content={cnt}  blur={(e:FocusEvent<HTMLInputElement>)=> { blur(props, cnt, e); }} change={(e:ChangeEvent<HTMLInputElement>)=> { change(props, cnt, e); }}/> }
        { cnt.type === Constant.typeLink && props.click && <div className={classNames('input-wrapper -link', cnt.namespace)}>
            { /* @ts-ignore */ }
            <a href="#" role="button" className="link" onClick={(e: MouseEvent) => { props.click(e, cnt.id); } }>{cnt.label}</a>
        </div>} 
        { cnt.type === Constant.typeHidden && <input name={cnt.name} value={cnt.defaultValue || ''} type="hidden"/> } 
        { cnt.type === Constant.typeElement && <>{cnt.element}</>} 
    </div>
};

const FormContent = ({props, content }: {props: Props, content: InputContent[] | InputContent[][]}): JSX.Element => {
    return <>
        { content.map( (cnt: InputContent | InputContent[], i: number) => {
            const style = (cnt instanceof Array ? cnt : [cnt]).map( (cnt: InputContent) => {
                return cnt.namespace || cnt.id || cnt.name;
            }).join( ' -' );

            return cnt instanceof Array && cnt.length > 1 ? 
                <div className={`form-input-row-wrapper -${style} -length-${cnt.length}`} key={`form-input-row-${i}`}>
                    { cnt.map( (c: InputContent, j: number) => {
                        return <FormRowInput props={props} cnt={c} key={`form-input-row-${i}-${j}`} />
                    })}
                </div> 
                : 
                <FormRowInput props={props} cnt={cnt instanceof Array ? cnt[0] : cnt} key={`form-input-row-${i}`} />
        }) }
    </>  
};

export default (props: Props): JSX.Element => {
    return (
        <form 
            className={classNames('form-input-wrapper', `-${props.type || 'normal'}`)}
            noValidate 
            onSubmit={props.formAction.handleSubmit((data: StringObject) => { submit(props, data); })}
        >
            <div className="form-content-wrapper">
                <div className="form-content-column -first">
                    <FormContent props={props} content={props.content}/>
                </div>
                {  props.secondContent && <div className="form-content-column -second">
                    <FormContent props={props} content={ props.secondContent}/>
                </div> }
                {  props.thirdContent && <div className="form-content-column -third">
                    <FormContent props={props} content={ props.thirdContent}/>
                </div> }
            </div>

            { props.children }

            { (props.failed || props.success) && <Message type={props.failed ? 'error' : 'success'} text={props.failed || props.success} /> }

            { props.submitCallback && props.submitText && props.submitCallback && <div className="submit-btn-holder paragraph -small -include-top">
                <input type="submit" className="primary-btn -dark" value={props.submitText} />
                { !!props.cancelText && <button type="button" className="link" onClick={()=>{ if (props.submitCallback) { props.submitCallback( {}, [], true); } }}>
                    {props.cancelText}
                </button>}
            </div> }
        </form>
    );
};
