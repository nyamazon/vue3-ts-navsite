import type { BasicResp } from './types';
import useHttp from './useHttp';

export interface IWeatherData {
  errNo: string;
  data: IData;
}

export interface IData {
  weather: IWeather;
}

export interface IWeather {
  setting: ISetting;
  content: IContent;
}

export interface ISetting {
  city: string;
}

export interface IContent {
  week: string;
  city: string;
  today: IToday;
  tomorrow: ITomorrow;
  thirdday: IThirdday;
  fourthday: IFourthday;
  fifthday: IFifthday;
  linkseven: string;
  source: ISource;
  cityname: string;
  calendar: ICalendar;
  currenttemp: string;
  pslink: string;
  weatherType: string;
  isauto: boolean;
  ipcity: string;
  province: string;
}

export interface IToday {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
  pm25: string;
  pollution: string;
  pm25url: string;
}

export interface IImgs {
  0: string;
  1: string;
}

export interface ITomorrow {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
  pm25: string;
  pollution: string;
  pm25url: string;
}

export interface IThirdday {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
  pm25: string;
  pollution: string;
  pm25url: string;
}

export interface IFourthday {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
}

export interface IFifthday {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
}

export interface ISource {
  name: string;
  url: string;
}

export interface ICalendar {
  time: string;
  lunar: string;
  festival: boolean;
  weatherSourceUrl: string;
}


export const reqWeather = (city: string) => {
  return useHttp<BasicResp<string>>({
    url: `common/weather?city=${encodeURIComponent(city)}`,
    method: 'get',
  });
};

export const reqNews = () => {
  return useHttp<BasicResp<string[]>>({
    url: `common/news`,
    method: 'get',
  });
};
