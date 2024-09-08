import { BigTwoGameType, BigTwoOverview } from '../../domain/BigTwo';

export const getTiming = (value?: string | number): number => {
    const count = parseInt(`${value ?? 0}`, 10);
    if (count >= 13) {
        return 4;
    }
    if (count >= 10) {
       return 3;
    }
    if (count >= 8) {
        return 2;
    }
    return 1;
};

export const getCount = (count = 0): number => {
    const timing = getTiming(count);
    return count * timing;
};

export const getGameResult = (game: BigTwoGameType): number[] => {
    const result: number[] = [];
    (game.data ?? []).forEach((info: string[]) => {
        info.forEach((text: string, i: number) => {
            const count = parseInt(text || '0', 10);
            result[i] = (result[i] ?? 0) + getCount(count);
        });
    });
    return result;
};

// export const getGameSumAmount = (result=[287, 432, 396, 268]): number[] => {
export const getGameSumAmount = (game: BigTwoGameType, ignoreGreatThanzero=false): number[] => {
    const result = getGameResult(game);
    const sum: number[] = [];
    result.forEach((c: number, i: number) => {
        result.forEach((n: number, j: number) => {
            if (i === j) {
                return;
            }
            sum[i] = (sum[i] ?? 0) + (n - c);
        });
    });

    const output = sum.map((v: number) => {
        v *= game.double ? 2 : 1;
        if ( ignoreGreatThanzero ) {
            return v > 0 ? 0 : v < -500 ? -500 : v;
        }
        return v < -500 ? -500 : v;        
    });
    return output;
};

export const getBigTwoOverview = (list: BigTwoGameType[]): BigTwoOverview => {
    const pin: { [k: string]: number } = {};
    const output: BigTwoOverview = {
        list: list.filter((game: BigTwoGameType) => game.mode !== 'deleted'),
        playerDetail: [],
    };

    output.list.forEach((game: BigTwoGameType) => {
        (game.player ?? []).forEach((name: string) => {
            if (pin[name] === undefined) {
                pin[name] = output.playerDetail.length;
                output.playerDetail[pin[name]] = { name, amount: 0 };
            }
        });

        const sum = getGameSumAmount(game, true);
        sum.forEach((amount: number, i: number) => {
            const name = (game.player ?? [])[i] ?? '';
            if (pin[name] === undefined) {
                return;
            }
            output.playerDetail[pin[name]].amount += amount;
        });
    });

    return output;
};

export const test = (): string => {
    return 'test';
};
