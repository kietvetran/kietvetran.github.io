import capitalize from '../util/capitalize';

describe('Capitalize', () => {
    it('Capitalize - test', () => {
        expect(capitalize('test')).toEqual('Test');
        expect(capitalize('teSt')).toEqual('Test');
        expect(capitalize('teSt test')).toEqual('Test test');
    });
});
