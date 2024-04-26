import Constant from './Constant';

const OrderListArchiveSearch = [
    { 
        id: 'created',
        key: 'opprettet',
        name: 'Opprettet',
        config: { dateFormat: 'dd MMm yyyy hh:min' },
        sorting: {status: 2, key: 'opprettet', isDate: true},
    }, { 
        id: 'bank', 
        key: 'emner.bankregnr', 
        secondKey: 'emner.bankregnr', 
        name: 'Bank',                         
        config: [{ dictionary: Constant.dictionary}],
    }, { 
        id: 'customer-name', 
        key: ['fornavn', 'etternavn'], 
        secondKey: 'offentligId.value',
        name: 'Kunde',
        style: 'capitalize',
    }, { 
        id: 'document-name', 
        key: 'documentFile', 
        name: 'Dokument',                         
        config: { click: 'open-document-file', style: 'external'},
    }, { 
        id: 'Type', 
        key: 'emner.EKFDokumentType',
        name: 'Status', 
    }, { 
        id: 'personsensitivitetsstype', 
        key: 'personsensitivitetsstype', 
        name: 'Personsensitivitetsstype', 
    }, { 
        id: 'tool', 
        key: '-',
        name: 'Verktøy', 
        config: { dictionary: Constant.dictionary, tool: true },
    },        
];

export default OrderListArchiveSearch;