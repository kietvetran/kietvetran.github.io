import Constant from './Constant';

const OrderListEPKperson = [
    { 
        id: 'epkId',
        key: 'epkId',
        name: 'Id',
    }, { 
        id: 'bank', 
        key: 'pensionProvider.name', 
        secondKey: 'pensionProvider.orgNr.value',
        name: 'Tilbyder',                         
    }, { 
        id: 'status', 
        key: 'status',
        name: 'Status', 
        config: { dictionary: Constant.dictionary },
    }, { 
        id: 'balance',
        key: 'activeBalance',
        secondKey: 'passiveBalance',
        name: 'Balanse',
        config: [{ formatAmount: true, unit: ' kr', label: 'Aktiv: ', type: 'amount' }, { formatAmount: true, unit: ' kr', label: 'Passiv: ', type: 'amount' }],
    }, { 
        id: 'balance-date',
        key: 'activeBalanceDate',
        secondKey: 'passiveBalanceDate',
        name: 'Balanse dato',
        config: [{ dateFormat: 'dd MMm yyyy', label: 'Aktiv: ', type: 'date'}, { dateFormat: 'dd MMm yyyy', label: 'Passiv: ', type: 'date'}],
    }, { 
        id: 'pensionClaimingAge', 
        key: 'pensionClaimingAge', 
        name: 'Pensjonsalder', 
        config: {unit: ' år'}
    }, { 
        id: 'locked', 
        key: ['locked'], 
        name: 'Låst', 
    }, { 
        id: 'type', 
        key: 'type',
        name: 'Type', 

    }, { 
        id: 'registeredDate', 
        key: 'registeredDate',
        name: 'Registrert', 
        config: [{ dateFormat: 'dd MMm yyyy', type: 'date'}],
    },        
];

export default OrderListEPKperson;