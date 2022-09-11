import type { Method } from 'axios';
import requests from '@/api/requests';

export interface HTTPConfig {
  url: string;
  method: Method;
  data?: { [key: string]: unknown } | {};
  params?: { [key: string]: unknown } | {};
}
const useHttp = <T>(config: HTTPConfig): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    /*
    *       url: config.url,
      method: config.method,
      data: config.data || {},
      params: config.params || {},*/
    requests({
      ...config,
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default useHttp;
