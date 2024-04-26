import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { AppMenu } from '../../domain/app';

import './TabMenu.scss';

export interface Props {
    list: AppMenu[];
    selected: string;
    type?: string;
    click?: ( e: MouseEvent, id: string) => void;
};

export default ({ list, selected, type, click}: Props): JSX.Element => {
    return (
        <div className={classNames('tab-menu-wrapper', `-${type || 'normal'}`)}>
            {list.map( (menu: AppMenu) => {
                return <a 
                    key={menu.id} 
                    href={menu.url ?? '#'} 
                    className={`menu-item -${menu.id} -${menu.id === selected ? 'active' : 'passive'}`}
                    role={menu.url ? '' : 'button'}
                    onClick={ click ? (e: MouseEvent) => { click(e, menu.id); } : undefined}
                >
                    { menu.tag === 'h2' && <h2 className="menu-item-name">{menu.name}</h2> }
                    { !menu.tag && <div className="menu-item-name">{menu.name}</div> }
                    { menu.description && <div className="menu-item-description">{menu.description}</div>}
                </a>
            })}
        </div>
    );
};
