export interface BasicResp<T> {
  code: number;
  data: T;
  msg: string;
}

export interface WallListResp<T> {
  code: number;
  data: T;
  msg: string;
  total: number;
}
export interface ListResp<T> {
  code: number;
  data: {
    total: number;
    list: T[];
  };
  msg: string;
}
