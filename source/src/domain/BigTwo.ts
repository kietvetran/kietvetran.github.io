export type BigTwoGame = {
  player?: string[];
  data?: number[][];
  done?: boolean;
  date?: Date;
};

export type BigTwoOverview = {
  list: BigTwoGame[];
};
