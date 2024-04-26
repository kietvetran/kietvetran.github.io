/* eslint-disable */

export interface Bank {
    bankregnr: Bankregnr;
    navn: string;
}

export interface Bankkonto {
    kontonummer: string;
}

export interface Bankregnr extends HarValue<string> {
    value: string;
}

export interface Belop {
    verdi: number;
}

export interface DokumentDTO {
    base64EncodedPayload: string;
    dokumentId: string;
    dokumentnavn: string;
    emner?: { [index: string]: string };
    etternavn?: string;
    fagsystem: string;
    fagsystemId: string;
    filtype: string;
    fornavn?: string;
    fritekst?: string;
    interntDokument: boolean;
    kommunikasjonsretning: Kommunikasjonsretning;
    mimetype?: string;
    offentligId: OffentligId;
    opprettet?: Date;
    organisasjonsnavn?: string;
    partnerId: PartnerId;
    personsensitivitetsstype: Personsensitivitetsstype;
}

export interface DokumentMetadataDTO {
    arkivert: Date;
    dokumentId: string;
    dokumentnavn: string;
    emner?: { [index: string]: string };
    etternavn?: string;
    fagsystem: string;
    fagsystemId: string;
    filtype: string;
    fornavn?: string;
    fritekst?: string;
    interntDokument: boolean;
    kommunikasjonsretning?: Kommunikasjonsretning;
    kundeId: string;
    kundeforholdOpprettelse?: Date;
    mimetype: string;
    offentligId: OffentligId;
    opprettet?: Date;
    organisasjonsnavn?: string;
    partnerId?: PartnerId;
    partnerNavn: string;
    personsensitivitetsstype: Personsensitivitetsstype;
    slettFysisk?: Date;
    slettLogisk?: boolean;
    versjon: number;
    versjonOpprettet: Date;
}

export interface Engangsinnskudd {
    belastningskonto: Bankkonto;
    belop: Belop;
}

export interface Epost extends HarValue<string> {
    value: string;
}

export interface FinalizeNotificationRequest {
    manualProcessingSuccess?: boolean;
    notificationId: number;
}

export interface Foedselsnummer extends HarValue<string> {
    value: string;
}

export interface FondIsin {
    isinNummer: string;
}

export interface FundDevelopment {
    percentLast10Years?: number;
    percentLast3Years?: number;
    percentLast5Years?: number;
    percentThisYear?: number;
}

export interface FundInfo {
    buyFeePercentage: number;
    currency: string;
    description?: string;
    eikaSustainabilityRating?: number;
    fundClass?: string;
    fundDevelopment?: FundDevelopment;
    isin: string;
    keyInvestorInformationDocumentUrl: string;
    kickback: number;
    kickbackAdjustedOngoingCharge: number;
    managementFee: number;
    minimumOrderAmount: number;
    minimumOrderAmountFirstTimePurchase: number;
    minimumOrderAmountPeriodicPurchase?: number;
    morningstarId: string;
    mutualFundClassReference?: MutualFundClassReference;
    name: string;
    ongoingCharge: number;
    rating?: number;
    risk: number;
    sellFeePercentage: number;
    shareSavingsAccountCompatible: boolean;
    stocksAllocationPercentage?: number;
    sustainabilityScore?: number;
    tradexId: number;
    validTradingTypes: ValidTradingTypes[];
    yearlyCost: number;
}

export interface GetEpkPkbPensionInfoResponse {
    epks: PensionInfoEpk[];
    personSelectedProvider?: PersonSelectedProviderData;
    pkbs: PensionInfoPkb[];
}

export interface HarValue<T> {
    value: T;
}

export interface Kid extends HarValue<string> {
    value: string;
}

export interface KommentarRequest {
    kommentar: string;
}

export interface Kontonummer extends HarValue<string> {
    value: string;
}

export interface KundeId extends HarValue<string> {
    value: string;
}

export interface KundeloggEntry {
    id: number;
    innloggetKontekst: Bankregnr;
    juridiskEier: Bankregnr;
    kommentar: string;
    kundeId: KundeId;
    opprettet: Date;
    prosess: KundeloggProsess;
    registrertAv: UserId;
    system: KundeloggSystem;
    systemId: number;
}

