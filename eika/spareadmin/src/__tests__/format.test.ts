import { formatAmount, formatBankAccount, formatPersonalId } from '../common/util/Formats';

describe('Format', () => {
    it('Amount', () => {
        expect(formatAmount(999)).toEqual('999');
        expect(formatAmount(1000)).toEqual('1 000');
        expect(formatAmount(10.5, true)).toEqual('11');
        expect(formatAmount(11.435, 2)).toEqual('11,44');
    });

    it('Bank account', () => {
        expect(formatBankAccount('11112233333')).toEqual('1111 22 33333');
    });

    it('Person Id', () => {
        expect(formatPersonalId('11223344455')).toEqual('112233 44455');
    });
});
