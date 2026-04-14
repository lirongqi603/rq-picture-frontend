<template>
  <div id="GlobalSider">
    <a-layout-sider  v-if="loginUserStore.loginUser.id" width="200" style="background: #fff" collapsed-width="0" breakpoint="lg">
      <a-menu v-model:selectedKeys="current" mode="inline" :items="items" @click="doMenuClick"/>
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts">
import {computed, h, ref} from 'vue';
import {PictureOutlined, UserOutlined} from '@ant-design/icons-vue';
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
    icon: () => h(PictureOutlined),
    label: '公共图库',
    title: '公共图库',
  },
  {
    key: '/my_space',
    label: '我的空间',
    title: '我的空间',
    icon: () => h(UserOutlined),
  },
]);

const filterMenu = (menus = [] as MenuProps['items']) => {
  if (!Array.isArray(menus)) {
    return [];
  }

  return menus?.filter((item) => {
    const loginUser = loginUserStore.loginUser;
    if (item.key.startsWith("/admin")) {
      if (!loginUser || loginUser.userRole !== "admin") {
        return false
      }
    } else if (item.key != '/' && !loginUser.id) {
      return false
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
#GlobalSider :deep(.ant-layout-sider-zero-width-trigger){
  background: #9ebcd9;
}
</style>
