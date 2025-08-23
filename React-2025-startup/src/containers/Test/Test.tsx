import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { HookInputField, HookTextarea, HookSelectbox } from '../../components/Form/InputField';

import './Test.scss';

const SCHEMA = yup.object({
  name: yup.string().required('Name is required'),
  note: yup.string().required('Note is required'),
  animal: yup.string().required('Animal is required'),
});

type FormValues = yup.InferType<typeof SCHEMA>;

export function Test() {
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(SCHEMA),
    defaultValues: {
      name: '',
      note: '',
      animal: '',
    },
  });
  const { handleSubmit } = formMethods;

  return (
    <div className="test-wrapper">
      <h2>Test - From</h2>
      <FormProvider {...formMethods}>
        <form
          noValidate
          className="form-wrapper"
          onSubmit={handleSubmit((values: FormValues) => {
            console.log('== SUBMIT ==');
            console.log(values);
          })}>
          <HookInputField name="name" label="Name" type="text" data-test-id="test-name" />
          <HookTextarea name="note" label="Note" data-test-id="test-note" />
          <HookSelectbox
            name="animal"
            label="Animal"
            data-test-id="test-animal"
            options={[
              { value: 'dog', label: 'Dog' },
              { value: 'cat', label: 'Cat' },
              { value: 'bird', label: 'Bird' },
            ]}
          />
          <input type="submit" className="button -primary" />
        </form>
      </FormProvider>
    </div>
  );
}
