import React from 'react';

import Profile from '../../components/Profile/Profile';
import BigTwo from '../../components/BigTwo/BigTwo';
import './Home.scss';

export default function Home() {
  return (
    <div className="home-wrapper">
      {false && <BigTwo />}
      {true && <Profile />}
    </div>
  );
}
