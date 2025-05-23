import  {
    formatAmount,
    formatBankAccount,
    formatPersonalId,
    formatCardnumber,
    formatOrganization,
    formatPhone
} from './ValueFormat';

import {
    validateNumber,
    validatePhone,
    validateAmount,
    validateBirthday,
    validateBankAccount,
    validateOrganization,
    validatePersonalId,
    validateEmail,
    validateURL,
    validateCountryCode,
    validateCardnumber
} from './ValueValidation';

export const getFormat = (value, format) => {
    let option = {
        'amount': formatAmount,
        'phone': formatPhone,
        'bank-account': formatBankAccount,
        'person-id': formatPersonalId,
        'card-number': formatCardnumber,
        'organization': formatOrganization
    };
    return option[format] ? option[format]( value ) : null;
};

export const isValid = (value, config) => {
    let rule   = typeof(config) === 'string' ? config : (config || {}).rule;
    let option = {
        'phone'       : validatePhone,
        'number'      : validateNumber,      // allow begin with 0
        'amount'      : validateAmount,      // not allow beging with 0
        'birthday'    : validateBirthday,    // eq. 080982
        'bank-account': validateBankAccount,
        'person-id'   : validatePersonalId,
        'url'         : validateURL,
        'email'       : validateEmail,
        'country-code': validateCountryCode, // eq. +47 | +46
        'organization': validateOrganization,
        'card-number' : validateCardnumber,
    };

    return option[rule] ? option[rule](value) : true;
};

export const getFormContentFlatList = ( cnt, list=[] ) => {
    if ( ! cnt ) { return list; }
    if ( cnt instanceof Array ) {
        cnt.forEach( (d) => { getFormContentFlatList( d, list ); });
    } else if ( cnt ) {
        if ( cnt.content ) {
            getFormContentFlatList( cnt.content, list );
        } else {
            list.push( cnt );
        }
    }
    return list;
};

export const generateReduxFormValidation = (template) => {
    return (values={}) => {
        let list = getFormContentFlatList( template.content );
        let errors = list.reduce((prev, data) => {
            if ( ! data ) { return prev; }

            let { id, name, type, validation } = data;
            if (!id || !name || !type || !(validation instanceof Array)) { return prev; }

            let isBox = type.match(/(checkbox|file|image)/i) ? true : false;
            let value = isBox ? values[name] : ((values[name] || '')+'').trim();
            let i = 0, loop = validation.length;
            for (i = 0; i < loop; i++) {
                if (validation[i].ignore) { continue; }

                let error = '';
                if (validation[i].rule === 'required') {
                    let depending = (validation[i].dependent || []).find( (k) => {
                        let d = typeof(k) === 'string' ? {'key': k} : k;
                        return values[d.key] || typeof(values[d.key]) === 'number';
                    });

                    if (depending && !value) {
                        error = validation[i].message || 'Required error';
                    }
                } else if (validation[i].rule) {
                    if (value && ! isValid(value, validation[i])) {
                        error = validation[i].message || 'Invalid error';
                    }
                } else if (validation[i].regex) {
                    if (value && value.match(validation[i].regex)) {
                        error = validation[i].message || 'Regex error';
                    }
                }
                
                if (error) { prev[name] = error; i = loop; }
            }
            return prev;
        }, {});
        return errors;
    };
}