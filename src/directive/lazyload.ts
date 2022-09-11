import { Ref } from 'vue';
import loading from '@/assets/image/loading.gif';

export default {
  install(app: any) {
    app.directive('lazyload', {
      mounted(el: HTMLImageElement, bindings: Ref<string>) {
        // el - dom元素，bindings - 指令的值
        const observer = new IntersectionObserver(
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              //回收
              observer.unobserve(el);
              // 表示绑定的 dom 进入可视区域
              el.src = loading;
              let image: HTMLImageElement | null = new Image();
              image.src = bindings.value;
              image.onload = () => {
                el.src = bindings.value;
                image = null;
              };
            }
          },
          {
            threshold: 0,
          }
        );
        // 监视 dom
        observer.observe(el);
      },
    });
  },
};
