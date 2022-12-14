import { ListResp } from './types';
import useHttp from './useHttp';

export enum MsgType {
  COMMON = 0,
  FIXED = 1,
}

export interface IMsgData {
  id: number;
  user_id: number;
  fixed: boolean;
  nickname: string;
  content: string;
  read: boolean;
  reply: string;
  created_at: string;
}

export const reqLeaveMsg = (userID: number, msgType: MsgType, page: number, size: number) => {
  return useHttp<ListResp<IMsgData>>({
    url: `leave_msg/v1/${msgType}/${userID}`,
    method: 'get',
  });
};
