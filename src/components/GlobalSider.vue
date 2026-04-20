<template>
    <a-layout-sider  v-if="loginUserStore.loginUser.id" width="200" style="background: #fff" collapsed-width="0" breakpoint="lg">
      <a-menu v-model:selectedKeys="current" mode="inline" :items="menuItems" @click="doMenuClick"/>
    </a-layout-sider>
</template>

<script setup lang="ts">
import {computed, h, ref, watchEffect} from 'vue';
import {PictureOutlined, UserOutlined, TeamOutlined} from '@ant-design/icons-vue';
import {MenuProps, message} from 'ant-design-vue';
import {useRouter} from "vue-router";
import {useLoginUserStore} from "@/stores/useLoginUserStore";
import {SPACE_TYPE_ENUM} from "@/utills/SpaceType";
import {myTeamSpaceUsingPost} from "@/api/spaceUserController";

//动态路演跳转
const router = useRouter();
const doMenuClick = ({key}) => {
  router.push(key)
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
  {
    key: '/add_space?type=' + SPACE_TYPE_ENUM.TEAM,
    label: '创建团队空间',
    title: '创建团队空间',
    icon: () => h(TeamOutlined),
  },
]);

const teamSpaceList = ref<API.SpaceVo[]>([])
const fetchSpaceList = async () => {
  const res = await myTeamSpaceUsingPost();
  if (res.data.code === 0 && res.data.data) {
    teamSpaceList.value = res.data.data
  }else {
    message.error('加载我的团队空间失败，' + res.data.message)
  }
}

const menuItems = computed(() => {
  // 没有团队空间，只展示固定菜单
  if (teamSpaceList.value.length < 1) {
    return originItems.value;
  }
  // 展示团队空间分组
  const teamSpaceSubMenus = teamSpaceList.value.map((space) => {
    return {
      key: '/space/' + space.id,
      label: space?.spaceName,
    }
  })
  const teamSpaceMenuGroup = {
    type: 'group',
    label: '我的团队',
    key: 'teamSpace',
    children: teamSpaceSubMenus,
  }
  return [...originItems.value,teamSpaceMenuGroup]
})


watchEffect(() => {
    if (loginUserStore.loginUser.id) {
      fetchSpaceList()
    }
  }
)
</script>
<style scoped>
</style>
