import React from 'react';

import BigTwo from '../../components/BigTwo/BigTwo';
import Profile from '../../components/Profile/Profile';
import Speech from '../../components/Speech/Speech';
import Recognition from '../../components/Recognition/Recognition';
import LogoBanner from '../../components/LogoBanner/LogoBanner';
import Map from '../../components/Map/Map';
import Guideline from '../Guideline/Guideline';

import { getURLquery } from '../../util/';
import './Home.scss';

export default function Home() {
  const query = getURLquery();

  return (
    <div className="home-wrapper">
      { query.view === 'bigtwo' && <BigTwo />}
      { query.view === 'profile' && <Profile />}
      { query.view === 'guideline' && <Guideline />}
      { query.view === 'map' && <Map />}

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

        <div className="left-side">
            <div className="home-widget -logo-banner">
                <LogoBanner />
            </div>
        </div>
        <div className="right-side">
            <div className="home-widget -speech">
              <Speech />
            </div>

            <div className="home-widget -recognition">
              <Recognition />
            </div>
        </div>
      </div>}
    </div>
  );
}
