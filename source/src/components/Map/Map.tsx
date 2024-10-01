import classNames from 'classnames';
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


import './Map.scss';

export default (): JSX.Element => {
  const mapRef = useRef<any>()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2lldHZldHJhbiIsImEiOiJjbTFxMWdzdWgwYjkyMm1wYjZsdGNpODZxIn0.aK9lf6NJ0bz1O743ce0Y9w';
    mapRef.current = new mapboxgl.Map({
        container: 'map-container',
        center: [10.75, 59.9125],
        zoom: 17,            
    });

    return () => {
      mapRef.current.remove();
    }
  }, [mapRef]);

  return (
    <div className={classNames('map-wrapper')} id='map-container'/>
  );
};
