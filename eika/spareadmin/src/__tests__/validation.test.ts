import { validateEmail, validateMobile, validatePersonalId } from '../common/util/Validations';

describe('Validation', () => {
    it('Eamil validation', () => {
        expect(validateEmail('kiet.ve.tran@eika.no')).toEqual(true);
        expect(validateEmail('kiet.ve.tran@eika')).toEqual(false);
        expect(validateEmail('kiet.ve.tran')).toEqual(false);
    });

    it('Mobile validation', () => {
        expect(validateMobile('41 47 49 47')).toEqual(true);
        expect(validateMobile('41474947')).toEqual(true);
        expect(validateMobile('12345678')).toEqual(true);
        expect(validateMobile('01234567')).toEqual(false);
        expect(validateMobile('a234567c')).toEqual(false);
    });

    it('Person Id validation', () => {
        expect(validatePersonalId('09088849822')).toEqual(true);
        expect(validatePersonalId('090888 49822')).toEqual(true);
        expect(validatePersonalId('39088849822')).toEqual(false);
        expect(validatePersonalId('3908884982x')).toEqual(false);
    });
});