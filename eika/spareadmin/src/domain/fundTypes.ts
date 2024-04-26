export interface FundDevelopment {
    iAar?: number | null;
    sisteAar?: number | null;
    siste3Aar?: number | null;
    siste5Aar?: number | null;
    prosentSiste5Aar?: number | null;
    prosentSiste3Aar?: number | null;
    prosentSiste10Aar?: number | null;
};

export interface Fund {
    navn: string;
    id: string;
    utvikling: FundDevelopment;
    isin: string;
    risiko: number;
    rating: number;
    aksjesparekontoKompatibel: boolean;
    minimumsBelopEngangsKjop?: number | null;
    minimumsBelopPeriodiskKjop?: number | null;
    managementFee?: number | null;
    ongoingCharge?: number | null;
    maxFrontEndLoad?: number | null;
    maximumExitFee?: number | null;
    sustainabilityScore?: number | null;
    eikespirer?: number | null;
    produktarkUrl?: string;
    allowedTradeTypes?: string[];
    currency?: string;
    platformFee?: number | null;
    kickback?: number | null;
    kickbackAdjustedOngoingCharge?: number | null;
    yearlyCost?: number | null;
    externalFund?: boolean;
    descriptionList?: string[];   
}

