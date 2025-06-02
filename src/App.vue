<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <BasicLayout/>
    </div>
  </a-config-provider>
</template>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {onMounted, ref} from 'vue';

// 定义响应式数据
const locale = ref(zhCN);

</script>

<style scoped>

</style>
