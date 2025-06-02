<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <BasicLayout/>
    </div>
  </a-config-provider>
</template>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import {useLoginUserStore} from "@/stores/counter";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {onMounted, ref} from 'vue';

// 定义响应式数据
const locale = ref(zhCN);

// 创建 store 实例
const loginUserStore = useLoginUserStore();

// 在组件挂载后获取用户信息
onMounted(() => {
  loginUserStore.fetchLoginUser();
});

</script>

<style scoped>

</style>
