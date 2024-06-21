export const setLocalStorage = (key: string, value: any): void => {
  try {
    window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) { }
};

export const getLocalStorage = (key: string): any => {
  try {
    const value = window.localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) { }
};
