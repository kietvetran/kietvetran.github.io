import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchBigTwoGame, postBigTwoGame } from '../api/BigTwo';
import { getBigTwoOverview } from '../components/BigTwo/BigTwoFunctions';
import { BigTwoGameType, BigTwoOverview } from '../domain/BigTwo';

export const useFetchBigTwoGame = (staleTime?: number) => {
  return useQuery({
    queryKey: ['bigtwogame'],
    queryFn: fetchBigTwoGame,
    staleTime,
    select: (data: BigTwoGameType[]): BigTwoOverview => {
      return getBigTwoOverview(data);
    },
  });
};

export const usePostBigTwoGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BigTwoGameType[]) => await postBigTwoGame(data),
    // onSuccess: (status: boolean, data: BigTwoGameType[]) => {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bigtwogame'] });
    },
    // onError: (error: string, data: BigTwoGameType[]) => {
    onError: (_error, data: BigTwoGameType[]) => {
      data.pop();
    },
  });
};
