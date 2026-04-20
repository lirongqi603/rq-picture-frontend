<template>
  <div class="pictureList">
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :data-source="dataList"
            :loading="loading">
      <template #renderItem="{ item : picture}">
        <a-list-item style="padding: 0">
          <a-card hoverable style="width: 240px;" @click="doClickPicture(picture)">
            <template #cover>
              <img :alt="picture.name" :src="picture.thumbnailUrl ?? picture.url"
                   style="height: 180px;object-fit: cover;"/>
            </template>
            <a-card-meta :title="picture.name">
              <template #description>
                <a-flex>
                  <a-tag color="green">{{ picture.category ? picture.category : '默认' }}</a-tag>
                  <a-tag v-for="tag in picture.tags" :key="tag">{{ tag }}</a-tag>
                </a-flex>
              </template>
            </a-card-meta>
            <template #actions v-if="props.operate">
              <ShareAltOutlined @click="e=>shareHandle(e,picture)"/>
              <EditOutlined v-if="props.canEdit" @click="e=>editHandle(e,picture)"/>
              <DeleteOutlined v-if="props.canDel" @click="e=>deleteHandle(e,picture)"/>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
    <SharePicture ref="share" :url="shareUrl"/>
  </div>
</template>

<script setup lang="ts">

import {EditOutlined, DeleteOutlined, ShareAltOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {deletePictureUsingPost} from "@/api/pictureController";
import {message} from "ant-design-vue";
import SharePicture from "@/components/SharePicture.vue";
import {ref} from "vue";

interface Props {
  dataList: API.PictureVo[],
  loading: boolean,
  operate: boolean,
  canEdit: boolean,
  canDel: boolean,
  onReload?: () => void
}

const props = withDefaults<Props>(
  defineProps<Props>(),
  {
    dataList: () => [],
    loading: false,
    operate: false,
    canEdit: false,
    canDel: false
  }
);

const router = useRouter();
const doClickPicture = (picture: API.PictureVo) => {
  router.push({
    path: `/picture/${picture.id}`
  })
}
const shareUrl = ref<string>();
const share = ref<any>();
const shareHandle = (e, picture: API.PictureVo) => {
  e.stopPropagation();
  shareUrl.value = `${window.location.protocol}//:${window.location.host}/picture/${picture.id}`
  share.value.openModel?.()
}
const editHandle = (e, picture: API.PictureVo) => {
  e.stopPropagation();
  router.push({
    path: `/add_picture`,
    query: {
      id: picture.id
    }
  })
}
const deleteHandle = async (e, picture: API.PictureVo) => {
  e.stopPropagation();
  try {
    const res = await deletePictureUsingPost({id: picture.id});
    if (res.data.code === 0) {
      message.success("删除成功")
      props?.onReload?.();
    } else {
      message.error("删除失败:" + res.data.message)
    }
  } catch (e) {
    message.error("删除失败", e)
  }
}
</script>

<style scoped>

</style>
