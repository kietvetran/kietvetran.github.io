/******************************************************************************
 == FOMR METHODS ==
******************************************************************************/
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { validatePersonalId } from '../../util/Validations';
import InputField from '../Form/InputField';

type Values = {
    name: string;
    age: string;
};

const schema = yup
    .object()
    .shape({
        name: yup.string().required('Name is required'),
        age: yup
            .string()
            .required('Age is required')
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(2, 'Need 2 degits')
            .max(2, 'Need 2 degits'),
        pin: yup
            .string()
            .required('Pin is required')
            .when(['age'], ([age], schema) => {
                // ['age', 'name'], ([age, name], schema) =>
                if (parseInt(age, 10) > 18) {
                    return schema.matches(/^[0-9]+$/, 'Must be only digits');
                }
                return schema.matches(/^[a-z]+$/, 'Must a-z character');
            }),
        // is and than do not work well
        // email: yup.string()
        //     .when(['name', 'age'], {
        //         is: (name, age) => {
        //             return name && age;
        //         },
        //         then: yup.string().required('Must enter email address')
        //    }).email( 'Invalid email addresse'),
        email: yup
            .string()
            .when(['name', 'age'], ([name, age], schema) => {
                if (name && age) {
                    return schema.required('Email is required');
                }
                return schema;
            })
            .email('Invalid email addresse'),
        fnr: yup.string().test('person-id', 'Invalid fnr', (value) => validatePersonalId(value)),
    })
    .required();

export default function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const onSubmit = (values: Values) => {
        console.log(values);
    };

    return (
        <div className="profile-wrapper">
            <form
                noValidate
                className="form-wrapper"
                onSubmit={handleSubmit((values: Values) => {
                    onSubmit(values);
                })}>
                <InputField register={register} id="name" name="name" label="Name" type="text" error={errors.name?.message} />
                <InputField register={register} id="age" name="age" label="Age" type="tel" error={errors.age?.message} />
                <InputField register={register} id="pin" name="pin" label="Pin" type="text" error={errors.pin?.message} />
                <InputField register={register} id="email" name="email" label="Email" type="email" error={errors.email?.message} />
                <InputField register={register} placeholder="11 digits" id="fnr" name="fnr" label="F-number" type="tel" error={errors.fnr?.message} />

                <input type="submit" className="button -primary" />
            </form>
        </div>
    );
}

