import { BasicResp } from './types';
import useHttp from './useHttp';

export interface IVerify {
  verify_id: string;
  verify_img: string;
}

export const reqVerify = () => {
  return useHttp<BasicResp<IVerify>>({
    url: `verify`,
    method: 'get',
  });
};
