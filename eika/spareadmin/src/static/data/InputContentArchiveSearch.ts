import Constant from './Constant';

const InputContentArchiveSearch = [
    {
        id: 'person-id',
        name: 'id',
        label: 'Søk på fødselsnummer / org.nr.',
        type: Constant.typeTel,
        maxLength: 11,
        namespace: 'person-id',
        validation: [
            {
                rule: Constant.validationPersonIdOrOrganizationNumber,
                message: Constant.validationPersonIdOrOrganizationNumberText,
            }
        ]   
    }
];

export default InputContentArchiveSearch;