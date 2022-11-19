import { BasicResp } from './types';
import useHttp from './useHttp';

export interface IVerifyForm {
  id:string;
  value:string;
}
export interface IUserForm {
  username:string;
  password:string;
  verify:IVerifyForm
}
export interface ReturnUserFrom {
  user_id:number;
  username:string;
  avatar?:string;
  role?:string;

}

export const reqUserLogin = (userForm:IUserForm) => {
  return useHttp<BasicResp<ReturnUserFrom>>({
    url: `user/login`,
    method: 'post',
    data:userForm
  });
};
