import Constant from './Constant';

const OrderListIssue = [
    { 
        id: 'created',
        key: 'opprettetdato',
        secondKey: ['fornavnMedeier', 'etternavnMedeier'],
        name: 'Opprettet',
        config: { dateFormat: 'dd MMm yyyy' },
        sorting: { status: 1, key: 'opprettet'},
    }, { 
        id: 'bank', 
        key: 'bankregnr.value', 
        secondKey: 'bankregnr.value', 
        name: 'Bank',                         
        config: [{ dictionary: Constant.dictionary}],
        sorting: { status: 0, key: 'bank'},
    }, { 
        id: 'status', 
        key: 'status',
        name: 'Status', 
        config: { dictionary: Constant.dictionary },

    }, { 
        id: 'contact',
        key: 'oppretterForelder.mobilnummer.value',
        name: 'Kontaktinfo',
    }, { 
        id: 'child', 
        key: ['navn'], 
        secondKey: ['foedselsnummer.value'], 
        name: 'Barn',
        style: 'capitalize',
    }, { 
        id: 'first-parent', 
        key: ['oppretterForelder.navn'], 
        secondKey: ['oppretterForelder.foedselsnummer.value'],
        name: '1. Verge', 
        style: 'capitalize',
    }, { 
        id: 'second-parent', 
        key: ['andreForelder.navn'],
        secondKey: ['andreForelder.foedselsnummer.value'], 
        name: '2. Verge', 
        style: 'capitalize',
    }, { 
        id: 'tool', 
        key: '-',
        name: 'Verktøy', 
        config: { dictionary: Constant.dictionary, tool: true },
    },        
];

export default OrderListIssue;