import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import useAppMessage from '../hooks/useAppMessage';
import useBankList from '../hooks/useBankList';
import useAdvisor from '../hooks/useAdvisor';
import { ReducerState } from '../reducers';
import Spinner from '../common/Spinner/Spinner'; 

import Issue from '../containers/Issue/Issue';
import EPK from '../containers/EPK/EPK';
import Archive from '../containers/Archive/Archive';
import Fund from '../containers/Fund/Fund';
import Guideline from '../containers/Guideline/Guideline';

import { AppMenu, AppConfig, AppHeaderState } from '../domain/app';
import { SpareadminRaadgiver } from '../generated-types';

import './App.scss';

const AppHeader = ({urlRoot, advisor}: {urlRoot: string; advisor?: null | SpareadminRaadgiver}): JSX.Element => {
    const location = useLocation();
    const [state, setState] = useState<AppHeaderState>({
        menuSelected: '/',
        menuList: [
            {id: 'home',      name: 'Saker',         url: `${urlRoot}/issue/new`,       urlReg: /issue/i },
            {id: 'epk',       name: 'EPK',           url: `${urlRoot}/epk/person`,      urlReg: /epk/i },
            {id: 'archive',   name: 'Dokumentarkiv', url: `${urlRoot}/archive/search`,  urlReg: /archive/i },
            {id: 'fund',      name: 'Fond',          url: `${urlRoot}/fund/overview`,   urlReg: /fund/i },
        ]
    });

    useEffect(() => {
        setState((s: AppHeaderState) => {
            return {...s, menuSelected: location.pathname};
        });
    }, [location, setState]);

    return <header id="app-header" className="app-header flex-header">
        <div className="layout-outer">
            <nav>
                <div className="left-side">
                    <Link to="/" className="header-title">
                        <h1 className="-no-space">Spare</h1><span>admin</span>
                    </Link>                        
                </div>
                <div className="middle-side">
                    <ul className="flat nav-menu">
                        { state.menuList.map( (m: AppMenu) => {
                            return m.id === 'epk' && (!advisor || advisor.bankregnr?.value !== '0501') ? null : 
                                <li key={m.id} className={`menu-item -${m.id} -${ m.urlReg && m.urlReg.test(state.menuSelected) ? 'active' : 'passive'}`}>
                                    { m.url ? <a href={m.url} className="link"><span>{m.name}</span></a> : <div>{m.name}</div> }
                                </li>;
                        })}
                    </ul>
                </div>
                <div className="right-side">
                    <a href={`${window.location.origin}/sparing-spareadmin-intraweb/logout`} className="">Logg ut</a>
                    { !!advisor && <span className="user-profile">{advisor.navn}</span>}
                </div>
            </nav>
        </div>
    </header> 
};

const App = (): JSX.Element => {    
    const reducer = useSelector((state: ReducerState) => state );
    const dispatch = useDispatch();
    const config: AppConfig = {
        urlRoot: /localhost/i.test( window.location.origin ) ? '/#' : '/sparing-spareadmin-intraweb/#',
        action: {
            dispatch,
        },
    };

    useAdvisor();
    useAppMessage();
    useBankList();
    const loading = reducer.app.advisor === undefined || reducer.app.appMessage === undefined;

    return <div id="app-wrapper" className={classNames('app-wrapper spareadmin-app-wrapper flex', {
        '-not-ekf': !reducer.app.advisor || reducer.app.advisor.bankregnr?.value !== '0501',
    })}>
        { reducer.app.advisor === null ? <main>
                <div className="message-wrapper -info logged-out-message">
                    <h1 className="h2">Du har blitt logget ut.</h1>
                    <a href="#" onClick={() => { window.location.reload(); }} className="link">Logg inn igjen</a>
                </div>
            </main> : <>
                <AppHeader advisor={reducer.app.advisor} urlRoot={config.urlRoot} />
                <main id="app-body" className="app-body flex-body">
                    <div className="layout-outer"> 
                        { loading ? <div className="paragraph -include-top"><Spinner /></div> :
                            <Routes>
                                <Route path="/" element={ <Navigate to="/issue/new" /> }/>
                                <Route path="/issue/lead" element={<Issue {...config} />} />
                                <Route path="/issue/new" element={<Issue {...config} />} />
                                <Route path="/issue/approved" element={<Issue {...config} />} />
                                <Route path="/issue/rejected" element={<Issue {...config} />} />
                                <Route path="/issue/failed" element={<Issue {...config} />} />
                                <Route path="/epk/person" element={<EPK {...config} />} />
                                <Route path="/epk/notification" element={<EPK {...config} />} />
                                <Route path="/archive/search" element={<Archive {...config} />} />
                                <Route path="/archive/upload" element={<Archive {...config} />} />
                                <Route path="/archive/manual" element={<Archive {...config} />} />
                                <Route path="/fund/overview" element={<Fund {...config} />} />
                                <Route path="/guideline" element={<Guideline  />} />
                            </Routes>
                        }
                    </div>
                </main>
            </>
        }
    </div>
};

export default (): JSX.Element => {
    return <Router>
        <App/>
    </Router>
};
