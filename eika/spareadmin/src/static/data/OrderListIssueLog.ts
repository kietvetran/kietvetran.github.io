const OrderListIssueLog = [
    { 
        id: 'created',
        key: 'tidspunkt',
        name: 'Tidspunkt',
        config: { dateFormat: 'dd MMm yyyy hh:min' },
    }, { 
        id: 'advisor', 
        key: ['raadgiver.fornavn', 'raadgiver.etternavn'],
        name: 'Rådgiver', 
    }, { 
        id: 'note', 
        key: 'kommentar',
        name: 'Notat', 
    },        
];

export default OrderListIssueLog;