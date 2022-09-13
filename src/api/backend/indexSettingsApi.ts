import type { BasicResp } from '../types';
import useHttp from '../useHttp';
import { ISite_config } from '@/api/siteApi';
// export type keys = keyof ISite_config

export const updateSettingsApi = (settings: Partial<ISite_config>) => {
  return useHttp<BasicResp<boolean>>({
    url: 'backend/updateSettings',
    method: 'post',
    data: settings,
  });
};
