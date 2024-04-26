import Constant from './Constant';

const InputContentGuideline = [
    {
        id: 'mobileCustomerId',
        name: 'customerId',
        label: 'Fødelsesnr',
        type: Constant.typeTel,
        required: true,
        maxLength: 11,
        namespace: 'customer-id',
        validation: [
            {
                rule: Constant.validationRequired,
                message: Constant.validationRequiredText,
            }, {
                rule: Constant.validationPersonId,
                message: Constant.validationPersonIdText,
            }
        ]     
    }, {
        id: 'otp',
        name: 'otp',
        label: 'OTP',
        type: Constant.typeTel,
        required: true,
        maxLength: 6,
        namespace: 'code-id',
        validation: [
            {
                rule: Constant.validationRequired,
                message: Constant.validationRequiredText,
            }, {
                rule: Constant.validationCodeNumber,
                message: Constant.validationCodeNumberText,
            }
        ]            
    }, {
        id: 'origin-id',
        name: 'origin',
        label: 'Origin',
        type: Constant.typeSelect,
        maxLength: 11,
        namespace: 'origin-id',
        option: [
            {id: '', name: '-'},
            {id: 'SELF', name: 'Self - Eika'},
            {id: 'OTHER', name: 'Other - '},
        ],
    }, {
        id: 'renew-field',
        name: 'renew',
        legend: 'Overføring',
        label: 'Nytt overføring',
        type: Constant.typeCheckbox,
    }, {
        id: 'reject-field',
        name: 'reject',
        legend: 'Avvisning',
        label: 'Avvist overføring',
        type: Constant.typeCheckbox,
    }, {
        id: 'file-field',
        name: 'file',
        legend: 'Filopplasting',
        label: 'Last opp ny fødselsattest',
        type: Constant.typeFilefield,
    }, {
        id: 'note-field',
        name: 'note',
        label: 'Notat',
        type: Constant.typeTextarea,
    }
];

export default InputContentGuideline;