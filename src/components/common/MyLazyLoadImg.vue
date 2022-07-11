<template>
  <div class="lazy__box">
    <img ref="lazyRef" class="lazy__img" alt="">
  </div>
</template>

<script lang="ts" setup>
// import type { Ref } from 'vue'
import { inject, onMounted, onUnmounted, ref, defineProps } from 'vue'
import type Lazy from './types/lazy'
import type { Nullable } from './types/util'
const props = withDefaults(defineProps<{ url: string }>(), {
  url: ''
})
const imgLoaded = inject('imgLoaded') as () => void;
const lazy = inject('lazy') as Lazy;
const lazyRef = ref<Nullable<HTMLImageElement>>(null);
const render = () => {
  if (!lazyRef.value)
    return
  lazy.mount(lazyRef.value, props.url, () => {
    imgLoaded()
  })
}
const unRender = () => {
  if (!lazyRef.value)
    return
  lazy.unmount(lazyRef.value)
}
onMounted(() => {
  render()
})
onUnmounted(() => {
  unRender()
})
</script>

<style scoped>
.lazy__box {
  width: 100%;
  display: flex;
  justify-content: center;
}

.lazy__img {
  display: block;
}

.lazy__img[lazy=loading] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy=loaded] {
  width: 100%;
}

.lazy__img[lazy=error] {
  padding: 5em 0;
  width: 48px;
}
</style>
