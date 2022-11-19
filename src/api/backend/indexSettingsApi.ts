import type { BasicResp } from '../types';
import useHttp from '../useHttp';
import type { ISite_config } from '@/api/siteApi';
import { ReturnUserFrom } from '../loginApi';
// export type keys = keyof ISite_config

interface IUpdateSiteSettingsForm extends ISite_config,ReturnUserFrom {
  update_time?:string;
}

export const updateSettingsApi = (settings: Partial<IUpdateSiteSettingsForm>) => {
  return useHttp<BasicResp<boolean>>({
    url: 'backend/updateSettings',
    method: 'post',
    data: settings,
  });
};
