import { BasicResp } from './types';
import useHttp from './useHttp';

export interface IVerify {
  img_url: string;
}

export const reqVerify = () => {
  return useHttp<BasicResp<IVerify>>({
    url: `verify`,
    method: 'get',
  });
};
