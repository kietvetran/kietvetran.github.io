// import { QueryFunctionContext } from '@tanstack/react-query';
import { BigTwoGameType } from '../domain/BigTwo';

/******************************************************************************
 ******************************************************************************/
export const fetchBigTwoGame = async (): Promise<BigTwoGameType[]> => {
    const url = `https://api.jsonstorage.net/v1/json/0a6ab31e-27e8-4c6f-82eb-852905e09690/400a8c66-3db6-49c7-86f8-cf6056c90a44`;
    const response = await fetch(url);
    const data: BigTwoGameType[] = await response.json();
    return data;
};
