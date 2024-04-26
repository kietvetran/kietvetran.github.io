import Constant from './Constant';

const InputContentArchiveSearch = [
    {
        id: 'fund-filter',
        name: 'fundFilter',
        label: 'Fritekst søk',
        type: Constant.typeText,
        namespace: 'fund-filter',
    }, {
        id: 'fund-show-description',
        name: 'fundShowDescription',
        legend: 'Visningsverktøy',
        label: 'Vis fond beskrivelse',
        type: Constant.typeCheckbox,
    }
];

export default InputContentArchiveSearch;