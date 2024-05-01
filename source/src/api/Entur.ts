import { QueryFunctionContext } from '@tanstack/react-query';

import { GeoPoint } from '../domain/Location';
import Constant from '../static/Constant';

/******************************************************************************
 ******************************************************************************/
export const fetchAutocomplete = async ({ queryKey }: QueryFunctionContext<[string, GeoPoint]>): Promise<any> => {
  const [_key, geoPoint] = queryKey;
  // const point = geoPoint?.latitude && geoPoint?.llongitude ? geoPoint : Constant.osloGeoPoint;
  const point = geoPoint?.latitude && geoPoint?.longitude ? geoPoint : Constant.lillestromGeoPoint;
  const size = 10;
  const radius = 0.5;
  const paramList = [
    `point.lat=${point.latitude}`,
    `point.lon=${point.longitude}`,
    `boundary.circle.radius=${radius}`,
    `size=${size}`,
    'layers=venue',
    // 'layers=address,locality',
  ];

  const url = `${Constant.enturAPIurl}?${paramList.join('&')}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/******************************************************************************
 ******************************************************************************/
export const fetchSearchStopPlace = async ({ queryKey }: QueryFunctionContext<[string, string]>): Promise<any> => {
  const [_key, text] = queryKey;
  const size = 20;
  const paramList = [`text=${text}`, `size=${size}`, 'lang=no'];
  const url = `${Constant.enturAPIsearchStopPlace}?${paramList.join('&')}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/******************************************************************************
 ******************************************************************************/
export const fetchEntyrAPI = async ({ queryKey }: QueryFunctionContext<[string, string]>): Promise<any> => {
  const [_key, body] = queryKey;
  const url = Constant.enturAPIgraphl;
  const config = {
    ...Constant.graphqlConfig,
    body: body.replace(/'/g, '"'),
  };

  const response = await fetch(url, config);
  const data = await response.json();
  return data;
};
