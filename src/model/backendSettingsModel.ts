import { ISite_config } from '@/api/siteApi';

type keys = keyof ISite_config;

export const backendSettingsModel:keys[] =
  ['background_color','background_image','background_music',
    'background_mask_color','box_background_hover_color',
    'box_background_color', 'box_link_color','box_link_hover_color',
    'box_title_color','box_hint_color','site_name', 'site_desc',
    'site_name_color','site_desc_color']
