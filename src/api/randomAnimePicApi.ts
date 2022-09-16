import { BasicResp } from './types';
import useHttp from './useHttp';


export interface Info {
  width: number;
  height: number;
  type: string;
}

export interface BasicAnimeResp {
  success: boolean;
  code?:number|string;
  imgurl: string;
  info: Info;
}

export const reqRandomAnimePic = () => {
  return useHttp<BasicAnimeResp>({
    /**
     * https://api.vvhan.com/api/acgimg?type=json
     * https://api.btstu.cn/sjbz/api.php?lx=dongman&format=json
     */
    url:'https://api.btstu.cn/sjbz/api.php?lx=dongman&format=json',
    method:'get'
  })
}