export interface KundeloggProsess {
}

export interface KundeloggSystem {
}

export interface ManualUploadRequest {
    signeringsOrdreIds: string[];
    sourceApplication: SourceApplication;
}

export interface Message {
    active: boolean;
    apps: string[];
    changedBy: string;
    changedDate: Date;
    contexts: string[];
    createdBy: string;
    createdDate: Date;
    extendedInfo?: { [index: string]: string };
    hideMessageAfterLinkClicked: boolean;
    icon?: string;
    id?: string;
    link?: string;
    linkText?: { [P in Language]?: string };
    offentligId?: OffentligId;
    text?: { [P in Language]?: string };
    title: { [P in Language]?: string };
    type: string;
    validFrom: Date;
    validTo: Date;
}

export interface MutualFundClassReference {
    isin: string;
    name: string;
    shareClassThreshold: number;
}

export interface Notification {
    activeBalancePaymentState?: string;
    balancePaymentState?: string;
    bankkonto?: Kontonummer;
    belop?: number;
    fraEpkId?: number;
    fraPkbId?: number;
    fromActiveCapital?: boolean;
    kid?: Kid;
    kidAktiv?: Kid;
    kidPassiv?: Kid;
    manualProcessingSuccess?: boolean;
    modifiedDatetime: Date;
    notificationFromTilbyder: Tilbyder;
    notificationId: number;
    notificationToTilbyder?: Tilbyder;
    passiveBalancePaymentState?: string;
    registeredDatetime: Date;
    requiresManualProcessing?: boolean;
    status: NotificationStatusType;
    tilEpkId?: number;
    tilPkbId?: number;
    type: NotificationType;
}

