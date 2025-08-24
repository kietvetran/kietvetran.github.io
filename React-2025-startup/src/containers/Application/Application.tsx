import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { queryClient } from '../../query/queryClient';
import { Home } from '../Home/Home';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { SkyEarth } from '../../components/SkyEarth/SkyEarth';
import { Test } from '../Test/Test';
import './Application.scss';

export function Application() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="application-wrapper">
        <header className="app-header">
          <div className="app-cnt layout-wrapper">
            <a href="/" className="link -no-underline">
              <h1>kietvetran</h1>
            </a>
            <nav data-testid="main-nav" id="main-nav" className="navigation" aria-label="hovedmenu" role="navigation">
              <a data-testid="home-nav" id="home-nav" href="/">
                Home
              </a>
              <a data-testid="test-nav" id="test-nav" href="/test">
                Test
              </a>
            </nav>
          </div>
        </header>
        <main className="app-body">
          <SkyEarth />
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
