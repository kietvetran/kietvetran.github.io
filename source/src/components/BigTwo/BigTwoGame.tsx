import React, {useState} from 'react';
import BigTwoRowInputParticipant from './BigTwoRowInputParticipant';
import { BigTwoGame } from '../../domain/BigTwo';

type Props = {
  game?: BigTwoGame;
};

type State = {
  game: BigTwoGame;
};

export default function BigTwoGame( props: Props ) {
  const [state, setState] = useState<State>({
    game: props.game ?? {},
  });

  return (
    <div className="big-tow-game-wrapper">
      <BigTwoRowInputParticipant callback={() => {}} user={state.game.user} />
    </div>
  );
}
