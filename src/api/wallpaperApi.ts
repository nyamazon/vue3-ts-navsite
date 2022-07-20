import { WallListResp } from './types';
import useHttp from './useHttp';

export interface IWallPaperData {
  pic_id: string;
  pic_name: string;
  pic_cate_id: number;
  pic_origin_url: string;
  pic_thumb_url: string;
  pic_create_time: Date;
}
export interface IPaginationData {
  currentPage: number;
  pageSize?: number;
}
export const reqWallPaper = (paginationData: IPaginationData = { currentPage: 1 }) => {
  return useHttp<WallListResp<IWallPaperData[]>>({
    url: `wallpaper/getWallPaper`,
    method: 'get',
    params: { ...paginationData },
  });
};
