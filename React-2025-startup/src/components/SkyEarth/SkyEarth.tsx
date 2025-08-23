import React from 'react';
import './SkyEarth.scss';

export function SkyEarth() {
  return (
    <div className="sky-earth-wrapper">
      <div className="sky">
        <div className="cloud-first-wrapper">
          <div className="cloud1" />
          <div className="cloud2" />
          <div className="cloud3" />
        </div>
        <div className="cloud-second-wrapper">
          <div className="cloud1" />
          <div className="cloud2" />
          <div className="cloud3" />
        </div>
      </div>
      <div className="earth" />
    </div>
  );
}
