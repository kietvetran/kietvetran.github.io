import { SparingTilBarn, NotificationsRequest, Notification, DokumentMetadataDTO } from '../generated-types.d';
import { Fund } from './fundTypes';

export interface StringObject {
    [k: string]: string;
};

export interface MultipleObject {
    [k: string]: any;
};

export interface Sorting {
    status: number;
    key: string;
    isDate?: boolean;
};

export interface PagingConfig {
    length: number;
    count: number;
    index: number;
};

export interface Order {
    [k: string]: any;
    sorting?: Sorting;
};

export interface Tool {
    id: string;
    name: string;
    action: string;
    url?: string;
    style?: string;
    checked?: boolean;
};

export interface ExcelTableItem {
    text: string;
    style: StringObject;
}

export interface ExcelTable {
    head: ExcelTableItem[];
    body: ExcelTableItem[][];
};

export interface FundwithTool extends Fund {
    tool: Tool[];
    isASKcompatible?: string;
    mode?: string;
}

export interface DokumentMetadataDTOwithTool extends DokumentMetadataDTO {
    tool: Tool[];
    documentFile?: string;
    mode?: string;
}

export interface SparingTilBarnWithTool extends SparingTilBarn {
    tool: Tool[];
    mode?: string;
}

export interface NotificationWithTool extends Notification {
    tool: Tool[];
    mode?: string;
}

export interface IssueActionConfig { 
    id: string | number;
    note?: string;
    action?: string; 
    file?: any; 
};

export interface Paging {
    pageNumber: number;
    pageSize: number;
}

export interface NotificationResult extends Paging {
    notifications: Notification[];
    totalPages: number;
    isLastPage: boolean;
}

export interface NotificationsRequestExtension extends NotificationsRequest, Paging {
}


export interface Foedselsnummer extends HarValue<string> {
    value: string;
}

export interface HarValue<T> {
    value: T;
}
