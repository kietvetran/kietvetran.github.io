const mod11OfNumberWithControlDigit = (text: string): number => {
  let controlNumber = 2;
  let sumForMod = 0;
  let i;
  for (i = text.length - 2; i >= 0; --i) {
    // @ts-ignore
    sumForMod += text.charAt(i) * controlNumber;
    if (++controlNumber > 7) {
      controlNumber = 2;
    }
  }
  const result = 11 - (sumForMod % 11);
  return result === 11 ? 0 : result;
};

/** ****************************************************************************
  Number validation
***************************************************************************** */
export const validateNumber = (value?: string | number): boolean => {
  if (!/string|number/.test(typeof value)) {
    return false;
  }
  const text = `${value}`.replace(/\s+/g, '');
  return /^(-)?[0-9,.]+$/.test(text);
};

/** ****************************************************************************
  Email validation
***************************************************************************** */
export const validateEmail = (value?: string): boolean => {
  const text = `${value ?? ''}`.replace(/\s+/g, '');
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text);
};

/** ****************************************************************************
  Mobile validation
***************************************************************************** */
export const validateMobile = (value?: string | number): boolean => {
  const text = `${value ?? ''}`.replace(/\s+/g, '');
  return !/^0/.test(text) && validateNumber(text) && text.length === 8;
};

/** ****************************************************************************
 ***************************************************************************** */
export const validateLessThanOrLike = (value?: string | number, max?: string | number): boolean => {
  if (!validateNumber(value) || !validateNumber(max)) {
    return false;
  }

  value = parseFloat(`${value ?? ''}`.replace(/\s+/g, ''));
  max = parseFloat(`${max ?? ''}`.replace(/\s+/g, ''));
  return value <= max;
};

/** ****************************************************************************
 ***************************************************************************** */
export const validateGreatThanOrLike = (value?: string | number, min?: string | number): boolean => {
  if (!validateNumber(value) || !validateNumber(min)) {
    return false;
  }

  value = parseFloat(`${value ?? ''}`.replace(/\s+/g, ''));
  min = parseFloat(`${min ?? ''}`.replace(/\s+/g, ''));
  return value >= min;
};

/** ****************************************************************************
  peronalId validation
***************************************************************************** */
export const validatePersonalId = (value?: string): boolean => {
  const text = `${value ?? ''}`.replace(/[\s-]+/g, '');
  if (!validateNumber(text) || text.length !== 11) {
    return false;
  }

  const getSum = (birthNumber: string, factors: number[]) => {
    let sum = 0;
    for (let i = 0, l = factors.length; i < l; ++i) {
      sum += parseInt(birthNumber.charAt(i), 10) * factors[i];
    }
    return sum;
  };

  let a = 11 - (getSum(text, [3, 7, 6, 1, 8, 9, 4, 5, 2]) % 11);
  if (a === 11) {
    a = 0;
  }

  let b = 11 - (getSum(text, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]) % 11);
  if (b === 11) {
    b = 0;
  }

  return a === parseInt(text.charAt(9), 10) && b === parseInt(text.charAt(10), 10);
};

/** ****************************************************************************
  organization validation
***************************************************************************** */
export const validateOrganization = (value?: string): boolean => {
  const text = `${value ?? ''}`.replace(/\s+/g, '');
  if (!validateNumber(text)) {
    return false;
  }

  return text.length === 9 && parseInt(text.charAt(text.length - 1), 10) === mod11OfNumberWithControlDigit(text);
};

/** ****************************************************************************
  password validation
***************************************************************************** */
export const validatePassword = (value?: string): boolean => {
  const text = `${value ?? ''}`;
  return text.length > 1 && !/\s/.test(text);
};

/** ****************************************************************************
 ***************************************************************************** */
export const validateBankRegNumber = (value?: string): boolean => {
  const text = `${value ?? ''}`;
  return /^\d{4}$/.test(text);
};
