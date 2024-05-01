export type BigTwoGameType = {
  id: string;
  player?: string[];
  data?: string[][];
  mode?: string;
};

export type BigTwoPlayerDetail = {
  name: string;
  amount: number;
};

export type BigTwoOverview = {
  list: BigTwoGameType[];
  playerDetail: BigTwoPlayerDetail[];
};
