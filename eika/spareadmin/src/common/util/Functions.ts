import { StringObject, MultipleObject, Order } from '../../domain/types';
import { InputContent } from '../../domain/forms';
import { formatDateToText, formatAmount } from './Formats';

/** ****************************************************************************
 ***************************************************************************** */
export const generateId = (prefix=''): string => {
    return `${prefix || 'app'}-${new Date().getTime()}-${Math.floor(Math.random() * 10000 + 1)}-${Math.floor(
        Math.random() * 10000 + 1
    )}`;
};

/** ****************************************************************************
 ***************************************************************************** */
export const capitalize = (text=''): string => {
    if (typeof text !== 'string') { return ''; }

    const reg = /^(\s+)?([a-zæøå])/;
    const result = text.match(reg);
    if (result && result[2]) {
        text = text.replace(result[2], result[2].toUpperCase());
    }
    return text;
};

/** ****************************************************************************
 ***************************************************************************** */
export const joinToText = (list: string[]): string => {
    if ( list.length < 2 ) { return list.join(' '); }
    list = list.filter( (v: string) => !!v ).map( (v) => v.trim() );
    const last = list.pop();
    return `${list.join(', ')} og ${last}`;
};


/** ****************************************************************************
 ***************************************************************************** */
export const formatTranslatedText = (text='', args?: Array<number | string>, forceCapitalize?: boolean): string => {
    (args ?? []).forEach( (v: string | number) => {
        text = text.replace( '{}', `${v}`);
    });
    return forceCapitalize ? capitalize(text.toLowerCase()) : text;
}

/** ****************************************************************************
***************************************************************************** */
export const getOffset = (target: any): number[]  => {
    const size = [0, 0];
    if (target) {
        do {
            size[0] += target.offsetLeft || 0;
            size[1] += target.offsetTop || 0;
            target = target.offsetParent;
        } while (target);
    }
    return size;
};

/** ****************************************************************************
 ***************************************************************************** */
