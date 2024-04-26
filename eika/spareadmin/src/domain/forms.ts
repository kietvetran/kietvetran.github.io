import { StringObject } from './types';

export interface ErrorItem {
    name: string;
    message: string;
};

export interface CheckItem {
    label: string;
    value: string;
};

export interface InputValidation {
    message: string;
    rule: string;
};

export interface FieldButton {
    type: string;
    action: string;
    text?: string;
    mode?: string;
    textPin?: StringObject;
};

export interface SelectOption {
    id: string;
    name: string;
};

export interface InputContent {
    id: string;
    name: string;
    type: string;
    element?: JSX.Element,
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    legend?: string;
    required?: boolean;
    maxLength?: number;
    disabled?: boolean;
    namespace?: string;
    validation?: InputValidation[];
    list?: CheckItem[],
    fieldButton?: FieldButton;
    option?: SelectOption[];
    calenadar?: boolean;
    accept?: string;
};