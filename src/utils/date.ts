import dayjs from 'dayjs';
import relativePlugin from 'dayjs/plugin/relativeTime';
dayjs.extend(relativePlugin);

export const getNowDate = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

export const formatDate = (date: string = '') => {
  return dayjs(date).format('YYYY/MM/DD HH:mm');
};
export const relativeTime = (date: string) => {
  return dayjs(date).fromNow();
};
export const formatDateYMD = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
};
