<template>
  <a-modal title="分享图片" v-model:visible="visible" :footer="false">
    <h4>复制分享链接</h4>
    <a-typography-link copyable>
      {{ props.url }}
    </a-typography-link>
    <div style="margin-bottom: 16px"></div>
    <h4>二维码分享</h4>
    <a-qrcode :value="props.url"></a-qrcode>
  </a-modal>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

interface Props {
  url: string;
}

const props = defineProps<Props>();

const visible = ref<boolean>(false)

const openModel = () => {
  visible.value = true
}

//暴露 方法
defineExpose({
  openModel
})

</script>

<style scoped>

</style>
