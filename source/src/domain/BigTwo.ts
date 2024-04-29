export type BigTwoGameType = {
    player?: string[];
    data?: string[][];
    done?: boolean;
    date?: Date;
};

export type BigTwoOverview = {
    list: BigTwoGameType[];
};
