import classNames from 'classnames';
import React, { useState } from 'react';
import { DefaultProperties, DefaultStroke, DefaultAnimate } from './constants';
import { generateId } from '../../util';

import { StringObject } from '../../domain/Types';
import './Graph.scss';

type SvgElementAttributes = {
    id: string;
    strokeWidth?: string;
    stroke?: string;
    fill?: string;
}

type Animate = {
    attributeType: string;
    attributeName: string;
    dur: string;
    fill: string;
    restart?: string;
    begin?: string;
    repeatCount?: string;
    values?: string;
    from?: string;
    to?: string;
}

type Path = SvgElementAttributes & {
    d: string;
    animate?: Animate,
}

type Props = {
    type: string;
    viewport?: Array<number>;
}

type State = {
    paths: Array<Path>;
    viewBox: string;
};


export default (props: Props): JSX.Element => {
    const [state, setState] = useState<State>({
        viewBox: `0 0 ${(props.viewport ?? DefaultProperties.viewport).join( ' ')}`,
        paths: [{...DefaultStroke, id: generateId('path'), d: 'M 100,100 500,500 900,100'}],
    });

    return (
        <div className={classNames('graph-wrapper', `-${props.type ?? 'normal'}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={state.viewBox} version="1.1">
                { state.paths.map( ({animate, ...rest}, i) => {
                    return <g key={`svg-path-group-${i}`}>
                        <path {...rest}>
                            {animate && <animate {...animate} />}
                        </path>
                    </g>
                })}
            </svg>

            <div className="paragraph -only-top">
                <button onClick={() => {
                    const next = 'M 100,500 500,100 900,500';
                    setState({
                        ...state,
                        paths: [{
                            ...state.paths[0],
                            animate: {
                                ...DefaultAnimate,
                                attributeName: 'd',
                                values:` ${state.paths[0].d}; ${next}; `,
                            }
                        }],
                        // */
                    });
                }}>Click</button>
            </div>
        </div>
    );
};
