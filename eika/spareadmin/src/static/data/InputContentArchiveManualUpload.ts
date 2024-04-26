import Constant from './Constant';

const InputContentArchiveManualUpload = [
    {
        id: 'source-id',
        name: 'source',
        label: 'Kilde',
        type: Constant.typeSelect,
        option: [
            {id: 'SPAREADMIN', name: 'Spareadmin'},
            {id: 'SMARTSPAR', name: 'Smartspar'},
            {id: 'PENSJONSMENTOR', name: 'Pensjonsmentor'},
            {id: 'MANUAL_UPLOAD', name: 'Manuell opplasting'},
        ],
        defaultValue: 'SPAREADMIN',
    }, {
        id: 'order-id',
        name: 'orderId',
        label: 'SigneringsordreId',
        type: Constant.typeTextarea,
        validation: [
            {
                rule: Constant.validationRequired,
                message: Constant.validationRequiredText,
            }
        ]   
    }
];

export default InputContentArchiveManualUpload;