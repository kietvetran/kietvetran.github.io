import React from 'react';
import { PagingConfig } from '../../domain/types';
import './Paging.scss';

interface Props extends PagingConfig {
    click: (i: number) => void;
};

export default ({ length, count, index, click }: Props): JSX.Element | null => {    
    return count && length && length > count ? <div className="paging-wrapper">
        { Array.from({ length: Math.ceil((length / count)) }).map((x: any, i: number) => {
            const inView = i === 0 || i === index || 
                (i+1) === index || (i-1) === index || 
                (i+2) === index || (i-2) === index || 
                Math.ceil((length / count)) === (i+1);
            const isTrancation = (i+3) === index || (i-3) === index;

            if ( !inView && !isTrancation ) { return null; }

            if ( !inView ) { return <span key={`page-index-${i}`}>...</span>; }

            return <button
                type="button" 
                key={`page-index-${i}`} 
                className={`page-btn -${i === index ? 'active' : 'normal'}`} 
                onClick={() =>{ click(i); }}
            >{(i+1)}</button>;
        })}
    </div> : null;
};
