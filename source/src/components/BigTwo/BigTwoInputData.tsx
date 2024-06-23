import { yupResolver } from '@hookform/resolvers/yup';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { getTiming } from './BigTwoFunctions';
import { StringObject, MultipleObject } from '../../domain/Types';
import InputField from '../Form/InputField';

type Props = {
  callback: (data: string[], row: number) => void;
  row: number;
  pin?: string;
  data?: string[];
  result?: number[];
  amount?: number[];
};

export default function BigTwoInputData(props: Props) {
  const length = 4;
  const schema = yup
    .object()
    .shape(
      Array.from({ length }).reduce((p: MultipleObject, _x, i: number) => {
        p[`data-${props.row}-${i}`] =
          props.row === 0 // Row 0 is player
            ? yup.string().required('Required')
            : yup.string().matches(/^(\s*|\d+)$/, 'Must be only digits'); // is empty or digit
        return p;
      }, {} as MultipleObject),
    )
    .required();

  const [currentValues, setCurrentValues] = useState<StringObject>(
    (props.data ?? []).reduce((p: StringObject, v: string, i: number): StringObject => {
      p[`data-${props.row}-${i}` as keyof StringObject] = v ?? '';
      return p;
    }, {} as StringObject),
  );

  const {
    register,
    handleSubmit,
    getValues,
    // watch,
    clearErrors,
    formState: { errors },
    // trigger,
    // getFieldState,
  } = useForm({
    resolver: yupResolver<StringObject>(schema),
    mode: 'onBlur', // 'all', 'onTouched', 'onChange', 'onBlur',
    defaultValues: currentValues,
  });

  /*
    const isFieldRequired = (fieldName: string): boolean => {
      const field = schema.describe().fields[fieldName] as any;
      return field.tests.some((item: any) => item.name === 'required') ?? false;
    };
    */

  const getValueList = (values: StringObject, name = '', value = ''): string[] => {
    const list: string[] = Array.from({ length }).map((_x, i: number): string => {
      return values[`data-${props.row}-${i}`] ?? '';
    });

    if (!name) {
      return list;
    }

    const index = name.split('-').pop() ?? '';
    if (!index) {
      return list;
    }

    const i = parseInt(index, 10);
    list[i] = value ?? '';
    return list;
  };

  const onSubmit = (values: StringObject): void => {
    // schema.isValid(values).then((valid: boolean) => {
    //   if ( valid ) { props.callback(values); }
    // });
    props.callback(getValueList(values), props.row);
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const name = e.target.name;
    const value = e.target.value.trim();
    const values = getValues();

    if (errors[name as keyof typeof errors]?.type === 'required' && value) {
      clearErrors(name);
    } else if (errors[name as keyof typeof errors]?.message) {
      try {
        const current = { [name]: value };
        const validated = await schema.validate(current);
        if (JSON.stringify(current) === JSON.stringify(validated)) {
          clearErrors(name);
        }
      } catch (error) {
        // do not thing
      }
    }

    props.callback(getValueList(values, name, value), props.row);
    setCurrentValues({ ...values, [name]: value });
    /*
      console.log('== HER ==');
      console.log(name);
      console.log(value);

      // const valid = await schema.isValid({'data00': '1', 'data01': '2', 'data02': 'a', 'data03': 'd'});
      // const valid = await schema.validate({ 'data00': '1' });
      try {
        const valid = await schema.validate({ [name]: value });
        console.log(valid);
      } catch ( error ) {

      }
      */

    // const valid = await schema.isValid({'data00': '1', 'data01': '2', 'data02': 'a', 'data03': 'd'});

    // if ( errors[name as keyof typeof errors]?.message ) {
    // const v = await trigger(name);
    // console.log('== V ==');
    // console.log( v );
    // }
  };

  // The problem with using of watch, it has to set errors as dependency in useEffect.
  // Watch and onChange cannot use at the same time.
  /*
  useEffect(() => {
    const subscription = watch((values, { name, ...rest }) => {
      if ( errors[name as keyof typeof errors]?.message ) {
        clearErrors( name );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  */
  return (
    <div className={`game-row -${props.row === 0 ? 'player' : 'data'}`}>
      <form
        noValidate
        className="form-wrapper"
        onSubmit={handleSubmit((values: StringObject) => {
          onSubmit(values);
        })}>
        <div className="cell">
          <span>{props.pin ?? ''}</span>
        </div>
        {Array.from({ length }).map((_x, i: number) => {
          const key = `data-${props.row}-${i}`;
          const error = errors[key as keyof typeof errors]?.message;
          return (
            <div key={key} className={`cell -timing-${getTiming(currentValues[key])}`}>
              {!!props.result && (
                <div className="result">
                  {props.result[i] ? (
                    <>
                      {!!props.amount && <span className="amount">{props.amount[i] ?? ''}</span>}
                      <span className="count">({props.result[i] ?? '-'})</span>
                    </>
                  ) : (
                    <>-</>
                  )}
                </div>
              )}
              {props.row === 0 ? ( // Row 0 is player
                <InputField register={register} placeholder={`Player ${i + 1}`} id={key} name={key} label="Name" error={error} onChange={onChange} />
              ) : (
                <InputField register={register} id={key} name={key} type="tel" label="Card" error={error} onChange={onChange} />
              )}
            </div>
          );
        })}
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
