import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Textarea from '../Form/Textarea';
import SelectBox, { Option } from '../Form/SelectBox';

import './Speech.scss';

type Storage = {
  voiceList: any;
  languageList: Option[]; 
};

type FormValues = {
  text?: string;
  language: string;
};

const schema = yup
  .object()
  .shape({
    // text: yup.string().required('Text is required'),
    text: yup.string(),
    language: yup.string().required('Language is required'),
  })
  .required();

export default function Speech() {
  const [storage, setStorage] = useState<Storage>({
    voiceList: [],
    languageList: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FormValues>(schema),
    defaultValues: { language: 'zh-hk' },
    mode: 'onBlur', // 'all', 'onTouched', 'onChange'
  });

  const onSubmit = (values: FormValues) => {
    if ( !values.text ) { return; }

    // Create a new instance of SpeechSynthesisUtterance.
    const msg = new SpeechSynthesisUtterance() ?? {};
    msg.text = values.text;
 
    // Set the attributes.
    ['volume', 'rate', 'pitch'].forEach((key) => {
      if ( ! values[key as keyof typeof values] ) { return; }
      // @ts-ignore
      msg[key] = parseFloat(`${values[key]}`);
    }); 

    msg.voice = storage.voiceList.find( (d: any) => d.lang === values.language );
    window.speechSynthesis.speak(msg);
  };

  useEffect( () => {
    window.speechSynthesis.onvoiceschanged = () => {
      const voiceList = window.speechSynthesis.getVoices() ?? [];
      const pin = voiceList.reduce( (pin: Record<string, string>, d: any): Record<string, string> => ({
        ...pin, 
        [d.lang]: `${d.name} - ${d.lang}`,
      }), ({} as Record<string, string>) );

      const languageList = Object.entries(pin).map( ([value, label]) => ({value, label}));
      setStorage({ voiceList, languageList})
    };    
  }, [setStorage]);

  return <div className="speech-wrapper">
    <h2>Speech</h2>
      <form
        noValidate
        className="form-wrapper"
        onSubmit={handleSubmit((values: FormValues) => {
          onSubmit(values);
        })}>
        <Textarea register={register} id="text" name="text" label="Text" error={errors.text?.message} />
        <SelectBox 
          register={register} 
          id="language" 
          name="language" 
          label="Language" 
          error={errors.language?.message} 
          optionList={storage.languageList}
        />
        <input type="submit" className="button -primary" />
      </form>

  </div>;
}
