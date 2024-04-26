import { BaseConfig, useConfig as hook } from '@eika-infrastruktur/config-provider';

const texts = {
    header: 'Hei på deg',
    importantStateInfo: 'A bit of info from the app config',
    ekstraText: 'extra',
};

interface Link {
    target?: string;
    text?: string;
    url: string;
}

interface Config extends BaseConfig {
    links: {
        redirectURL: Link;
    };
    texts: typeof texts;
}

export const config: Config = {
    links: {
        redirectURL: {
            url: 'https://www.eika.no',
        },
    },
    texts,
};

export const useConfig = (): Config => hook<typeof config>();
