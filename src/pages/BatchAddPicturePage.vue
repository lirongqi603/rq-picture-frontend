<template>
  <div id="addPicturePage">
    <h2>批量添加图片</h2>
    <a-form name="formData" :model="formData" @finish="handleSubmit" layout="vertical">
      <a-form-item name="searchText" label="搜索内容">
        <a-input v-model:value="formData.searchText" placeholder="请输入搜索内容" allow-clear/>
      </a-form-item>
      <a-form-item name="searchPage" label="搜索页码">
        <a-input-number style="min-width: 180px;" min="1" v-model:value="formData.searchPage" placeholder="请输入搜索页码"
                        allow-clear/>
      </a-form-item>
      <a-form-item name="searchNum" label="搜索数量">
        <a-input-number style="min-width: 180px;" min="1" max="30" v-model:value="formData.searchNum"
                        placeholder="请输入搜索数量" allow-clear/>
      </a-form-item>
      <a-form-item name="namePrefix" label="图片名称前缀">
        <a-input v-model:value="formData.namePrefix" placeholder="请输入图片名称前缀" allow-clear/>
      </a-form-item>
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
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%" :loading="loading">执行任务</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {
  batchUploadPictureUsingPost,
  listPictureTagCategoryUsingGet
} from "@/api/pictureController";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const formData = reactive<API.BatchUploadPictureRequest>({})
const categoryList = ref<{ value: string; label: string }[]>([])
const tagList = ref<{ value: string; label: string }[]>([])
const loading = ref<boolean>(false)


const router = useRouter();

const handleSubmit = async () => {
  loading.value = true;
  const res = await batchUploadPictureUsingPost({
    ...formData
  });
  if (res.data.code === 0 && res.data.data) {
    message.success("任务执行成功,共" + res.data.data + "条")
    router.push({
      path: `/`
    })
  } else {
    message.error("任务执行失败")
  }
  loading.value = false;
}

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

onMounted(() => {
  getPictureTagCategoryList();
})
</script>

<style scoped>

#addPicturePage {
  max-width: 720px;
  margin: 0 auto;
}
</style>
