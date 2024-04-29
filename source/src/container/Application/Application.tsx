import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { queryClient } from '../../query/queryClient';
import Home from '../Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import Test from '../Test/Test';
import './Application.scss';

export default function Application() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="application-wrapper">
                <header className="app-header">
                    <div className="app-cnt layout-wrapper">
                        <a href={window.location.href} className="link -no-underline">
                            <h1>kietvetran</h1>
                        </a>
                        <nav id="main-nav" className="navigation" aria-label="hovedmenu" role="navigation" />
                    </div>
                </header>
                <main className="app-body">
                    <div className="app-cnt layout-wrapper">
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/test" element={<Test />} />
                                <Route path="/*" element={<PageNotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </main>
            </div>
        </QueryClientProvider>
    );
}
