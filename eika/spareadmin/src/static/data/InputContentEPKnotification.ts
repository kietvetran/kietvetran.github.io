import Constant from './Constant';

export const InputContentEPKnotificationFirst = [
    [
        {
            id: 'person-id',
            name: 'fnr',
            label: 'Fødselsnummer',
            type: Constant.typeTel,
            maxLength: 11,
            namespace: 'person-id',
            validation: [
                {
                    rule: Constant.validationPersonId,
                    message: Constant.validationPersonIdText,
                }
            ],
        }, 
    ], [ 
        {
            id: 'origin-id',
            name: 'origin',
            label: 'Origin',
            type: Constant.typeSelect,
            namespace: 'origin-id',
            option: [
                {id: '', name: 'Ingen'},
                {id: 'SELF', name: 'Self - Eika'},
                {id: 'OTHER', name: 'Other - '},
            ],
        }, 
    ], [
        {
            id: 'pkb-id',
            name: 'pkbId',
            label: 'PKB id',
            type: Constant.typeTel,
            namespace: 'pkb-id',
        }, {
            id: 'epk-id',
            name: 'epkId',
            label: 'EPK id',
            type: Constant.typeTel,
            namespace: 'epk-id',
        },
    ], [
        {
            id: 'from-date',
            name: 'fromDate',
            label: 'Fra dag',
            type: Constant.typeSelect,
            namespace: 'from-date',
            option: [],
        }, {
            id: 'from-month',
            name: 'fromMonth',
            label: 'Fra måned',
            type: Constant.typeSelect,
            namespace: 'from-month',
            option: [],
        }, {
            id: 'from-year',
            name: 'fromYear',
            label: 'Fra år',
            type: Constant.typeSelect,
            namespace: 'from-year',
            option: [],
        }, 
    ], [
        {
            id: 'to-date',
            name: 'toDate',
            label: 'Til dag',
            type: Constant.typeSelect,
            namespace: 'to-date',
            option: [],
        }, {
            id: 'to-month',
            name: 'toMonth',
            label: 'Til måned',
            type: Constant.typeSelect,
            namespace: 'to-month',
            option: [],
        }, {
            id: 'to-year',
            name: 'toYear',
            label: 'Til år',
            type: Constant.typeSelect,
            namespace: 'to-year',
            option: [],
        }, 
    ]
];

export const InputContentEPKnotificationSecond = [{
    id: 'ALL_TYPE',
    name: 'ALL_TYPE',
    label: 'Notifikasjonstyper',
    type: Constant.typeCheckbox,
}].concat( ['EPK_MOVE', 'EPK_PAYMENT_DEMAND', 'PKB_MOVE', 'PKB_EMBED', 'PKB_PAYMENT_DEMAND'].map( (k: string) => {
    return { id: k, name: k, label: Constant.dictionary[k] || k, type: Constant.typeCheckbox};
}));

export const InputContentEPKnotificationThird = [{
    id: 'all-ALL_STATUS',
    name: 'ALL_STATUS',
    label: 'Statuser',
    type: Constant.typeCheckbox,
}].concat( ['INITIALIZED', 'ACCEPTED', 'FINALIZED', 'NOT_ACCEPTED', 'DONE', 'FAILED'].map( (k: string) => {
    return { id: k, name: k, label: Constant.dictionary[k] || k, type: Constant.typeCheckbox};
}));