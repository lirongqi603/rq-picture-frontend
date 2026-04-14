<template>
  <div id="addSpacePage">
    <h2>{{ route.query?.id ? '修改空间' : '创建空间' }}</h2>
    <a-form name="spaceForm" :model="spaceForm" @finish="handleSubmit" layout="vertical">
      <a-form-item name="spaceName" label="空间名称">
        <a-input v-model:value="spaceForm.spaceName" placeholder="请输入空间名称" allow-clear/>
      </a-form-item>
      <a-form-item name="spaceLevel" label="空间级别">
        <a-select :onChange="spaceLevelChange" v-model:value="spaceForm.spaceLevel" :options="spaceLevelList"
                  allow-clear
                  placeholder="请选择空间分类">
        </a-select>
      </a-form-item>
      <a-form-item name="maxSize" label="空间大小(B)">
        <a-input-number style="min-width: 180px" min="1" v-model:value="spaceForm.maxSize" allow-clear
                        placeholder="请输入空间大小"/>
      </a-form-item>
      <a-form-item name="maxCount" label="空间数量(张)">
        <a-input-number style="min-width: 180px" min="1" v-model:value="spaceForm.maxCount" allow-clear
                        placeholder="请输入空间数量"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">{{ route.query?.id ? '修改' : '创建' }}</a-button>
      </a-form-item>
    </a-form>

    <a-card title="空间级别介绍">
      <a-typography-paragraph>
        目前仅支持一级空间，如需升级请联系管理员,联系电话：12345678901。
      </a-typography-paragraph>
      <a-typography-paragraph v-for="spaceLevel in spaceLevelList" key="spaceLevel">
        {{ spaceLevel.label }}：最大空间大小为 {{ formatFileSize(spaceLevel.maxSize) }}，最大空间数量为 {{ spaceLevel.maxCount }}个
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {
  getSpaceLevelUsingGet,
  getSpaceVoByIdUsingGet,
  updateSpaceUsingPost
} from "@/api/spaceController";
import {message} from "ant-design-vue";
import {useRoute, useRouter} from "vue-router";
import {formatFileSize} from "@/utills";

const space = ref<API.SpaceVo>();
const spaceForm = reactive<API.SpaceUpdateRequest>({})
const spaceLevelList = ref<{ value: string; label: string; maxSize: number; maxCount: number }[]>([])
const loading = ref<boolean>(false);

const router = useRouter();

const handleSubmit = async () => {
  loading.value = true;
  const spaceId = space.value?.id;
  let msg = "创建";
  if (spaceId) {
    msg = "修改";
  }
  const res = await updateSpaceUsingPost({
    id: spaceId,
    ...spaceForm
  });
  if (res.data.code === 0 && res.data.data) {
    message.success(msg + "成功")
    router.push({
      path: '/admin/spaceManagePage'
    })
  } else {
    message.error(msg + "失败:" + res.data.message)
  }
  loading.value = false;
}

const getSpaceLevelList = async () => {
  const res = await getSpaceLevelUsingGet();
  if (res.data.code === 0 && res.data.data) {
    spaceLevelList.value = res.data.data?.map(item => ({
      value: item.value,
      label: item.name,
      maxSize: item.maxSize,
      maxCount: item.maxCount
    })) || []
  }
}

const route = useRoute();

const fetchData = async () => {
  const spaceId = route.query?.id;
  if (!spaceId) {
    return;
  }
  const res = await getSpaceVoByIdUsingGet({id: spaceId});
  if (res.data.code === 0 && res.data.data) {
    space.value = res.data.data;
    spaceForm.id = res.data.data.id;
    spaceForm.spaceName = res.data.data.spaceName;
    spaceForm.spaceLevel = res.data.data.spaceLevel;
    spaceForm.maxSize = res.data.data.maxSize;
    spaceForm.maxCount = res.data.data.maxCount;
  }
}

const spaceLevelChange = () => {
  debugger
  const spaceLevel = spaceLevelList.value.find(item => item.value === spaceForm.spaceLevel);
  if (spaceLevel) {
    spaceForm.maxSize = spaceLevel.maxSize;
    spaceForm.maxCount = spaceLevel.maxCount;
  }
}

onMounted(() => {
  getSpaceLevelList();
  fetchData();
})
</script>

<style scoped>

#addSpacePage {
  max-width: 720px;
  margin: 0 auto;
}
</style>
