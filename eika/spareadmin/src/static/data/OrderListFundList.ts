import Constant from './Constant';

const OrderListFundList = [
    { 
        id: 'fund-name',
        key: 'name',
        secondKey: 'isin',
        thirdKey: 'isASKcompatible',
        fourthKey: 'validTradingTypes',
        name: 'Fond',
        config: [
            { label: ''}, 
            { label: 'Isin: '}, 
            { label: 'ASK-konto kompatibel: '}, 
            { label: 'Tradex: '}, 
        ],
    }, { 
        id: 'fund-minium-amount',
        key: 'minimumOrderAmount',
        secondKey: 'minimumOrderAmountPeriodicPurchase',
        thirdKey: 'minimumOrderAmountPeriodicPurchase',
        fourthKey: 'currency',
        name: 'Beløp',        
        config: [
            { formatAmount: true, unit: ' kr', label: 'Minimum order: ', type: 'amount' }, 
            { formatAmount: true, unit: ' kr', label: 'Engang første gang: ', type: 'amount' },
            { formatAmount: true, unit: ' kr', label: 'Månedlig: ', type: 'amount' },
            { label: 'Valuta uttak: ',},
        ],
    }, { 
        id: 'fund-development',
        key: 'fundDevelopment.percentThisYear',
        secondKey: 'fundDevelopment.percentLast3Years',
        thirdKey: 'fundDevelopment.percentLast5Years',
        fourthKey: 'fundDevelopment.percentLast10Years',
        name: 'fundDevelopment',
        config: [
            { formatAmount: true, unit: ' %', label: 'Årlig: ', type: 'development' }, 
            { formatAmount: true, unit: ' %', label: 'Siste 3 år: ', type: 'development' },
            { formatAmount: true, unit: ' %', label: 'Siste 5 år: ', type: 'development' },
            { formatAmount: true, unit: ' %', label: 'Siste 10 år: ', type: 'development' },
        ],
    }, { 
        id: 'fund-cost',
        key: 'yearlyCost',
        secondKey: 'platformFee',
        thirdKey: 'kickback',
        fourthKey: 'kickbackAdjustedOngoingCharge',
        name: 'Kostnad',
        config: [
            { formatAmount: true, unit: ' %', label: 'Årlig: ', type: 'cost', defaultText: '0' }, 
            { formatAmount: true, unit: ' %', label: 'Platform fee: ', type: 'cost', defaultText: '0' },
            { formatAmount: true, unit: ' %', label: 'Kickback: ', type: 'cost', defaultText: '0' },
            { formatAmount: true, unit: ' %', label: 'Kickback justed on going charge: ', type: 'kickback-adjusted-on-going-charge', defaultText: '0', title: 'Kickback justed on going charge' },
        ],
    }, { 
        id: 'fund-sustainability-score',
        key: 'risk',
        secondKey: 'eikaSustainabilityRating',
        thirdKey: 'managementFee',
        fourthKey: 'ongoingCharge',
        name: 'Andre data',        
        config: [
            { label: 'Risiko: ', type: 'score',  unit: ' av 7', },
            { label: 'Etisk: ', type: 'score',  unit: ' av 5', }, 
            { formatAmount: true, unit: ' %', label: 'Management Fee: ', type: 'cost' }, 
            { formatAmount: true, unit: ' %', label: 'On going charge: ', type: 'cost' },
        ],
    /*
    }, { 
        id: 'fund-other-cost',
        key: 'managementFee',
        secondKey: 'ongoingCharge',
        name: 'Andre kostnad data',
        config: [
            { formatAmount: true, unit: ' %', label: 'Management Fee: ', type: 'cost' }, 
            { formatAmount: true, unit: ' %', label: 'On going charge: ', type: 'cost' },
        ],
    }, { 
        id: 'fund-sustainability-score',
        key: 'eikespirer',
        secondKey: 'risiko',
        name: 'Score',        
        config: [
            { label: 'Etisk: ', type: 'score',  unit: ' av 5', }, 
            { label: 'Risiko: ', type: 'score',  unit: ' av 6', },
        ],
    */
    /*
    }, { 
        id: 'fund-description',
        key: 'descriptionList',
        name: 'Beskrivelse',        
    /*
    }, { 
        id: 'fund-allowed-trade-types',
        key: 'allowedTradeTypes',
        name: 'Tradex tillatelse',        
    */
    }, { 
        id: 'tool', 
        key: '-',
        name: 'Verktøy', 
        config: { dictionary: Constant.dictionary, tool: true },
    },        
];

export default OrderListFundList;