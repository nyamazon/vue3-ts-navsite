import type { BasicResp } from '../types';
import useHttp from '../useHttp';
// import { ISite_config } from '@/api/siteApi';
// export type keys = keyof ISite_config

export const updateSettingsApi = (settingsAry:string[]) => {
  return useHttp<BasicResp<string>>({
    url:'backend/updateSettings',
    method:"post",
    data:settingsAry
  })
}
