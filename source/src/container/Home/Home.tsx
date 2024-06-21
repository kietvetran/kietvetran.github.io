import React from 'react';

import BigTwo from '../../components/BigTwo/BigTwo';
import Profile from '../../components/Profile/Profile';
import { getURLquery } from '../../util/';
import './Home.scss';

export default function Home() {
  const query = getURLquery();

  return (
    <div className="home-wrapper">

      { query.view === 'bigtwo' && <BigTwo />}
      { query.view === 'profile' && <Profile />}

      { !query.view && <div className="home-content">
        {false && (
          <div className="home-widget">
            <Profile />
          </div>
        )}

        {false && (
          <div className="home-widget">
            <BigTwo />
          </div>
        )}
      </div>}
    </div>
  );
}
