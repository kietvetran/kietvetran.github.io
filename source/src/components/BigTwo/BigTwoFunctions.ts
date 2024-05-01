import { BigTwoGameType, BigTwoOverview } from '../../domain/BigTwo';
// import { MultipleObject } from '../../domain/Types';

export const getAmount = (count = 0): number => {
  if (count === 13) {
    return count * 4;
  }
  if (count >= 10) {
    return count * 3;
  }
  if (count >= 8) {
    return count * 2;
  }
  return count ? count : 0;
};

export const getGameResult = (game: BigTwoGameType): number[] => {
  const result: number[] = [];
  (game.data ?? []).forEach((info: string[]) => {
    info.forEach((text: string, i: number) => {
      const count = parseInt(text || '0', 10);
      result[i] = (result[i] ?? 0) + getAmount(count);
    });
  });
  return result;
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

    const result = getGameResult(game);
    result.forEach((amount: number, i: number) => {
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
