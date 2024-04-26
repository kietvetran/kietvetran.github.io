import {Foedselsnummer} from "../generated-types";

export interface EpkReduxState {
    data?: {
        epkAndPkbPensionInfo: EpkAndPkbPensionInformation;
        notifications: Notification[];
        notificationById: Notification;
    };
    initialLoad: boolean;
    loading: boolean;
    error?: Error;
}

export interface EpkAndPkbPensionInformation {
    epks: Epk[];
    pkbs: Pkb[];
    personSelectedProvider: PersonSelectedProviderData;
}

export interface Epk {
    epkId: number;
    pensionProvider?: Tilbyder;
    organizationNumber: { value: string };
    externalAgreementId?: string;
    status: EpkStatus;
    activeBalance: number;
    passiveBalance: number;
    activeBalanceDate: Date;
    passiveBalanceDate: Date;
    pensionClaimingAge: number;
    locked?: boolean;
    type: EpkType;
    registeredDate: string;
    blEpkId?: number;
    paymentInfo?: any;
}

export interface Pkb {
    pkbId: number;
    pensionProvider?: Tilbyder;
    externalAgreementId?: string;
    type: string;
    guaranteed: string;
    reserved: boolean;
    balance: number;
    balanceDate: Date;
    embedDate?: Date;
    pensionClaimingAge: number;
    registeredDate: string;
}

export interface PersonSelectedProviderData {
    fnr: Foedselsnummer;
    personSelectedProvider: Tilbyder;
    modifiedDate: Date;
    modifiedByProvider: Tilbyder;
}

export interface Tilbyder {
    id: number;
    name: string;
    orgNr: { value: string };
    tlf: string;
    epost: string;
}

enum EpkStatus {
    ACTIVE = 'ACTIVE',
    BL_DEACTIVATED = 'BL_DEACTIVATED',
    DEACTIVATED = 'DEACTIVATED',
    KOLLEKTIV_FLYTTET = 'KOLLEKTIV_FLYTTET',
    MOVED_BACK_TO_BL = 'MOVED_BACK_TO_BL',
    MOVED_TO_ANOTHER_SL = 'MOVED_TO_ANOTHER_SL',
    SL_ACTIVE = 'SL_ACTIVE',
    SL_CANCELLED = 'SL_CANCELLED'
}

enum EpkType {
    BL = 'BL',
    SL = 'SL'
}

export interface NotificationsRequest {
    epkId?: number;
    fnr?: Foedselsnummer;
    fromDateTime?: string;
    origin?: string;
    pkbId?: number;
    statuses?: NotificationStatusType[];
    toDateTime?: string;
    types?: NotificationType[];
}

export interface FinalizeRequest {
    notificationId: number;
    manualProcessingSuccess?: boolean;
}

export enum NotificationType {
    EPK_MOVE = 'EPK_MOVE',
    EPK_PAYMENT_DEMAND = 'EPK_PAYMENT_DEMAND',
    PKB_MOVE = 'PKB_MOVE',
    PKB_EMBED = 'PKB_EMBED',
    PKB_PAYMENT_DEMAND = 'PKB_PAYMENT_DEMAND'
}

export enum NotificationStatusType {
    INITIALIZED = 'INITIALIZED',
    ACCEPTED = 'ACCEPTED',
    FINALIZED = 'FINALIZED',
    NOT_ACCEPTED = 'NOT_ACCEPTED',
    DONE = 'DONE',
    FAILED = 'FAILED'
}

export interface Notification {
    notificationId: number;
    type: NotificationType;
    status: NotificationStatusType;
    registeredDatetime: string;
    modifiedDatetime: string;
    notificationFromTilbyder: Tilbyder;
    notificationToTilbyder?: Tilbyder;
    fraPkbId?: number;
    fraEpkId?: number;
    tilEpkId?: number;
    tilPkbId?: number;
    bankkonto: { value: string };
    kid?: { value: string };
    kidAktiv?: { value: string };
    kidPassiv?: { value: string };
    activeBalancePaymentState?: string;
    passiveBalancePaymentState?: string;
    balancePaymentState?: string;
    belop?: number;
    fromActiveCapital?: boolean;
    requiresManualProcessing?: boolean;
    manualProcessingSuccess?: boolean;
}
