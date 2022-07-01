/*
import React from 'react';
import './Grid.scss';

interface GridCnt {
    layout: string;
    element: JSX.Element | null;
    end?: string;
    start?: string;
    namespace?: string;
};

interface Props {
    list: GridCnt[];
    namespace?: string;
    fluid?: boolean;
};

export default ({list, namespace, fluid}: Props): JSX.Element => {
    const cnt = list.map( (grid: GridCnt) => {
        return grid.layout;
    }).join('-');
    const isFluid = fluid === undefined ? (list.length !== 1) : fluid;
    return <div className={`grid-layout-wrapper ${namespace || ''} sgw-layout ${cnt}-container -count-${list.length} -${isFluid ? 'fluid' : 'static'}`}>
        { list.map( (grid: GridCnt, i: number) => {
            return <div key={`${grid.layout}-${i}`} className={`sgw-layout-item ${grid.namespace || 'basic'} ${grid.layout} -${grid.end ? `end-${grid.end}` : 'end-none'} -${grid.start ? `start-${grid.start}` : 'start-none'}`}>
                <div className="sgw-layout-item">
                    <div className="sgw-content">{grid.element}</div>
                </div>
            </div>
        })}
    </div>
};
*/

import React from 'react';
import './SkyPig.scss';
export class SkyPig extends React.Component {
    render () {
        return <div className={`sky-pig-wrapper -${this.props.on ? 'on' : 'off'}`}>
            <div className="sky">
                <div className="cloud-first-wrapper"> 
                    <div className="cloud1"/>
                    <div className="cloud2"/>
                    <div className="cloud3"/>
                </div>
                <div className="cloud-second-wrapper">
                    <div className="cloud1"/>
                    <div className="cloud2"/>
                    <div className="cloud3"/>
                </div>
            </div>
            <div className="earth"/>
            <div className="pig"/>
        </div>
    }
}