import React, { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { HookInputField, HookTextarea, HookSelectbox } from '../../components/Form/InputField';

import './Test.scss';

const BASIC = yup.object({
  name: yup.string().nullable().required('Name is required'),
  note: yup.string().required('Note is required'),
  animal: yup.string().required('Animal is required'),
});

type BasicValues = yup.InferType<typeof BASIC>;
const SCHEMA = BASIC.clone() as yup.ObjectSchema<Omit<BasicValues, 'name'> & { name: string | null }>;

/*
const SCHEMA = yup.object({
  name: yup.string().nullable().required('Name is required'),
  // note: yup.string().required('Note is required'),
  // animal: yup.string().required('Animal is required'),
}) as yup.ObjectSchema<{ name: string | null }>;
*/

type FormValues = yup.InferType<typeof SCHEMA>;
// type FormValues = { name: string | null;};

export function Test() {
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(SCHEMA),
    mode: 'onChange', // 'all', 'onTouched', 'onChange', 'onBlur'
    defaultValues: {
      name: null,
      note: '',
      animal: '',
    },
  });
  const { handleSubmit, reset } = formMethods;

  const submit = useCallback((values: FormValues) => {
    console.log('== SUBMIT ==');
    console.log(values);
  }, []);

  return (
    <div className="test-wrapper">
      <h2>Test - From</h2>
      <FormProvider {...formMethods}>
        <form noValidate className="form-wrapper" onSubmit={handleSubmit(submit)}>
          <HookInputField name="name" label="Name" type="text" data-testid="test-name" />
          <HookTextarea name="note" label="Note" data-testid="test-note" />
          <HookSelectbox
            name="animal"
            label="Animal"
            data-testid="test-animal"
            options={[
              { value: '', label: '' },
              { value: 'dog', label: 'Dog' },
              { value: 'cat', label: 'Cat' },
              { value: 'bird', label: 'Bird' },
            ]}
          />
          <div>
            <button
              type="reset"
              className="button -secondary"
              onClick={() => {
                reset();
              }}>
              Reset
            </button>
            <button type="submit" className="button -primary">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
