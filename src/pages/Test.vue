<template></template>

<script lang="ts" setup>
  import { useRequestBackHook } from '@/hooks/common/commonHooks';
  import { reqVerify } from '@/api/verifyApi';
  const { data, loading, refresh } = useRequestBackHook(reqVerify());
  console.log(data);
</script>

<style lang="scss" scoped></style>
