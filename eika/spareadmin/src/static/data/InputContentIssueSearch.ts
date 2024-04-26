import Constant from './Constant';

const InputContentIssueSearch = [
    {
        id: 'search-bank-id',
        label: 'Søk på bankregnummer',
        name: 'searchBankId',
        maxLength: 4,
        type: Constant.typeText,
        validation: [
            {
                rule: Constant.validationBankRegNumber,
                message: Constant.validationBankRegNumberText,
            }
        ]   
    }, {
        id: 'search-person-id',
        label: 'Søk på fødselsnummer',
        name: 'searchPersonId',
        type: Constant.typeText,
        validation: [
            {
                rule: Constant.validationPersonId,
                message: Constant.validationPersonIdText,
            }
        ]   
    }
];

export default InputContentIssueSearch;