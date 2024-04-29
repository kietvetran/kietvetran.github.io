import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { StringObject, MultipleObject } from '../../domain/Types';
import InputField from '../Form/InputField';

type Props = {
    callback: (p: string[]) => void;
    player?: string[];
};

export default function BigTwoInputPlayer(props: Props) {
    const length = 4;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver<StringObject>(
            yup
                .object()
                .shape(
                    Array.from({ length }).reduce((p: MultipleObject, _x, i: number) => {
                        p[`name${i}`] = yup.string().required('Required');
                        return p;
                    }, {} as MultipleObject),
                )
                .required(),
        ),
        mode: 'onBlur',
        defaultValues: (props.player ?? []).reduce((p: StringObject, v: string, i: number): StringObject => {
            p[`name${i}` as keyof StringObject] = v ?? '';
            return p;
        }, {} as StringObject),
    });

    const onSubmit = (values: StringObject) => {
        const player = Array.from({ length }).map((_x, i: number): string => {
            return values[`name${i}`] ?? '';
        });
        props.callback(player);
    };

    return (
        <div className="big-two-input-player-wrapper game-row">
            <form
                noValidate
                className="form-wrapper"
                onSubmit={handleSubmit((values: StringObject) => {
                    onSubmit(values);
                })}>
                {Array.from({ length }).map((_x, i: number) => {
                    const key = `name${i}`;
                    const error = errors[key as keyof typeof errors]?.message;
                    return (
                        <InputField
                            key={key}
                            register={register}
                            placeholder={`Player ${i + 1}`}
                            id={key}
                            name={key}
                            label="Name"
                            type="text"
                            error={error}
                        />
                    );
                })}
                <div className="input-wrapper">
                    <input type="submit" className="button -primary" value="S" />
                </div>
            </form>
        </div>
    );
}

/*
const someObj:ObjectType = data;
const field = 'username';

// This gives an error
const temp = someObj[field];

// Solution 1: When the type of the object is known
const temp = someObj[field as keyof ObjectType]

// Solution 2: When the type of the object is not known
const temp = someObj[field as keyof typeof someObj]
*/
