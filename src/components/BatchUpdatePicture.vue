<template>
  <a-modal title="批量编辑图片" v-model:visible="visible" :footer="false">
    <a-form name="formData" :model="formData" @finish="handleSubmit" layout="vertical">
      <a-typography-paragraph type="secondary">* 只对当前页面图片修改</a-typography-paragraph>
      <a-form-item name="category" label="图片分类">
        <a-select v-model:value="formData.category" :options="categoryList" allow-clear placeholder="请选择图片分类">
        </a-select>
      </a-form-item>
      <a-form-item name="tagList" label="图片标签">
        <a-select
          v-model:value="formData.tagList"
          mode="tags"
          style="width: 100%"
          placeholder="请选择标签"
          :options="tagList"
          allow-clear
        ></a-select>
      </a-form-item>
      <a-form-item label="命名规则">
        <a-input v-model:value="formData.nameFormat" placeholder="请输入图片名称格式" allow-clear/>
        <a-typography-paragraph type="secondary" style="margin-top: 16px">图片名称格式：风景图片[序号]</a-typography-paragraph>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" style="width: 100%">提交</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {
  batchUpdatePictureUsingPost,
  editPictureUsingPost,
  listPictureTagCategoryUsingGet
} from "@/api/pictureController";
import {message} from "ant-design-vue";

interface Props {
  spaceId: string | number;
  dataList: API.PictureVo[];
  onSuccess?: () => void;
}

const props = defineProps<Props>();

const visible = ref<boolean>(false)
const loading = ref<boolean>(false)
const formData = reactive<API.BatchUpdatePictureRequest>({})
const categoryList = ref<{ value: string; label: string }[]>([])
const tagList = ref<{ value: string; label: string }[]>([])

const getPictureTagCategoryList = async () => {
  const res = await listPictureTagCategoryUsingGet();
  if (res.data.code === 0 && res.data.data) {
    categoryList.value = res.data.data.categoryList?.map(item => ({
      value: item,
      label: item
    })) || []

    tagList.value = res.data.data.tagList?.map(item => ({
      value: item,
      label: item
    })) || []
  }
}

const handleSubmit = async () => {
  const ids: number[] = props.dataList.map(item => item.id)
  loading.value = true;
  const res = await batchUpdatePictureUsingPost({
    pictureIdList: ids,
    spaceId: props.spaceId,
    ...formData
  });
  if (res.data.code === 0 && res.data.data) {
    message.success("修改成功")
    visible.value = false
    props.onSuccess?.()
  } else {
    message.error("修改失败：" + res.data.message)
  }
  loading.value = false;
}

const openModel = () => {
  visible.value = true
}

//暴露 方法
defineExpose({
  openModel
})

onMounted(() => {
  getPictureTagCategoryList()
})
</script>

<style scoped>

</style>
