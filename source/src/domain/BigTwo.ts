export type BigTwoGame = {
  user?: string[];
  data?: number[][];
  done?: boolean;
  date?: Date;
};

export type BigTwoOverview = {
  list: BigTwoGame[];
};
