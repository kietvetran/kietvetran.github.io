import classNames from 'classnames';
import React, { useState, MouseEvent } from 'react';

import BigTwoGame from './BigTwoGame';
import { BigTwoGameType } from '../../domain/BigTwo';
import { useFetchBigTwoGame, usePostBigTwoGame } from '../../hook/useBigTwoGame';
import Spinner from '../Spinner/Spinner';

type State = {
  onEdit: boolean;
  loading: boolean;
  game?: BigTwoGameType;
};

export default function BigTwoDesktop() {
  const dataBigTwo = useFetchBigTwoGame();
  const actionBigTwo = usePostBigTwoGame();

  const [state, setState] = useState<State>({
    onEdit: false,
    loading: false,
  });

  const addNewGame = async (): Promise<void> => {
    const data = dataBigTwo.data?.list ?? [];
    data.push({ id: new Date().toISOString() });
    setState({ ...state, loading: true });
    try {
      await actionBigTwo.mutate(data);
    } catch (error) {
      data.pop();
    }
    setState({ ...state, loading: false });
  };

  const deleteGame = async (game?: BigTwoGameType): Promise<void> => {
    if (!game || /deleted|finished/i.test(game.mode ?? '')) {
      return;
    }

    if (/[1-9]/.test(JSON.stringify(game.data))) {
      game.mode = 'deleted';
    } else if (dataBigTwo.data) {
      dataBigTwo.data.list = (dataBigTwo.data.list ?? []).filter((g: BigTwoGameType) => g.id !== game.id);
    }

    const data = dataBigTwo.data?.list ?? [];
    setState({ ...state, loading: true });
    try {
      await actionBigTwo.mutate(data);
    } catch (error) {
      // do nothing
    }
    setState({ ...state, loading: false });
  };

  const onClick = (e: MouseEvent, key = '', game?: BigTwoGameType): void => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (key === 'open-game') {
      setState({ ...state, game });
    } else if (key === 'new-game') {
      addNewGame();
    } else if (key === 'edit-game') {
      setState({ ...state, onEdit: !state.onEdit });
    } else if (key === 'delete-game') {
      deleteGame(game);
    } else if (key === 'back') {
      setState({ ...state, game: undefined });
    }
  };

  return (
    <div
      className={classNames('big-tow-desktop-wrapper', {
        '-on-edit': state.onEdit,
      })}>
      <h1 className="h2">Big2</h1>
      {dataBigTwo.isLoading && <Spinner />}
      {!dataBigTwo.isLoading && !dataBigTwo.isError && dataBigTwo.data && (
        <div className="content relative">
          <div className="sub-title">
            {!!state.game && (
              <a
                href="#"
                title="Edit game"
                className="tool-game-btn -back"
                onClick={(e: MouseEvent) => {
                  onClick(e, 'back');
                }}>
                back
              </a>
            )}
            <span>Game</span>
            {!state.game && (
              <>
                <a
                  href="#"
                  title="Edit game"
                  className="tool-game-btn -edit"
                  onClick={(e: MouseEvent) => {
                    onClick(e, 'edit-game');
                  }}>
                  {state.onEdit ? 'Done' : 'Edit'}
                </a>
                <a
                  href="#"
                  title="New game"
                  className="tool-game-btn -add"
                  onClick={(e: MouseEvent) => {
                    onClick(e, 'new-game');
                  }}>
                  Add
                </a>
              </>
            )}
          </div>
          {state.game ? (
            <BigTwoGame game={state.game} list={dataBigTwo.data?.list ?? []} />
          ) : (
            <div className="game-list">
              {dataBigTwo.data.list.map((game: BigTwoGameType, i: number) => {
                const action = state.onEdit ? 'delete-game' : 'open-game';
                return (
                  <a
                    key={`game-${i}`}
                    href="#"
                    className={`game-card-row -mode-${game.mode ?? 'none'} -${action}`}
                    onClick={(e: MouseEvent) => {
                      onClick(e, action, game);
                    }}>
                    <div className="counter">{i + 1}.</div>
                    <div className="text">{(game.player ?? []).join(', ') || '-'}</div>
                  </a>
                );
              })}
            </div>
          )}
          {state.loading && <Spinner absolute />}
        </div>
      )}
    </div>
  );
}
