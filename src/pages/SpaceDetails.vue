<template>
  <div id="SpaceDetails">
    <a-flex justify="space-between">
      <h2>{{ space.spaceName }}(私有空间)</h2>
      <a-space>
        <a-button type="primary" :href="`/add_picture?spaceId=${space.id}`" target="_blank">
          + 创建图片
        </a-button>
        <a-button type="primary" ghost @click="openBatchUpdate">
          + 批量编辑图片
        </a-button>
        <a-tooltip placement="top" :title="'空间使用情况：'+(space.totalSize??0)+'/'+space.maxSize">
          <a-progress type="circle" :percent="((space.totalSize??0)/space.maxSize).toFixed(1)" :size="45"/>
        </a-tooltip>
      </a-space>
    </a-flex>
    <PictureSearch :onSearch="onSearch"/>
    <a-form-item label="颜色主色调" style="margin-left: 16px">
      <color-picker format="hex" @pureColorChange="onColorChange"/>
    </a-form-item>
    <a-divider/>
    <PictureList :data-list="pictureList" :loading="loading" :operate="true" :onReload="fetchData"/>
    <a-pagination style="text-align: right" v-model:current="searchParams.current"
                  v-model:page-size="searchParams.pageSize" :total="total" :onChange="paginationChange"/>
    <BatchUpdatePicture ref="batchUpdatePicture" :dataList="pictureList" :onSuccess="fetchData" :spaceId="props.id"/>
  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {getSpaceVoByIdUsingGet} from "@/api/spaceController";
import PictureList from "@/components/PictureList.vue";
import PictureSearch from "@/components/PictureSearch.vue";
import BatchUpdatePicture from "@/components/BatchUpdatePicture.vue";
import {message} from "ant-design-vue";
import {listPagePictureVosUsingPost, searchPictureListByColorUsingPost} from "@/api/pictureController";
import {useRouter} from "vue-router";
import {ColorPicker} from "vue3-colorpicker";
import "vue3-colorpicker/style.css";


interface Props {
  id: string | number;
}

const props = defineProps<Props>();
const space = ref<API.SpaceVo>({});
const pictureList = ref<API.PictureVo[]>([]);
const loading = ref<boolean>(false);

const searchParams = ref<API.PictureQueryRequest>({
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


const onSearch = async (newSearchParams: API.PictureQueryRequest) => {
  searchParams.value = {...searchParams.value, ...newSearchParams}
  await fetchPictureData();
}

const fetchPictureData = async () => {
  if (space.value.id) {
    loading.value = true;
    const res = await listPagePictureVosUsingPost({
      spaceId: space.value.id,
      isPublic: false,
      ...searchParams.value
    })
    if (res.data.code === 0) {
      pictureList.value = res.data.data.records
      total.value = res.data.data.total
    }
    loading.value = false;
  }
}

const onColorChange = async (color: string) => {
  loading.value = true;
  const res = await searchPictureListByColorUsingPost({
    spaceId: space.value.id,
    picColor: color,
    isPublic: false,
    ...searchParams.value,
    current: 1,
  })
  if (res.data.code === 0) {
    const dataList = res.data.data
    pictureList.value = dataList
    total.value = dataList.length
  } else {
    message.error("获取图片列表失败:" + res.data.message)
  }
  loading.value = false;
}

const paginationChange = (page: number, pageSize: number) => {
  searchParams.value.current = page;
  searchParams.value.pageSize = pageSize;
  fetchPictureData();
}

const batchUpdatePicture = ref<any>();
const openBatchUpdate = () => {
  batchUpdatePicture.value.openModel();
}
onMounted(() => {
  fetchData();
})


</script>

<style scoped>

</style>
