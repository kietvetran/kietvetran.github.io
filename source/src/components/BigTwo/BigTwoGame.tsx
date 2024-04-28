import React, {useState} from 'react';
import BigTwoInputPlayer from './BigTwoInputPlayer';
import { BigTwoGame } from '../../domain/BigTwo';

type Props = {
  game?: BigTwoGame;
};

type State = {
  game: BigTwoGame;
};

export default function BigTwoGame( props: Props ) {
  const [state, setState] = useState<State>({
    game: props.game ?? { player: ['kiet']},
  });

  const setPlayer = (player: string[] ): void => {
    console.log('== PLAYER ==');
    console.log(player);
  };

  return (
    <div className="big-tow-game-wrapper">
      <BigTwoInputPlayer callback={setPlayer} player={state.game.player} />
    </div>
  );
}
