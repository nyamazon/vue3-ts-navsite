export const backTop = () => {
  return new Promise((resolve) => {
    const dom = document.getElementsByClassName('front')[0];
    let top = dom.scrollTop as number; //获取点击时页面的滚动条纵坐标位置
    document.getElementsByClassName('front')[0].scrollTop = 0;
    resolve(true);

    // const timeTop = setInterval(() => {
    //   document.getElementsByClassName('front')[0].scrollTop = top -= 50; //一次减50往上滑动
    //   if (top <= 0) {
    //     clearInterval(timeTop);
    //     console.log('finish');
    //     resolve(true);
    //   }
    // }, 5); //定时调用函数使其更顺滑
  });
};
