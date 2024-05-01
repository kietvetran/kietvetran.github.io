export const API_KEY = 'b00f8cfc6b2673a447f9c3a2122a20b8';

export interface WindwData {
  deg: number;
  gust: number;
  speed: number;
}

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainData {
  temp: number;
  temp_max: number;
  temp_min: number;
  humidity: number;
}

export interface SysData {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface WeatherResponseData {
  name: string;
  weather: WeatherData[];
  main: MainData;
  visibility: number;
  wind: WindwData;
  sys: SysData;
}
