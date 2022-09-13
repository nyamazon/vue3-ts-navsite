import { defineStore } from 'pinia';
import useStorage from '@/hooks/useStorage';
import type { ISite_config } from '@/api/siteApi';

const SITE_CONFIG_KEY = 'site-settings';
const { setItem,getItem } = useStorage();
// const lvl = getItem<Partial<ISite_config>>(SITE_CONFIG_KEY);

const useSiteSettingsStore = defineStore({
  id: SITE_CONFIG_KEY,
  state: ():Partial<ISite_config> => ({
    id: 1,
    site_name: '二进制术士',
    other_background_image: '',
    site_desc: 'dont look back in angle',
    site_desc_color:'#ffffff',
    box_hint_color:'#ffffff',
    background_image: 'https://ae01.alicdn.com/kf/Uc3d8f541d57e48c9a270407d96334ef7G.jpg',
    background_color: 'rgba(3, 7, 8, 0.68)',
    pure_background: false,
    background_music: 'https://music.163.com/song/media/outer/url?id=1331962874.mp3',
    box_link_align: 'center',
    site_name_color: '#F7F7F7',
    box_background_color: 'rgba(14, 14, 14, 0.24)',
    box_title_color: '#FFFFFF',
    box_link_color: '#FFFFFF',
    box_link_hover_color: '#E47116',
    box_background_hover_color: 'rgba(0, 0, 0, 0.55)',
    background_mask_color: 'rgba(0, 0, 0, 0.04)'
  }),
  actions: {
    load(val: any) {
      // this.$state = { ...this.$state, ...val };
      // console.log("fix val,",val);
      this.$patch({ ...val });
    },
  },
});

const instance = useSiteSettingsStore();
const data = getItem(instance.$id);
instance.$subscribe((_, state) => {
  // console.log('sub', state);
  setItem(instance.$id, { ...state });
  // console.log("after subs",instance.$state)
});
// 如果最开始Localstorage里有值，那么就存到state里去
if(data) instance.load(data);

export default useSiteSettingsStore;
