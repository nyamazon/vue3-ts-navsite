import { BasicResp } from './types';
import useHttp from './useHttp';

export interface IWallPaperData {
  pic_id: string;
  pic_name: string;
  pic_cate_id: number;
  pic_origin_url: string;
  pic_thumb_url: string;
  pic_create_time: Date;
}
export const reqWallPaper = () => {
  return useHttp<BasicResp<IWallPaperData[]>>({
    url: `wallpaper/getWallPaper`,
    method: 'get',
  });
};
