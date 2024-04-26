import Constant from './Constant';

const InputContentIssue = [
    {
        id: 'action-field',
        name: 'action',
        label: 'Status endring',
        type: Constant.typeSelect,
        option: [
            {id: '', name: 'Ingen'},
            {id: 'approve', name: 'Godkjenn'},
            {id: 'decline', name: 'Avvis'},
            {id: 'retranfer', name: 'Overføre på nytt'},
        ],
    }, {
        id: 'file-field',
        name: 'file',
        legend: 'Filopplasting',
        label: 'Last opp ny fødselsattest',
        type: Constant.typeFilefield,
        accept: 'image/*,application/pdf',
    }, {
        id: 'note-field',
        name: 'note',
        label: 'Notat',
        type: Constant.typeTextarea,
    }
];

export default InputContentIssue;