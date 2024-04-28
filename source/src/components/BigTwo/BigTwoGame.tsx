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

  return (
    <div className="big-tow-game-wrapper">
      <BigTwoInputPlayer callback={() => {}} player={state.game.player} />
    </div>
  );
}
