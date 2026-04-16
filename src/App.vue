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

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';   // 引入中文语言包
dayjs.locale('zh-cn');
</script>

<style scoped>

</style>