/******************************************************************************
 == FOMR METHODS -- FULL ==
******************************************************************************/
/*
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { validatePersonalId } from '../../util/Validations';

type Values = {
  name: string;
  age: string;
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    age: yup
      .string()
      .required('Age is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(2, 'Need 2 degits')
      .max(2, 'Need 2 degits'),
    pin: yup
      .string()
      .required('Pin is required')
      .when(['age'], ([age], schema) => { // ['age', 'name'], ([age, name], schema) => 
        if (parseInt(age, 10) > 18) {
          return schema.matches(/^[0-9]+$/, 'Must be only digits');
        }
        return schema.matches(/^[a-z]+$/, 'Must a-z character');
      }),
    // is and than do not work well
    // email: yup.string()
    //     .when(['name', 'age'], {
    //         is: (name, age) => {
    //             return name && age;
    //         },
    //         then: yup.string().required('Must enter email address')
    //    }).email( 'Invalid email addresse'),
    email: yup.string()
      .when(['name', 'age'], ([name, age], schema) => {
        if ( name && age ) {
          return schema.required('Email is required');
        }
        return schema;
      }).email( 'Invalid email addresse'),
    fnr: yup
      .string()
      .test('person-id', 'Invalid fnr', (value) => validatePersonalId(value)),
  })
  .required();

export default function Profile() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (values: Values) => {
    console.log(values);
  };

  return (
    <div className='profile-wrapper'>
      <form
        noValidate
        className='form-wrapper'
        onSubmit={handleSubmit((values: Values) => {
          onSubmit(values);
        })}
      >
        <div className='input-wrapper'>
          <label htmlFor='name' className='input-label'>
            Name
          </label>
          <div className='input-holder'>
            <input
              className={classNames('textfield', {
                '-invalid': !!formState.errors.name?.message,
              })}
              id='name'
              type='text'
              {...register('name')}
            />
          </div>
          {!!formState.errors.name?.message && (
            <div className='input-error'>{formState.errors.name.message}</div>
          )}
        </div>

        <div className='input-wrapper'>
          <label htmlFor='age' className='input-label'>
            Age
          </label>
          <div className='input-holder'>
            <input
              className={classNames('textfield', {
                '-invalid': !!formState.errors.age?.message,
              })}
              id='age'
              type='tel'
              maxLength={2}
              {...register('age')}
            />
          </div>
          {!!formState.errors.age?.message && (
            <div className='input-error'>{formState.errors.age.message}</div>
          )}
        </div>

        <div className='input-wrapper'>
          <label htmlFor='pin' className='input-label'>
            Pin
          </label>
          <div className='input-holder'>
            <input
              className={classNames('textfield', {
                '-invalid': !!formState.errors.pin?.message,
              })}
              id='pin'
              type='tel'
              {...register('pin')}
            />
          </div>
          {!!formState.errors.pin?.message && (
            <div className='input-error'>{formState.errors.pin.message}</div>
          )}
        </div>

        <div className='input-wrapper'>
          <label htmlFor='email' className='input-label'>
            Email
          </label>
          <div className='input-holder'>
            <input
              className={classNames('textfield', {
                '-invalid': !!formState.errors.email?.message,
              })}
              id='email'
              type='text'
              {...register('email')}
            />
          </div>
          {!!formState.errors.email?.message && (
            <div className='input-error'>{formState.errors.email.message}</div>
          )}
        </div>

        <div className='input-wrapper'>
          <label htmlFor='fnr' className='input-label'>
            F-number
          </label>
          <div className='input-holder'>
            <input
              className={classNames('textfield', {
                '-invalid': !!formState.errors.fnr?.message,
              })}
              id='fnr'
              type='text'
              {...register('fnr')}
            />
          </div>
          {!!formState.errors.fnr?.message && (
            <div className='input-error'>{formState.errors.fnr.message}</div>
          )}
        </div>
        <input type='submit' className='button -primary' />
      </form>
    </div>
  );
}

// */

/******************************************************************************
 == BASIC ==
******************************************************************************/
/*
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import './Profile.scss';

export default function Profile() {
  const { register, handleSubmit, formState } = useForm({ mode: 'onBlur',});
  const onSubmit = (data: { [k: string]: string }) => {
    console.log(data);
  }

  return (
    <div className='profile-wrapper'>
      <form
        noValidate
        className='form-wrapper'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='input-wrapper'>
          <label htmlFor='name' className='input-label'>Name</label>
          <div className='input-holder'>
            <input
              className={classNames('textfield', {
                '-invalid': !!formState.errors.name?.type,
              })}
              id='name'
              type='text'
              {...register('name', { required: true, maxLength: 30 })}
            />
          </div>
          {formState.errors.name?.type === 'required' && (
            <div className='input-error'>This is required</div>
          )}
          {formState.errors.name?.type === 'maxLength' && (
            <div className='input-error'>Max length exceeded</div>
          )}
        </div>
        <div className='input-wrapper'>
          <label htmlFor='age' className='input-label'>Age</label>
          <div className='input-holder'>
            <input
              className={classNames('textfield', {
                '-invalid': !!formState.errors.age?.type,
              })}
              id='age'
              type='tel'
              {...register('age', { required: true, maxLength: 2, setValueAs: (v) => {
                return parseInt( v, 10);
              }})}
            />
          </div>
          {formState.errors.age?.type === 'required' && (
            <div className='input-error'>This is required</div>
          )}
          {formState.errors.age?.type === 'maxLength' && (
            <div className='input-error'>Max length exceeded</div>
          )}
        </div>
        <input type='submit' className='button -primary' />
      </form>
    </div>
  );
}
// */