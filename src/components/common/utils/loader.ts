/**
 * load images
 * @param {Array[String]} images - 图片链接数组
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject(new Error('Image load error'));
    };
    image.src = url;
    console.log('imagesssssss', image);
  });
}
