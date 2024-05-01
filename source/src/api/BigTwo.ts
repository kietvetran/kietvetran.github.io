import { HEADER } from './index';
import { BigTwoGameType } from '../domain/BigTwo';

const apiKey = '814e1ed3-82ed-4a1a-893a-4268bb05c459';
/******************************************************************************
 ******************************************************************************/
export const fetchBigTwoGame = async (): Promise<BigTwoGameType[]> => {
  const url = `https://api.jsonstorage.net/v1/json/0a6ab31e-27e8-4c6f-82eb-852905e09690/400a8c66-3db6-49c7-86f8-cf6056c90a44`;
  const response = await fetch(url);
  const result: BigTwoGameType[] = await response.json();
  return result;
};

export const postBigTwoGame = async (data: BigTwoGameType[]): Promise<boolean> => {
  const body = JSON.stringify(data);
  const url = `https://api.jsonstorage.net/v1/json/0a6ab31e-27e8-4c6f-82eb-852905e09690/400a8c66-3db6-49c7-86f8-cf6056c90a44?apiKey=${apiKey}`;
  const response = await fetch(url, { ...HEADER, body, method: 'PUT' });
  return response.status === 200;
};
