export type BigTwoGame = {
  player?: string[];
  data?: string[][];
  done?: boolean;
  date?: Date;
};

export type BigTwoOverview = {
  list: BigTwoGame[];
};
