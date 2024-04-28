import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, DefaultValues } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../Form/InputField';
import { StringObject, MultipleObject } from '../../domain/Types';

type Props = {
  callback: (p: string[] ) => void;
  row: string | number;
  data?: string[];
}

export default function BigTwoInputData( props: Props ) {
  const length = 4;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<StringObject>(
      yup.object().shape(
        Array.from({length}).reduce( (p: MultipleObject, _x, i: number) => {
          p[`data${props.row}${i}`] = yup.string().matches(/^[0-9]+$/, 'Must be only digits');
          return p;
        }, ({} as MultipleObject) )
      ).required()
    ),
    mode: 'onBlur',
    defaultValues: (props.data ?? []).reduce( (p: StringObject, v: string, i: number): StringObject => {
      p[`data${props.row}${i}` as keyof StringObject ] = v ?? '';
      return p;          
    }, ({} as StringObject)),
  });

  const onSubmit = (values: StringObject) => {
    const data = Array.from({length}).map( (_x, i: number): string=> {
      return values[`data${props.row}${i}`] ?? '';
    });
    props.callback( data );
  };

  return (
    <div className="big-two-input-data-wrapper game-row">
      <form
          noValidate
          className="form-wrapper"
          onSubmit={handleSubmit((values: StringObject) => {
              onSubmit(values);
          })}>

          { Array.from({length}).map( (_x, i: number) => {
            const key = `data${props.row}${i}`;
            const error = errors[key as keyof typeof errors]?.message;
            return <InputField  key={key} register={register} id={key} name={key} label="Card" type="text" error={error} />
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

