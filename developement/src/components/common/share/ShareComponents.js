import React from 'react';
import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import './ShareComponents.scss';

export const Spinner = ({ type, ...rest }) => {
    const basic = {baseColor: '#f5f4f2', highlightColor: '#fff'};
    const config = {
        card: {height: 97, borderRadius: 8},
        linkPanel: {height: 97, borderRadius: 24},
        header: {height: 40, borderRadius: 2},
        'header-light': {height: 40, borderRadius: 2},
    };

    return <div className={`spinner-wrapper -${type || 'basic'}`} style={config[type]}>
        { type ? <>
                { type === 'card' && <Skeleton {...basic} {...config.card} {...rest} /> }
                { type === 'linkPanel' && <Skeleton {...basic}  {...config.linkPanel} {...rest} /> }
                { type === 'header' && <Skeleton {...config.header} {...rest} /> }
                { type === 'header-light' && <Skeleton {...basic} {...config.header} {...rest} /> }

                { (type === 'portefoljer' || type === 'konti' || type === 'arbeidsgiver' || type === 'app') && <> 
                    <Spinner type="header-light"/>
                    <Spinner type="card"/>
                    <Spinner type="card"/>
                </>}

                { type === 'fond' && <> 
                    <Spinner type="header-light"/>
                    <ul className="spinner-row">
                        <li><Spinner type="header-light"/></li>
                        <li><Spinner type="header-light"/></li>
                    </ul>
                    <Spinner type="card"/>
                    <Spinner type="card"/>
                </>}
                { type === 'kjenn-din-kunde' && <>                     
                    <Spinner type="card"/>
                    <Spinner type="card"/>
                    <Spinner type="card"/>
                    <Spinner type="card"/>
                 </>}
            </> : <div>kiet</div>
        }
    </div>;
};