import classNames from 'classnames';
import React, { useState, MouseEvent, useRef, useEffect } from 'react';

import BigTwoGame from './BigTwoGame';
import { BigTwoGameType, BigTwoPlayerDetail } from '../../domain/BigTwo';
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
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  const [state, setState] = useState<State>({
    onEdit: false,
    loading: false,
  });

  const submitBigTwoList = (list?: BigTwoGameType[] , delay=(60*1000)): void => {
    if ( !list ) { list = dataBigTwo.data?.list ?? []; }

    const submit = () => {
      try {
        actionBigTwo.mutate(list);
      } catch (error) {}      
    };

    if ( delay ) {
      if ( timer.current ) { clearTimeout(timer.current); }
      timer.current = setTimeout( submit, delay );
    } else {
      submit();
    }
  };

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

  const toogleGameDouble = () => {
    if ( !state.game ) { return; }

    const game = {...state.game, double: !state.game.double};
    const bigTwoGame = (dataBigTwo.data?.list ?? []).find((g: BigTwoGameType) => g.id === game.id);
    if ( bigTwoGame ) {
      bigTwoGame.double = game.double;
      try {
        actionBigTwo.mutate((dataBigTwo.data?.list ?? []));
      } catch (error) {
        // do nothing
      } 
    }
    setState({...state, game});
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
      submitBigTwoList( undefined, 0 );
      setState({ ...state, game: undefined });
    } else if (key === 'toggle-game-double') {
      toogleGameDouble();
    }
  };

  useEffect( () => ( () => {
    submitBigTwoList( undefined, 0 );
  }), []);

  return (
    <div
      className={classNames('big-tow-desktop-wrapper', {
        '-on-edit': state.onEdit,
      })}>
      <h1 className="h2">Big2</h1>
      {dataBigTwo.isLoading && <Spinner />}
      {!dataBigTwo.isLoading && !dataBigTwo.isError && dataBigTwo.data && (
        <div className="content relative">
          <section aria-labelledby="game-label">
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
              <span id="game-label">Game</span>
              {!!state.game && <span className="date">{state.game.id.substring(0, 10)}</span>}
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

              {!!state.game && (
                <a
                  href="#"
                  title="Doueble sum"
                  className={`tool-game-btn -double-sum -${state.game.double ? 'yes' : 'no'} hide`}
                  onClick={(e: MouseEvent) => {
                    onClick(e, 'toggle-game-double');
                  }}>
                  Amount x 2
                </a>
              )}
            </div>
            {state.game ? (
              <BigTwoGame game={state.game} list={dataBigTwo.data?.list ?? []} submit={submitBigTwoList} />
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
                      <div className="date">{game.id.substring(0, 10)}</div>
                      <div className="text">{(game.player ?? []).join(', ') || '-'}</div>
                    </a>
                  );
                })}
              </div>
            )}
          </section>

          {!state.game && (
            <section aria-labelledby="amount-label">
              <div className="sub-title" id="amount-label">
                <span>Amount</span>
              </div>
              <div className="amount-description">
                {dataBigTwo.data.playerDetail.map((detail: BigTwoPlayerDetail, i: number) => {
                  return <div key={`player-amount-${i}`} className="player-detail">{`${detail.name}: ${detail.amount}`}</div>;
                })}
              </div>
            </section>
          )}

          {(state.loading || actionBigTwo.isPending) && <Spinner absolute />}
        </div>
      )}
    </div>
  );
}
