import React, { useState, useEffect } from 'react';

import { getGameResult } from './BigTwoFunctions';
import BigTwoInputData from './BigTwoInputData';
import { BigTwoGameType } from '../../domain/BigTwo';
import { usePostBigTwoGame } from '../../hook/useBigTwoGame';
import Spinner from '../Spinner/Spinner';

type Props = {
  list?: BigTwoGameType[];
  game?: BigTwoGameType;
};

type State = {
  game?: BigTwoGameType;
  result?: number[];
};

export default function BigTwoGame(props: Props) {
  const actionBigTwo = usePostBigTwoGame();
  const [state, setState] = useState<State>({});

  const getEmptyGame = (): BigTwoGameType => {
    return { id: new Date().toISOString(), player: [], data: [[]] };
  };

  const onChange = async (input: string[], row: number): Promise<void> => {
    if (!state.game || !props.list) {
      return;
    }
    const data = input.map((v: string) => `${v || ''}`.toLowerCase());

    const id = state.game.id ?? '';
    const game = props.list.find((g: BigTwoGameType) => g.id === id);
    if (!game) {
      return;
    }

    const next = { game: getEmptyGame(), ...state };
    if (row === 0) {
      next.game.player = data;
    } else if (next.game.data) {
      const index = row - 1;
      next.game.data[index] = data;
      next.game.data = next.game.data.filter((d: string[]) => {
        return /[0-9]/.test(JSON.stringify(d));
      });

      const last = next.game.data.length - 1;
      if (last === -1 || /[0-9]/.test(JSON.stringify(next.game.data[last]))) {
        next.game.data.push([]);
      }
    }

    game.player = next.game.player;
    game.data = next.game.data;

    try {
      await actionBigTwo.mutate(props.list);
    } catch (error) {}

    setState({ ...next, result: getGameResult(game) });
  };

  useEffect(() => {
    if (state.game) {
      return;
    }
    const game: BigTwoGameType = { ...getEmptyGame(), ...props.game };
    const data = game.data ?? [];
    const last = data.length - 1;

    if (data.length === 0) {
      data.push([]);
    } else if (/[0-9]/.test(JSON.stringify(data[last]))) {
      data.push([]);
    }

    setState({ ...state, game, result: getGameResult(game) });
  }, [props.game, state, setState]);

  return (
    <div className="big-tow-game-wrapper">
      {state.game ? (
        <>
          <BigTwoInputData callback={onChange} data={state.game?.player} row={0} result={state.result} />
          <div className="data-holder">
            {(state.game?.data ?? []).map((data: string[], i: number) => {
              return <BigTwoInputData key={`data-${i}`} callback={onChange} pin={`${i + 1}`} row={i + 1} data={data} />;
            })}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
