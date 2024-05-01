import json from '../static/language.json';

type Dictionary = {
  [key: string]: {
    [language: string]: string;
  };
};

const dictionary: Dictionary = json;
let preference = 'no';

export const getPreferredLanguage = (): string => preference;
export const setPreferredLanguage = (language: string): void => {
  preference = language;
};

const getText = (key: string, args?: string[] | number[], lang = ''): string => {
  const languageObject = dictionary[key];
  if (!languageObject) {
    console.warn(`KEY NOT FOUND: ${key}`);
    return `[KEY NOT FOUND: ${key}]`;
  }
  let phrase = languageObject[lang] ?? languageObject[preference] ?? languageObject.no;
  if ((args ?? []).length) {
    (args ?? []).forEach((arg: string | number): void => {
      phrase = phrase.replace('{?}', `${arg ?? ''}`);
    });
  } else {
    phrase = phrase.replace('{?}', '');
  }
  return phrase;
};

export default getText;
