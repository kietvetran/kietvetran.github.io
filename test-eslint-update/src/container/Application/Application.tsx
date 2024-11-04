import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import './Application.scss';

export default function Application() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="application-wrapper">
        <header className="app-header">
          Header
        </header>
        <main className="app-body">
          Main
        </main>
      </div>
    </QueryClientProvider>
  );
}
