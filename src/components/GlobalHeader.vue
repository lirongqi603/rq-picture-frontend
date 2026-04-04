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
            <a-dropdown>
              <a-space>
                <a-avatar :src="loginUserStore.loginUser.userAvatar"/>
                <a class="ant-dropdown-link" @click.prevent>
                  {{ loginUserStore.loginUser.userName ?? '无名' }}
                  <DownOutlined/>
                </a>
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    <LoginOutlined/>
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
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
import {computed, h, ref} from 'vue';
import {HomeOutlined, DownOutlined, LoginOutlined} from '@ant-design/icons-vue';
import {MenuProps, message} from 'ant-design-vue';
import {useRouter} from "vue-router";
import {useLoginUserStore} from "@/stores/useLoginUserStore";
import {userLogoutUsingPost} from "@/api/userController";

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

const originItems = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/search',
    label: h('a', {href: 'http://www.baidu.com', target: '_blank'}, '百度'),
    title: '百度',
  },
]);

const filterMenu = (menus = [] as MenuProps['items']) => {
  if (!Array.isArray(menus)) {
    return [];
  }

  return menus?.filter((item) => {
    if (item.key.startsWith("/admin")) {
      const loginUser = loginUserStore.loginUser;
      if (!loginUser || loginUser.userRole !== "admin") {
        return false
      }
    }
    return true
  })
}

const items = computed<MenuProps['items']>(() => filterMenu(originItems.value))

const doLogout = async () => {
  try {
    const res = await userLogoutUsingPost()
    if (res.data.code === 0) {
      message.success("退出登录成功")
      window.location.href = "/user/login"
    } else {
      message.success("退出登录失败")
    }
  } catch (e) {
    message.success("退出登录失败", e)
  }
}
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

