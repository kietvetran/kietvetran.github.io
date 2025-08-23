import { capitalize } from '../stringUtils';

describe('Capitalize', () => {
  it('Capitalize - test', () => {
    expect(capitalize('test')).toEqual('Test');
    expect(capitalize('teSt')).toEqual('Test');
    expect(capitalize('teSt test')).toEqual('Test test');
  });
});
