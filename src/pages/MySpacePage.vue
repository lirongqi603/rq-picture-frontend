<template>
  <div id="mySpace">
    <p>正在跳转中...</p>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useLoginUserStore} from "@/stores/useLoginUserStore";
import {listPageVoUsingPost} from "@/api/spaceController";
import {onMounted} from "vue";
import {SPACE_TYPE_ENUM} from "@/utills/SpaceType";

const router = useRouter();

const checkExistSpace = async () => {
  debugger
  const loginUser = useLoginUserStore();
  if (!loginUser.loginUser.id) {
    router.replace({
      path: '/user/login'
    })
  }
  const res = await listPageVoUsingPost({
    current: 1,
    pageSize: 1,
    userId: loginUser.loginUser.id,
    spaceType: SPACE_TYPE_ENUM.PRIVATE
  })
  if (res.data.code === 0 && res.data.data?.total > 0) {
    router.replace({
      path: `/space/${res.data.data.records[0].id}`
    })
  } else {
    router.replace({
      path: '/add_space'
    })
  }
}

onMounted(() => {
  checkExistSpace()
})
</script>

<style scoped>

</style>
