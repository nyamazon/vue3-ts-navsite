import type { LazyOptions } from './lazy';
import type { IWallPaperData } from '@/api/wallpaperApi';
export interface ViewCard {
  pic_id: string;
  pic_name: string;
  pic_cate_id: number;
  pic_origin_url: string;
  pic_thumb_url: string;
  pic_create_time: Date;
}

interface Point {
  rowPerView: number;
}

export type Breakpoints = Record<number, Point>;

export interface WaterfallProps {
  breakpoints: Breakpoints;
  width: number;
  animationDuration: number;
  animationDelay: number;
  animationEffect: string;
  hasAroundGutter: boolean;
  gutter: number;
  list: IWallPaperData[];
  animationPrefix: string;
  rowKey?: string;
  imgSelector?: string;
  backgroundColor?: string;
  lazyload?: boolean;
  loadProps: LazyOptions | {};
  delay?: number;
}

export interface ItemWidthProps {
  breakpoints: Breakpoints;
  wrapperWidth: number;
  gutter: number;
  hasAroundGutter: boolean;
  initWidth: number;
}

export interface ItemWidthByBreakpointProps extends ItemWidthProps {
  size: number;
}
