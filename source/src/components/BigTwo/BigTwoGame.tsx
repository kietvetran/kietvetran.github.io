import React, {useState} from 'react';
import BigTwoInputPlayer from './BigTwoInputPlayer';
import BigTwoInputData from './BigTwoInputData';
import { BigTwoGame } from '../../domain/BigTwo';

type Props = {
  game?: BigTwoGame;
};

type State = {
  game: BigTwoGame;
};

export default function BigTwoGame( props: Props ) {
  const [state, setState] = useState<State>({
    game: props.game ?? { player: ['kiet'], data: [['2'], ['', '3']]},
  });

  const setPlayer = (player: string[] ): void => {
    console.log('== PLAYER ==');
    console.log(player);
  };

  return (
    <div className="big-tow-game-wrapper">
      <BigTwoInputPlayer callback={setPlayer} player={state.game.player} />
      { (state.game.data ?? []).map( (data: string[], i: number) => {
        return <BigTwoInputData key={`data-${i}`} callback={() => {}} row={i} data={data} />
      }) }
    </div>
  );
}
