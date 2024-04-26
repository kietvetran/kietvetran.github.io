import Constant from './Constant';

const InputContentEPKnotificationFinalize = [
    {
        id: 'action-field',
        name: 'action',
        label: 'Var det vellykket?',
        type: Constant.typeSelect,
        option: [
            {id: 'yes', name: 'Ja'},
            {id: '', name: 'Nei'},
        ],
        defaultValue: 'yes',
    }
];

export default InputContentEPKnotificationFinalize;