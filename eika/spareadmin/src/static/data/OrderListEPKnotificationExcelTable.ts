import Constant from './Constant';

const OrderListEPKnotificationExcelTable = [
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
        id: 'rDate',
        key: 'registeredDatetime',
        secondKey: 'modifiedDatetime',
        name: 'Registrert',
        config: { dateFormat: 'dd MMm yyyy'},
    }, { 
        id: 'mDate',
        key: 'modifiedDatetime',
        name: 'Endret',
        config: { dateFormat: 'dd MMm yyyy'},
    }, { 
        id: 'fProvider',
        key: 'notificationFromTilbyder.name',
        name: 'Fra tilbyder',
    }, { 
        id: 'tProvider',
        key: 'notificationToTilbyder.name',
        name: 'Til tilbyder',
    }, { 
        id: 'bank-account', 
        key: 'bankkonto.value', 
        name: 'Bankkonto', 
    }, { 
        id: 'aKid',
        key: 'kidAktiv.value',
        name: 'KID aktiv',
    }, { 
        id: 'pKid',
        key: 'kidPassiv.value',
        name: 'KID passiv',
    }, { 
        id: 'kid',
        key: 'kid.value',
        name: 'KID',
    }, { 
        id: 'amount', 
        key: 'belop',
        name: 'Bøløp', 
    },        
];

export default OrderListEPKnotificationExcelTable;