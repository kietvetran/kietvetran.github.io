/** ****************************************************************************
 ***************************************************************************** */
export const generateId = (prefix = '', simple = false): string => {
  return simple
    ? `${prefix || 'app'}-${Math.floor(Math.random() * 10000 + 1)}`
    : `${prefix || 'app'}-${new Date().getTime()}-${Math.floor(Math.random() * 10000 + 1)}-${Math.floor(Math.random() * 10000 + 1)}`;
};

export const capitalize = (text = ''): string => {
  if (typeof text !== 'string') {
    return '';
  }

  const reg = /^(\s+)?([a-zæøå])/;
  const result = text.match(reg);
  if (result instanceof Array && result[2]) {
    text = text.replace(result[2], result[2].toUpperCase());
  }
  return text;
};

/** ****************************************************************************
 ***************************************************************************** */
export const createRegexp = (text = '', g = 0, i = 0, b = 0, f = 0, ignorReplacing = false): RegExp => {
  if (text === '*') {
    return /.*/;
  }
  const v = ignorReplacing
    ? text
    : `${text}`
        .replace(/\*/, '.*')
        .replace(/\+/g, '\\+')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\?/g, '\\?')
        .replace(/-/g, '\\-')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\$/g, '\\$');

  const m = g && i ? 'gi' : g || i ? (g ? 'g' : 'i') : '';
  const s = b ? (b === 2 ? '^' : b === 3 ? '(^|/|\\s+|,|\\()' : '(^|/|\\s+)') : '';
  const e = f ? (f === 2 ? '$' : f === 3 ? '($|/|\\s+|,|\\))' : '($|/|\\s+)') : '';
  return new RegExp(`${s}(${v})${e}`, m);
};

export const getMonthText = (shortname = false): string[] => {
  return shortname
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
    : ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
};

/** ****************************************************************************
 ***************************************************************************** */
export const getURLquery = (url = window.location.href): { [k: string]: string } => {
  const matched = url
    .replace(/#(\/)?$/, '')
    .replace(/\?+/g, '?')
    .match(/^([\w.\-\s_#%/:]+)\?(.*)/);
  if (!matched?.[2]) {
    return {};
  }

  const splited = (decodeURIComponent(matched[2]) || '').replace(/#\?/g, '&').split('&');
  return splited.reduce((query: any, text: any) => {
    const data = (text || '').match(/(\w+)=(.*)/);
    if (!data?.[1] || !data[2]) {
      return query;
    }

    if (query[data[1]]) {
      query[data[1]] = (query[data[1]] instanceof Array ? query[data[1]] : [query[data[1]]]).concat(data[2]);
    } else {
      query[data[1]] = data[2];
    }
    return query;
  }, {});
};

/** ****************************************************************************
=== FORMATATION ===
***************************************************************************** */
export const parseNumber = (value?: string | number, useFloat = false): number => {
  const v = `${value ?? 0}`.replace(/\s+/g, '').replace(',', '.');
  return useFloat ? parseFloat(v) : parseInt(v, 10);
};

export const splitText = (text = '', split = 0): string[] => {
  let i = (text || '').length % split;
  const list = i ? [text.substr(0, i)] : [];
  for (i; i < text.length; i += split) {
    list.push(text.substr(i, split));
  }
  return list;
};

export const formatAmount = (value?: string | number, round?: boolean | number): string => {
  if (value && /^\d+[\s-]+\d+$/i.test(`${value}`)) {
    return `${value}`;
  }

  if (value === null || value === '—' || value === undefined) {
    return '—';
  }
  if (!value) {
    return `${value ?? ''}`;
  }

  let text = `${value}`.replace(/[\s]+/g, '');
  let number = parseFloat(text.replace(/,/g, '.'));

  if (round && number) {
    const opt = [0, 10, 100, 100, 1000, 1000, 10000, 100000];
    number = typeof round === 'number' && opt[round] ? Math.round(number * opt[round]) / opt[round] : Math.round(number);
    text = `${number}`;
  }

  const isNegative = number < 0;
  if (isNegative) {
    number *= -1;
    text = text.replace(/-/g, '');
  }

  //if (number < 10000) { return `${value}`.replace( '.', ',' ); }

  let end = '';
  if (/(\.|,)\d+/.test(text)) {
    // @ts-ignore
    end = text.match(/((\.|,)\d+)/)[0];
    text = `${parseInt(`${number}`, 10)}`;
  }

  const output = (isNegative ? '-' : '') + (splitText(text, 3).join(' ') + end);
  return output.replace('.', ',');
};

export const formatDateToText = (date = new Date(), format = 'dd.mm.yyyy'): string => {
  const quarterly = ['Første kvartal', 'Andre kvartal', 'Tredje kvartal', 'Fjerde kvartal'];
  const dayShortname = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
  const monthShortname = getMonthText(true);
  const monthName = getMonthText();
  const month = date.getMonth();
  const list = [
    { reg: createRegexp('yyyy'), value: date.getFullYear() },
    { reg: createRegexp('mm'), value: month + 1 },
    { reg: createRegexp('dd'), value: date.getDate() },
    { reg: createRegexp('hh'), value: date.getHours(), addZero: true },
    { reg: createRegexp('min'), value: date.getMinutes(), addZero: true },
    { reg: createRegexp('msec'), value: date.getMilliseconds(), addZero: true },
    { reg: createRegexp('sec'), value: date.getSeconds(), addZero: true },
    { reg: createRegexp('MMm'), value: monthShortname[month] },
    { reg: createRegexp('MM'), value: monthName[month] },
    { reg: createRegexp('day'), value: dayShortname[date.getDay()] },
    { reg: createRegexp('qa'), value: quarterly[parseInt(`${month / 3}`, 10)] },
  ];

  list.forEach((info) => {
    if (typeof info.value === 'number' && info.value < 10) {
      info.value = `0${info.value}`;
    }
  });

  let output = format;
  list.forEach((info) => {
    if (!info.reg.test(output)) {
      return;
    }
    // @ts-ignore
    output = output.replace(info.reg, info.value);
  });
  return output;
};

export const getDelay = (aimed: Date, expected: Date): string => {
    const aimedTime = aimed ? aimed.getTime() : 0;
    const expectedTime = expected ? expected.getTime() : 0;
    const diffSecond = parseInt(`${(expectedTime - aimedTime) / 1000}`, 10);
    if (diffSecond < 20) {
        return '';
    }
    return `${diffSecond} seconds`;
};

/** ****************************************************************************
 ***************************************************************************** */
export const getRecognition = (): any => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // @ts-ignore
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    // @ts-ignore
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const names: Array<string> = ['John', 'Eric', 'CCH', 'Jacky', 'Kit']; //['black', 'white'];
    const recognition = new SpeechRecognition();
    if (SpeechGrammarList && names.length) {
        // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
        // This code is provided as a demonstration of possible capability. You may choose not to use it.
        const speechRecognitionList = new SpeechGrammarList();
        const grammar = '#JSGF V1.0; grammar names; public <name> = ' + names.join(' | ') + ' ;'
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
    }
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    return recognition;
}
