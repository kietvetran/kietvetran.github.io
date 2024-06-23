import React from 'react';

import BigTwo from '../../components/BigTwo/BigTwo';
import Profile from '../../components/Profile/Profile';
import Speech from '../../components/Speech/Speech';
import Recognition from '../../components/Recognition/Recognition';
import { getURLquery } from '../../util/';
import './Home.scss';

export default function Home() {
  const query = getURLquery();

  const now = (new Date()).getTime();
  const bigDate = new Date('2027-06-01T00:00:00Z');
  const weekLeft = Math.ceil((bigDate.getTime() - now) / ((24*60*60*1000) *7));

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

        <div className="home-widget">
          <Speech />
        </div>

        <div className="home-widget -recognition">
          <Recognition />
        </div>
      </div>}

      <div className="big-date">{`${weekLeft} weeks left`}</div>
    </div>
  );
}
