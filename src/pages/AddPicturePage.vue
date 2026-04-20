<template>
  <div id="addPicturePage">
    <h2>{{ route.query?.id ? '修改图片' : '创建图片' }}</h2>

    <a-typography-paragraph v-if="picture?.spaceId" type="secondary">
      保存到空间：<a :href="`/space/${picture.spaceId}`" target="_blank">{{ picture.spaceId }}</a>
    </a-typography-paragraph>

    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="file" tab="文件上传">
        <PictureUpload :picture="picture" :onSuccess="onSuccess"/>
      </a-tab-pane>
      <a-tab-pane key="url" tab="地址上传" force-render>
        <UrlUpload :picture="picture" :onSuccess="onSuccess"/>
      </a-tab-pane>
    </a-tabs>
    <a-flex gap="middle" align="center" justify="center" style="margin: 16px 0 16px 0" v-if="picture.url">
      <a-button type="primary" ghost @click="openEdit">
        <EditOutlined/>
        编辑图片
      </a-button>
      <a-button type="primary" @click="openOutPaintPicture">
        <FullscreenOutlined/>
        AI扩图
      </a-button>
    </a-flex>
    <a-form v-if="picture" name="pictureForm" :model="pictureForm" @finish="handleSubmit" layout="vertical">
      <a-form-item name="name" label="图片名称">
        <a-input v-model:value="pictureForm.name" placeholder="请输入图片名称" allow-clear/>
      </a-form-item>
      <a-form-item name="introduction" label="简介">
        <a-textarea v-model:value="pictureForm.introduction" :auto-size="{ minRows: 2, maxRows: 5 }"
                    placeholder="请输入图片简介" allow-clear/>
      </a-form-item>
      <a-form-item name="category" label="图片分类">
        <a-select v-model:value="pictureForm.category" :options="categoryList" allow-clear placeholder="请选择图片分类">
        </a-select>
      </a-form-item>
      <a-form-item name="tags" label="图片标签">
        <a-select
          v-model:value="pictureForm.tags"
          mode="tags"
          style="width: 100%"
          placeholder="请选择标签"
          :options="tagList"
          allow-clear
        ></a-select>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">{{ route.query?.id ? '修改' : '创建' }}</a-button>
      </a-form-item>
    </a-form>
    <EditPicture ref="editPicture" :picture="picture" :onSuccess="editPictureSuccess"/>
    <OutPaintingPicture ref="outPaintPicture" :picture="picture" :onSuccess="outPaintPictureSuccess"/>
  </div>
</template>

<script setup lang="ts">
import PictureUpload from "@/components/PictureUpload.vue";
import UrlUpload from "@/components/UrlUpload.vue";
import EditPicture from "@/components/EditPicture.vue";
import OutPaintingPicture from "@/components/OutPaintingPicture.vue";
import {onMounted, reactive, ref} from "vue";
import {EditOutlined, FullscreenOutlined} from '@ant-design/icons-vue';
import {editPictureUsingPost, getPictureVoByIdUsingGet, listPictureTagCategoryUsingGet} from "@/api/pictureController";
import {message} from "ant-design-vue";
import {useRoute, useRouter} from "vue-router";

const picture = ref<API.PictureVo>({});
const pictureForm = reactive<API.PictureEditRequest>({})
const categoryList = ref<{ value: string; label: string }[]>([])
const tagList = ref<{ value: string; label: string }[]>([])
const activeKey = ref<{ string }[]>('file')

const onSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture;
  pictureForm.name = newPicture.name;
}

const router = useRouter();

const handleSubmit = async () => {
  const pictureId = picture.value?.id;
  if (!pictureId) {
    message.error("请先上传图片")
    return;
  }
  const res = await editPictureUsingPost({
    id: pictureId,
    ...pictureForm
  });
  if (res.data.code === 0 && res.data.data) {
    message.success("创建成功")
    router.push({
      path: `/picture/${pictureId}`
    })
  } else {
    message.error("创建失败："+res.data.message)
  }
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

const route = useRoute();

const fetchData = async () => {
  const pictureId = route.query?.id;
  const spaceId = route.query?.spaceId;
  if (spaceId) {
    picture.value.spaceId = spaceId;
  }
  if (!pictureId) {
    return;
  }
  const res = await getPictureVoByIdUsingGet({id: pictureId});
  if (res.data.code === 0 && res.data.data) {
    picture.value = res.data.data;
    pictureForm.id = res.data.data.id;
    pictureForm.name = res.data.data.name;
    pictureForm.introduction = res.data.data.introduction;
    pictureForm.category = res.data.data.category;
    pictureForm.tags = res.data.data.tags;
    pictureForm.spaceId = res.data.data.spaceId;
  }
}

const editPicture = ref<any>()
const openEdit = () => {
  editPicture.value.openModel()
}
const editPictureSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture;
}

const outPaintPicture = ref<any>()
const openOutPaintPicture = () => {
  outPaintPicture.value.openModel()
}
const outPaintPictureSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture;
}

onMounted(() => {
  getPictureTagCategoryList();
  fetchData();
})
</script>

<style scoped>

#addPicturePage {
  max-width: 720px;
  margin: 0 auto;
}
</style>
