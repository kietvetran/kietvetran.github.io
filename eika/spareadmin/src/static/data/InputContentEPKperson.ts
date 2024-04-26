import Constant from './Constant';

const InputContentEPKperson = [
    {
        id: 'person-id',
        name: 'personFnr',
        label: 'Søk på fødselsnummer',
        type: Constant.typeTel,
        maxLength: 11,
        namespace: 'person-id',
        validation: [
            {
                rule: Constant.validationPersonId,
                message: Constant.validationPersonIdText,
            }
        ]   
    }
];

export default InputContentEPKperson;