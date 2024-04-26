export const HEADER = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: { 'Content-Type': 'application/json', },
};

export const CONTEXT_PATH = '/sparing-spareadmin-intraweb';
export const SERVICE_PATH = `${CONTEXT_PATH}/rest/resource`;
export const FETCHSIGNAL: any = {};
export const ERROR: {[k: string | number ]: string} = {
    401: 'Du har ikke tilgang til denne tjenesten. Kontakt ESS for tilgang.',
    500: 'Intern server error',
    504: 'Gateway timeout',
};
