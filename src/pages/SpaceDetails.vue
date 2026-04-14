<template>
  <div id="SpaceDetails">
    <a-flex justify="space-between">
      <h2>{{ space.spaceName }}(私有空间)</h2>
      <a-space>
        <a-button type="primary" :href="`/add_picture?spaceId=${space.id}`" target="_blank">
          创建图片
        </a-button>
        <a-tooltip placement="top" :title="'空间使用情况：'+(space.totalSize??0)+'/'+space.maxSize">
          <a-progress type="circle" :percent="((space.totalSize??0)/space.maxSize).toFixed(1)" :size="45"/>
        </a-tooltip>
      </a-space>
    </a-flex>
    <a-divider/>
    <PictureList :data-list="pictureList" :loading="loading" :operate="true" :onReload="fetchData"/>
    <a-pagination style="text-align: right" v-model:current="searchParams.current"
                  v-model:page-size="searchParams.pageSize" :total="total" :onChange="paginationChange"/>
  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {getSpaceVoByIdUsingGet} from "@/api/spaceController";
import PictureList from "@/components/PictureList.vue";
import {message} from "ant-design-vue";
import {listPagePictureVosUsingPost} from "@/api/pictureController";
import {useRouter} from "vue-router";

interface Props {
  id: string | number;
}

const props = defineProps<Props>();
const space = ref<API.SpaceVo>({});
const pictureList = ref<API.PictureVo[]>([]);
const loading = ref<boolean>(false);

const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 12,
})
const total = ref<number>(0);
const router = useRouter();

const fetchData = async () => {
  const res = await getSpaceVoByIdUsingGet({id: props.id});
  if (res.data.code === 0 && res.data.data) {
    space.value = res.data.data;
    await fetchPictureData()
  } else {
    message.error("获取空间信息失败:" + res.data.message)
    router.replace({
      path: '/my_space'
    })
  }
}

const fetchPictureData = async () => {
  if (space.value.id) {
    loading.value = true;
    const res = await listPagePictureVosUsingPost({
      spaceId: space.value.id,
      isPublic: false,
      ...searchParams
    })
    if (res.data.code === 0) {
      pictureList.value = res.data.data.records
      total.value = res.data.data.total
    }
    loading.value = false;
  }
}

const paginationChange = (page: number, pageSize: number) => {
  searchParams.current = page;
  searchParams.pageSize = pageSize;
  fetchPictureData();
}

onMounted(() => {
  fetchData();
})


</script>

<style scoped>

</style>
