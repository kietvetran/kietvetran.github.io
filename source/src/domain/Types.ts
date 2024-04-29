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

/* eslint-disable */
const Record: Record<string, number> = {
    a: 1,
    b: 2,
};
/* eslint-enable */
