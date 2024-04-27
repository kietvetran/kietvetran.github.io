export const createCookie = (name = '', value = '', day = 1): void => {
    if (!name) return;
    const cookie = [`${name}=${value || ''}`];
    const d = new Date();
    const expires = day || 1000;
    d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
    // cookie.push( `expires=${d.toGMTString()}` );
    cookie.push(`expires=${d.toString()}`);
    cookie.push('path=/');
    document.cookie = cookie.join('; ');
};

export const readCookie = (name = ''): string => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
};

export const eraseCookie = (name = ''): void => {
    createCookie(name, '', -1);
};
