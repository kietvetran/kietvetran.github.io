import React, { useState } from 'react';

import BigTwoInputData from './BigTwoInputData';
import { BigTwoGameType } from '../../domain/BigTwo';

type Props = {
    game?: BigTwoGameType;
};

type State = {
    game: BigTwoGameType;
};

export default function BigTwoGame(props: Props) {
    const [state] = useState<State>({
        game: props.game ?? { player: ['kiet'], data: [['2'], ['', '3']] },
    });

    const setPlayer = (player: string[]): void => {
        console.log('== PLAYER ==');
        console.log(player);
    };

    return (
        <div className="big-tow-game-wrapper">
            <BigTwoInputData callback={setPlayer} data={state.game.player} row={0} />
            {(state.game.data ?? []).map((data: string[], i: number) => {
                return <BigTwoInputData key={`data-${i}`} callback={() => {}} row={i + 1} data={data} />;
            })}
        </div>
    );
}
