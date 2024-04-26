export interface AppMenu {
    id: string;
    name: string;
    description?: string;
    tag?: string;
    url?: string;
    urlReg?: any;
};

export interface AppAction {
    dispatch: any;
};

export interface AppHeaderState {
    menuSelected: string;
    menuList: AppMenu[];    
};

export interface AppConfig {
    urlRoot: string;
    action: AppAction;
};

export interface Advisor {
    navn: string;
    bankregnr: {value: string};
};
