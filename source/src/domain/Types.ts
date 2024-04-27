export type StringObject = {
    [k: string]: string;
};

export type NumberObject = {
    [k: string]: number;
};

export type MultipleObject = {
    [k: string]: any;
};

export interface RequiredId extends HarValue<string> {
    value: string;
}

export interface HarValue<T> {
    value: T;
}
