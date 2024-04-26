// @ts-nocheck
import React from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../../common/Spinner/Spinner'; 
import Message from '../../common/Message/Message'; 
import FormInput from '../../common/FormInput/FormInput'; 
// import Constant from '../../static/data/Constant';
import InputContentGuideline from '../../static/data/InputContentGuideline';
import { ErrorItem, StringObject } from '../../domain/types';

import './Guideline.scss';

// eslint-disable-next-line
const submit = (data: StringObject, errorList: ErrorItem[] ): void => {
    // coming
};

export default (): JSX.Element => {
    const formAction = useForm<StringObject>({mode: 'onBlur'});

    return (
        <div className="guideline-wrapper">
            <h1>Guideline</h1>

            <div className="paragraph">
                <Spinner />
            </div>
            <div className="paragraph">
                <Message text="Lorem ipmsum" />
                <Message text="Lorem ipmsum" type="error" />
            </div>

            <div className="paragraph max-width-600">
                <FormInput 
                    content={JSON.parse(JSON.stringify(InputContentGuideline))} 
                    formAction={formAction} 
                    submitText="Submit"
                    submitCallback={ (data: StringObject, errorList: ErrorItem[]) => { submit(data, errorList); }}
                    failed=""
                />
            </div>
        </div>
    );
};