export const getURLquery = ( url?: string ): any => {
    const matched =  (url || window.location.href).replace( /#(\/)?$/, '' )
        .replace(/\?+/g, '?').match(/^([\w.\-\s_#%/:]+)\?(.*)/);
    if ( !matched || !matched[2] ) { return {}; }

    const splited = (decodeURIComponent(matched[2]) || '').replace(/#\?/g, '&').split('&');
    return splited.reduce( (query: any, text: any) => {
        const data = (text || '').match(/(\w+)=(.*)/);
        if ( !data || !data[1] || !data[2] ) { return query; }

        if ( query[data[1]] ) {
            query[data[1]] = (
                query[data[1]] instanceof Array ? query[data[1]] : [query[data[1]]]
            ).concat( data[2] );
        } else {
            query[data[1]] = data[2];
        }
        return query;
    }, {});
};

/** ****************************************************************************
***************************************************************************** */
export const createRegexp = (text: string, g?: boolean, i?: boolean, b?: number, f?: number): RegExp => {
    if (text === '*') { return /.*/; }

    const v = text.replace(/\*/, '.*')
        .replace(/\+/g, '\\+')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\?/g, '\\?')
        .replace(/-/g, '\\-')
        .replace(/\$/g, '\\$');

    /* eslint-disable */ // => to ignor eslint no-nested-ternary
    const m = (g && i) ? 'gi' : ((g || i) ? (g ? 'g' : 'i') : '');
    const s = b ? (b === 2 ? '^' : (b === 3 ? '(^|/|\\s+|,|\\()' : '(^|/|\\s+)')) : '';
    const e = f ? (f === 2 ? '$' : (f === 3 ? '($|/|\\s+|,|\\))' : '($|/|\\s+)')) : '';
    /* eslint-enable */

    return new RegExp(`${s}(${v})${e}`, m);
};
/** ****************************************************************************
 ***************************************************************************** */
export const getLastPathname = (pathname=''): string => {
    return (pathname.match( /(\w+)$/) || [])[1] || '';
}

/** ****************************************************************************
 ***************************************************************************** */
export const getText = (order: Order, data: MultipleObject, i=0): string => {
    const keyList = order.key instanceof Array ? order.key : [order.key];
    const config = order.config instanceof Array ? (order.config[i] || {}) : (order.config || {});
    const out = keyList.reduce( (p: string, key: string) => {
        const splited = (key || '').split('.');
        let value = '';
        if ( splited.length > 1 ) {
            const l = splited.pop();
            const n = splited.reduce( (m: any, k: string) => {
                return m[k] || {};
            }, data);
            // @ts-ignore
            const v = n[l] instanceof Array ? n[l].join(', ') : n[l];
            value = `${(v || config.defaultText || '')}`;
        } else {
            const v = data[key] instanceof Array ? data[key].join(', ') : data[key];
            value = `${(v || config.defaultText || '')}`;
        }

        if ( config.dateFormat && value ) {
            value = formatDateToText((new Date(value)), config.dateFormat);
        }

        if ( config.dictionary ) {
            value = config.dictionary[value] || value;
        } else if ( config.formatAmount ) {
            value = formatAmount(value);
        }

        if ( config.unit && value ) {
            value = `${value}${config.unit}`;
        }

        p += `${value} `;
        return p;
    }, '').trim();

    return [out, order.unit].filter( (v) => !!v).join(' ');
};


export const getValue = ( note: any, src: any ): string[] => {
    const get = (data: any, fieldList: string[]): any => {
        const field = fieldList.shift() as string;
        const value = (data || {})[field] || '';
        return fieldList.length > 0 && typeof(value) === 'object' ? get(value, fieldList) : value; 
    };

    return (src.key instanceof Array ? src.key : [src.key]).map( (key: string, i: number) => {
        let value = get( note, key.split('.') );

        if ( value && src.valueReplace ) {
            value = value.replace( src.valueReplace[0], src.valueReplace[1] );
        }

        if ( src.valueOption ) {
            value = src.valueOption[`${value || false}`];
        }

        if ( src.format === 'date' ){
            const date = new Date( value );
            value = formatDateToText( date, src.formatType );
        } else if ( src.format === 'amount' && value) {
            value = formatAmount((parseFloat(`${value}`))); 
        }

        if ( src.valueExtension && src.valueExtension[i] ) {
            value += src.valueExtension[i];
        }

        return value;
    });
};

export const getFormValues = (getValues: (k: string | string[]) => string[], inputList: InputContent[] | InputContent[][]): StringObject => {
    const names: string[] = [];
    inputList.forEach( (cnt: InputContent | InputContent[] ) => {
        (cnt instanceof Array ? cnt : [cnt]).forEach( (input: InputContent) => {
            names.push( input.name );
        });
    });
    const values = getValues( names );
    const out: StringObject = {};
    names.forEach( (name: string, i: number) => { out[name] = values[i]; });
    return out;
};

export const getDefaultValues = (inputList: InputContent[] | InputContent[][]): StringObject => {
    const output: StringObject = {};
    inputList.forEach( (cnt: InputContent | InputContent[] ) => {
        (cnt instanceof Array ? cnt : [cnt]).forEach( (input: InputContent) => {
            output[input.name] = `${input.defaultValue ?? ''}`;
        });
    });
    return output;
};

/******************************************************************************
******************************************************************************/
export const getMonthListText = ( shortname=false ): string[] => {
    return shortname ? [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun',
        'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'
    ] : [
        'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
    ];
};


export const getDayListText = ( shortname=false ): string[] => {
    return shortname ? [
        'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'
    ] : [
        'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'
    ];
};

/** ****************************************************************************
 ***************************************************************************** */
export const convertBase64ToBlob = (base64: string, application: string): any => {
    if ( !base64 || !application) { return null; }
    const byteCharacters = window.atob(base64.replace(/\s+/g,''));


    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: application});
}

export const openBase64 = (base64: string, application: string, filename: string): void => {
    const blob = convertBase64ToBlob( base64, application );
    if ( !blob ) { return; }

    // @ts-ignore
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
        // @ts-ignore
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        const blobUrl = URL.createObjectURL(blob);
        window.open( blobUrl );
    }
}

/** ****************************************************************************
 ***************************************************************************** */
export const scrollBodyTop = (where=0): void => {
    // eslint-disable-next-line no-restricted-globals
    const top = where && !isNaN(where) && where > 0 ? where : 0;    
    const body = document.getElementById('app-body');
    if ( body ) { body.scrollTop = top; }
};