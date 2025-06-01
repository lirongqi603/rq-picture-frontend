<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo">
            <div class="title">智能云图库平台</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="doMenuClick"/>
      </a-col>
      <a-col flex="100px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{ loginUserStore.loginUser.userName ?? '无名' }}
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>

      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import {h, ref} from 'vue';
import {HomeOutlined} from '@ant-design/icons-vue';
import {MenuProps} from 'ant-design-vue';
import {useRouter} from "vue-router";
import {useLoginUserStore} from "@/stores/counter";

const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
  },
  {
    key: '/search',
    label: h('a', {href: 'http://www.baidu.com', target: '_blank'}, '百度'),
    title: '百度',
  },
]);

//动态路演跳转
const router = useRouter();
const doMenuClick = ({key}) => {
  router.push({
    path: key
  })
}

//菜单高亮
const current = ref<string[]>([]);
router.afterEach((to, form, next) => {
  current.value = [to.path]
})

const loginUserStore = useLoginUserStore();
</script>
<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>

