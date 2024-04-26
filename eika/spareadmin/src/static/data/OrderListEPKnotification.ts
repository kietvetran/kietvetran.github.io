import Constant from './Constant';

const OrderListEPKnotification = [
    { 
        id: 'type',
        key: 'type',
        name: 'Type',
        config: { dictionary: Constant.dictionary },
    }, { 
        id: 'status', 
        key: 'status',
        name: 'Status', 
        config: { dictionary: Constant.dictionary },
    }, { 
        id: 'date',
        key: 'registeredDatetime',
        secondKey: 'modifiedDatetime',
        name: 'Dato',
        config: [{ dateFormat: 'dd MMm yyyy', label: 'Registrert: ', type: 'date'}, { dateFormat: 'dd MMm yyyy', label: 'Endret: ', type: 'date'}],
        sorting: { status: 2, key: 'registeredDatetime', isDate: true},
    }, { 
        id: 'provider',
        key: 'notificationFromTilbyder.name',
        secondKey: 'notificationToTilbyder.name',
        name: 'Tilbyder',
        config: [{label: 'Fra: '}, { label: 'Til: '}],
    }, { 
        id: 'bank-account', 
        key: 'bankkonto.value', 
        name: 'Bankkonto', 
    }, { 
        id: 'kid',
        key: 'kidAktiv.value',
        secondKey: 'kidPassiv.value',
        name: 'KID',
        config: [{label: 'Aktiv: ', optionalKey: 'kid.value'}, { label: 'Passiv: '}],
    }, { 
        id: 'amount', 
        key: 'belop',
        name: 'Bøløp', 
        config: { unit: ' kr'},
    }, { 
        id: 'tool', 
        key: '-',
        name: 'Verktøy', 
        config: { dictionary: Constant.dictionary, tool: true },
    },        
];

export default OrderListEPKnotification;