export interface NotificationsPaginated {
    lastPage: boolean;
    notifications: Notification[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface NotificationsRequest {
    epkId?: number;
    fnr?: Foedselsnummer;
    fromDatetime?: Date;
    origin?: OriginType;
    pkbkId?: number;
    statuses?: NotificationStatusType[];
    toDatetime?: Date;
    types?: NotificationType[];
}

export interface OffentligId extends HarValue<string> {
    value: string;
}

export interface Organisasjonsnummer extends HarValue<string> {
    value: string;
}

export interface PartnerId {
    value: string;
}

export interface PaymentInfo {
    bankkonto: string;
    kidAktiv: string;
    kidInnskudd: string;
    kidPassiv: string;
}

export interface PensionInfoEpk {
    activeBalance: number;
    activeBalanceDate: Date;
    blEpkId?: number;
    epkId: number;
    externalAgreementId?: string;
    locked?: boolean;
    organizationNumber?: Organisasjonsnummer;
    passiveBalance: number;
    passiveBalanceDate: Date;
    paymentInfo?: PaymentInfo;
    pensionClaimingAge: number;
    pensionProvider?: Tilbyder;
    registeredDate: Date;
    status: EpkStatus;
    type: EpkType;
}

export interface PensionInfoPkb {
    balance: number;
    balanceDate: Date;
    embedDate?: Date;
    externalAgreementId?: string;
    guaranteed: PkbGuaranteed;
    pensionClaimingAge: number;
    pensionProvider?: Tilbyder;
    pkbId: number;
    registeredDate: Date;
    reserved: boolean;
    type: PkbType;
}

export interface PersonSelectedProviderData {
    modifiedByProvider: Tilbyder;
    modifiedDate: Date;
    personSelectedProvider: Tilbyder;
    timeOfConsent?: Date;
}

export interface Raadgiver {
    etternavn: string;
    fornavn: string;
    id: UserId;
}

export interface RegisterDokumentRequest {
    bankregnr?: Bankregnr;
    base64EncodedPayload: string;
    beskrivelse?: string;
    ekfDokumentType?: EKFDokumentType;
    filtype: string;
    mimetype: string;
    offentligId: OffentligId;
}

export interface RegisterDokumentResponse {
    dokumentID: string;
}

export interface SearchFlags {
    bankregnrFilter: string;
    foedselsnummerFilter: string;
    pageNumber: number;
    pageSize: number;
    sortingColumns: { [index: string]: string };
    statuses: SparingTilBarnStatus[];
}

export interface SpareadminRaadgiver {
    bankregnr: Bankregnr;
    navn: string;
}

export interface SparingTilBarn {
    adresselinje1: string;
    adresselinje2: string;
    andreForelder: SparingTilBarnForelder;
    bankregnr: Bankregnr;
    disposisjonsrett: Disposisjonsrett;
    engangsinnskudd: Engangsinnskudd;
    etternavn: string;
    foedselsnummer: Foedselsnummer;
    fondIsin: FondIsin;
    fornavn: string;
    godtattFondOgPortefoljeVilkar: boolean;
    id: number;
    investeringsrisiko: Investeringsrisiko;
    kunEnVerge: boolean;
    landkode: string;
    maalBeloep: Belop;
    navn: string;
    oppretterForelder: SparingTilBarnForelder;
    opprettetdato: Date;
    portefoljeType: PortefoljeType;
    postnummer: string;
    poststed: string;
    raadgiverId: string;
    samtykkestatus: SparingTilBarnSamtykkestatus;
    sisteOppdatertdato: Date;
    sparemaalNavn: string;
    spareperiode: Spareperiode;
    sperreAlder: number;
    status: SparingTilBarnStatus;
    tradexCustomerId: number;
    version: SparingTilBarnVersion;
}

export interface SparingTilBarnFodselsattest {
    filnavn: string;
    id: number;
    mimeType: string;
    opprettetdato: Date;
    sizeOfFileInBytes: number;
    sparingTilBarnId: number;
    status: SparingTilBarnFodselsattestStatus;
}

export interface SparingTilBarnForelder {
    adresse?: SparingTilBarnForelderAdresse;
    epost?: Epost;
    etternavn?: string;
    foedselsnummer: Foedselsnummer;
    fornavn?: string;
    id: number;
    mobilnummer?: Telefonnummer;
    navn: string;
    oppretter: boolean;
    opprettetdato: Date;
    sparingBarnId: number;
    tradexCustomerId?: number;
}

export interface SparingTilBarnForelderAdresse {
    adresselinje1: string;
    adresselinje2: string;
    landkode: string;
    postnummer: string;
    poststed: string;
}

export interface SparingTilBarnKommentar {
    id: number;
    kommentar: string;
    raadgiver: Raadgiver;
    sparingBarnId: number;
    tidspunkt: Date;
}

export interface SparingTilBarnSearchResult {
    currentPage: number;
    numOfPages: number;
    pageSize: number;
    searchHits: SparingTilBarn[];
    totalNumberOfSearchHits: number;
}

export interface SparingTilBarnStatusResultat {
    statusCountMap: { [P in SparingTilBarnStatus]?: number };
}

export interface Telefonnummer extends HarValue<string> {
    value: string;
}

export interface Tilbyder {
    email?: Epost;
    epost?: Epost;
    id: number;
    name: string;
    orgNr: Organisasjonsnummer;
    phone?: Telefonnummer;
    tlf?: Telefonnummer;
}

export interface Unit {
}

export interface UserId extends HarValue<string> {
    value: string;
}

export type Disposisjonsrett = "KUN_EIER" | "BEGGE_VERGER" | "HVER_AV_VERGENE";

export type EKFDokumentType = "LEGITIMASJON" | "KUNDEERKLAERING" | "FULLMAKT_DISP_SKIFTEATTEST" | "TEGNINGS_ELLER_GAVEBLANKETT" | "INNLOESINGSBLANKETT" | "OMALLOKERINGSBLANKETT" | "INVESTERINGS_OG_SPAREPLAN" | "ASK_AVTALE" | "VPK_FOR_UMYNDIGE" | "IPS_AVTALE" | "EPK_AVTALE" | "FIRMAATTEST" | "SIGNATURBERETTIGEDE" | "FLYTTING_AV_VERDIPAPIRER_FRA_EKSTERN_AKTOER" | "UTTAK_ASK" | "VEDTEKTER_STYREPROTOKOLL_REGNSKAP" | "BYTTE_AV_KONTOFOERER" | "ASK_FOR_MINDREAARIGE" | "ANNEN";

export type EpkStatus = "ACTIVE" | "BL_DEACTIVATED" | "DEACTIVATED" | "KOLLEKTIV_FLYTTET" | "KOLLEKTIV_FLYTTET_UNLINKING_SL_EPK" | "MOVED_BACK_TO_BL" | "MOVED_TO_ANOTHER_SL" | "SL_ACTIVE" | "SL_CANCELLED";

export type EpkType = "BL" | "SL";

export type Investeringsrisiko = "LAV" | "MIDDELS" | "HOY";

export type Kommunikasjonsretning = "INNGAENDE" | "UTGAENDE" | "INTERNT" | "SDC_ARCHIVE";

export type Kundevurdering = "IKKE_VURDERT" | "OK" | "MA_BEHANDLES_MANUELT" | "FROZEN";

export type Language = "NO" | "EN";

export type NotificationStatusType = "INITIALIZED" | "ACCEPTED" | "FINALIZED" | "NOT_ACCEPTED" | "DONE" | "FAILED";

export type NotificationType = "EPK_MOVE" | "EPK_PAYMENT_DEMAND" | "PKB_MOVE" | "PKB_EMBED" | "PKB_PAYMENT_DEMAND";

export type OriginType = "SELF" | "OTHER";

export type Personsensitivitetsstype = "APEN" | "PERSONIDENTIFISERENDE" | "HELSEOPPLYSNINGER" | "SKADEOPPLYSNINGER" | "GRADERT";

export type PkbGuaranteed = "NO" | "IKKE_REELL" | "REELL";

export type PkbType = "REGULAR" | "IPS" | "IPA";

export type PortefoljeType = "AKSJESPAREKONTO" | "FONDSKONTO" | "IPS_KONTO" | "EPK_PASSIV" | "EPK_AKTIV";

export type SourceApplication = "SMARTSPAR" | "SPAREADMIN" | "PENSJONSMENTOR" | "MANUAL_UPLOAD";

export type Spareperiode = "UNDER_TO_AAR" | "TO_TIL_FEM_AAR" | "FEM_AAR_ELLER_MER" | "PENSJON_62" | "PENSJON_63" | "PENSJON_64" | "PENSJON_65" | "PENSJON_66" | "PENSJON_67" | "PENSJON_68" | "PENSJON_69" | "PENSJON_70" | "PENSJON_71" | "PENSJON_72" | "PENSJON_73" | "PENSJON_74" | "PENSJON_75" | "BARN_1_AAR" | "BARN_2_AAR" | "BARN_3_AAR" | "BARN_4_AAR" | "BARN_5_AAR" | "BARN_6_AAR" | "BARN_7_AAR" | "BARN_8_AAR" | "BARN_9_AAR" | "BARN_10_AAR" | "BARN_11_AAR" | "BARN_12_AAR" | "BARN_13_AAR" | "BARN_14_AAR" | "BARN_15_AAR" | "BARN_16_AAR" | "BARN_17_AAR" | "BARN_18_AAR" | "BARN_19_AAR" | "BARN_20_AAR" | "BARN_21_AAR";

export type SparingTilBarnFodselsattestStatus = "OPPRETTET" | "GODKJENT" | "AVVIST";

export type SparingTilBarnSamtykkestatus = "INGEN_BEHOV" | "AVSLAATT" | "GITT";

export type SparingTilBarnStatus = "OPPRETTET" | "SENDT_INN_AV_FORSTE_VERGE" | "SIGNERT_AV_ALLE_VERGER" | "AVVIST_AV_ANDRE_VERGE" | "PABEGYNT_AV_RADGIVER" | "GODKJENT_AV_RAADGIVER" | "MASKINELT_GODKJENT" | "AHV_SCORE_FOR_HOY" | "FORSOEKT_OPPRETTING_AV_SPAREMAAL" | "OPPRETTET_SPAREMAAL_FEILET" | "GODKJENT" | "AVBRUTT_AV_KUNDE" | "AVVIST";

export type SparingTilBarnVersion = "V1" | "V2";

export type ValidTradingTypes = "ONETIME_BUY" | "SELL" | "SWITCH_SELL" | "SWITCH_BUY" | "PERIODIC" | "TRANSFER_OUT" | "TRANSFER_IN" | "TRANSFER_OUT_TRANSFER_IN" | "CUSTOMER_DIVIDEND" | "CUSTOM_EPD" | "CUSTOM_EPW";
