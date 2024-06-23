import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { queryClient } from '../../query/queryClient';
import Home from '../Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import BigTwo from '../../components/BigTwo/BigTwo';
import SkyEarth from '../../components/SkyEarth/SkyEarth';
import Test from '../Test/Test';
import Guideline from '../Guideline/Guideline';
import './Application.scss';

export default function Application() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="application-wrapper">
        <header className="app-header">
          <div className="app-cnt layout-wrapper">
            <a href={window.location.origin} className="link -no-underline">
              <h1>kietvetran</h1>
            </a>
            <nav id="main-nav" className="navigation" aria-label="hovedmenu" role="navigation">
              <a href={`${window.location.origin}`}>Home</a>
              <a href={`${window.location.origin}?view=bigtwo`}>Big2</a>
              <a href={`${window.location.origin}?view=store`}>Store</a>
            </nav>
          </div>
        </header>
        <main className="app-body">
          <SkyEarth />
          <div className="app-cnt layout-wrapper">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bigtwo" element={<BigTwo />} />
                <Route path="/test" element={<Test />} />
                <Route path="/guideline" element={<Guideline />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}
