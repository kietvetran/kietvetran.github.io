import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm, DefaultValues } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../Form/InputField';
import { StringObject, MultipleObject } from '../../domain/Types';

type Props = {
  callback: (p: string[] ) => void;
  row: number;
  data?: string[];
}

export default function BigTwoInputData( props: Props ) {
  const length = 4;
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<StringObject>(
      yup.object().shape(         
        Array.from({length}).reduce( (p: MultipleObject, _x, i: number) => {
          p[`data${props.row}${i}`] = props.row === 0 ? // Row 0 is player
            yup.string().required('Required') :
            yup.string().matches(/^(\s*|\d+)$/, 'Must be only digits'); // is empty or digit
          return p;
        }, ({} as MultipleObject) )
      ).required()
    ),
    mode: 'onBlur', // 'all', 'onTouched', 'onChange', 'onBlur',
    defaultValues: (props.data ?? []).reduce( (p: StringObject, v: string, i: number): StringObject => {
      p[`data${props.row}${i}` as keyof StringObject ] = v ?? '';
      return p;          
    }, ({} as StringObject)),
  });

  const onSubmit = (values: StringObject): void => {
    const data = Array.from({length}).map( (_x, i: number): string=> {
      return values[`data${props.row}${i}`] ?? '';
    });
    props.callback( data );
  };

  useEffect(() => {
    const subscription = watch((values, { name, ...rest }) => {
      console.log('== EHR ==');
      console.log(name);
      console.log(errors);
      console.log( rest );

      if ( errors[name as keyof typeof errors]?.message ) {
        console.log('== YES:..');
        clearErrors( name );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <div className={`game-row -${props.row === 0 ? 'player' : 'data'}`}>
      <form
          noValidate
          className="form-wrapper"
          onSubmit={handleSubmit((values: StringObject) => {
            onSubmit(values);
          })}
        >

          { Array.from({length}).map( (_x, i: number) => {
            const key = `data${props.row}${i}`;
            const error = errors[key as keyof typeof errors]?.message;
            return props.row === 0 ? // Row 0 is player
              <InputField key={key} register={register} placeholder={`Player ${i+1}`} id={key} name={key} label="Name" error={error}/> :
              <InputField key={key} register={register} id={key} name={key} label="Card" error={error}/>
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

