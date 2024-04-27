import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, DefaultValues } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../Form/InputField';

export type Values = {
  name0: string;
  name1: string;
  name2: string;
  name3: string;
}

type Props = {
  callback: (d: string[] ) => void;
  user?: string[];
}

const schema = yup
  .object()
  .shape({
      name0: yup.string().required('Required'),
      name1: yup.string().required('Required'),
      name2: yup.string().required('Required'),
      name3: yup.string().required('Required'),
  })
  .required();

export default function BigTwoRowInputParticipant( props: Props ) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: (props.user ?? []).reduce( (p: Values, v: string, i: number): Values => {
      p[`name${i}` as keyof Values ] = v ?? '';
      return p;          
    }, ({name0: '', name1: '', name2: '', name3: ''} as Values)),
  });

  const onSubmit = (values: Values) => {
    console.log(values);
  };

  return (
    <div className="big-two-input-participant-wrapper game-row">
      <form
          noValidate
          className="form-wrapper"
          onSubmit={handleSubmit((values: Values) => {
              onSubmit(values);
          })}>

          { Array.from({length: 4}).map( (_x, i: number) => {
            const key = `name${i}`;
            const error = errors[key as keyof typeof errors]?.message;
            return <InputField  key={key} register={register} placeholder="Participant" id={key} name={key} label="Name" type="text" error={error} />
          })}
          <div className="input-wrapper">
            <input type="submit" className="button -primary" />
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

