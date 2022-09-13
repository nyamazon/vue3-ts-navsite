import { BasicResp } from "@/api/types";

export const ElNotificationMessageModel = (res:BasicResp<boolean>) => {
  return {
    title: res.code === 200 ? '٩(๑>◡<๑)۶！' : '∑( ° △ °|||)︴！',
    message: res.data? '操作成功！':'操作失败！',
    type: res.code === 200 ? 'success' : 'warning',
  }
}
