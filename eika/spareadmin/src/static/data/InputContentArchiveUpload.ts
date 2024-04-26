import Constant from './Constant';

const InputContentArchiveUpload = [
    [
        {
            id: 'person-id',
            name: 'id',
            label: 'Fødselsnummer / org.nr.',
            type: Constant.typeTel,
            maxLength: 11,
            namespace: 'person-id',
            validation: [
                {
                    rule: Constant.validationRequired,
                    message: Constant.validationRequiredText,
                }, {
                    rule: Constant.validationPersonId,
                    message: Constant.validationPersonIdText,                    
                }
            ]   
        }
    ], [
        {
            id: 'file-field',
            name: 'file',
            legend: 'Filopplasting',
            label: 'Last opp dokument',
            type: Constant.typeFilefield,
            accept: 'application/pdf,text/xml',
            validation: [
                {
                    rule: Constant.validationRequired,
                    message: Constant.validationRequiredText,
                }
            ]   
        }
    ], [
        {
            id: 'bank-id',
            name: 'bank',
            label: 'Velg bank',
            type: Constant.typeSelect,
            namespace: 'bank-id',
            option: [],
            defaultValue: '0770',
        }, {
            id: 'type-id',
            name: 'type',
            label: 'Dokument type',
            type: Constant.typeSelect,
            namespace: 'document-type',
            option: [
                {id: 'LEGITIMASJON', name: 'Legitimasjon'},
                {id: 'KUNDEERKLAERING', name: 'Kundeerklæring'},
                {id: 'FULLMAKT_DISP_SKIFTEATTEST', name: 'Fullmakt - Disp. skifteattest'},
                {id: 'TEGNINGS_ELLER_GAVEBLANKETT', name: 'Tegnings- eller gaveblankett'},
                {id: 'INNLOESINGSBLANKETT', name: 'Innløsingsblankett'},
                {id: 'INVESTERINGS_OG_SPAREPLAN', name: 'Investerings- og spareplan'},
                {id: 'ASK_AVTALE', name: 'Aksjesparekonto-avtale'},
                {id: 'VPK_FOR_UMYNDIGE', name: 'VPK for umyndige'},
                {id: 'IPS_AVTALE', name: 'IPS-avtale'},
                {id: 'EPK_AVTALE', name: 'EPK-avtale'},
                {id: 'FIRMAATTEST', name: 'Firmaattest'},
                {id: 'SIGNATURBERETTIGEDE', name: 'Signaturberettegnede'},
                {id: 'FLYTTING_AV_VERDIPAPIRER_FRA_EKSTERN_AKTOER', name: 'Flytting av verdipapirer fra ekstern aktør'},
                {id: 'UTTAK_ASK', name: 'Uttak - aksjesparekonto'},
                {id: 'VEDTEKTER_STYREPROTOKOLL_REGNSKAP', name: 'Vedtækter styreprotokoll regnskap'},
                {id: 'BYTTE_AV_KONTOFOERER', name: 'Bytte av kontofører'},
                {id: 'ASK_FOR_MINDREAARIGE', name: 'Aksjesparekonto for mindreårige'},
                {id: 'ANNEN', name: 'Annen'},
            ],
            defaultValue: 'LEGITIMASJON',
        }
    ], [
        {
            id: 'note-field',
            name: 'note',
            label: 'Dokument beskrivelse',
            type: Constant.typeTextarea,
        }
    ]
];

export default InputContentArchiveUpload;