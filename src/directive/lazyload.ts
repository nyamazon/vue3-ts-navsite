import { Ref } from 'vue';

export default {
  install(app: any) {
    app.directive('lazyload', {
      mounted(el: HTMLImageElement, bindings: Ref<string>) {
        // el - dom元素，bindings - 指令的值
        const observer = new IntersectionObserver(
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              observer.unobserve(el);
              // 表示绑定的 dom 进入可视区域
              el.src = bindings.value;
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
