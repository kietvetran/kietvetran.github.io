import { useQuery } from '@tanstack/react-query';

import { fetchBigTwoGame } from '../api/BigTwo';
// import { BigTwoGame } from '../domain/BigTwo';

const useFetchBigTwoGame = (staleTime?: number) => {
    return useQuery({
        queryKey: ['bigtwogame'],
        queryFn: fetchBigTwoGame,
        staleTime,
        /*
    select: (data: BigTwoGame[][]): AutoComplete => {erList( data );
        return { stopPlaceList };
    }
    */
    });
};

export default useFetchBigTwoGame;
