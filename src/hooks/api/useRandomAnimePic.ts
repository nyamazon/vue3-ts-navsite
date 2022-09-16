import { reqRandomAnimePic } from '@/api/randomAnimePicApi';

export const useRandomAnimePic = ():Promise<string> => {
  return new Promise((resolve,reject) => {
    reqRandomAnimePic().then(res => {
      if(res.success || res.code) {
        resolve(res.imgurl)
      }else {
        reject('请求失败!')
      }
    })
  })
}
