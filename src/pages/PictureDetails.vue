<template>
  <div id="pictureDetails">
    <a-row :gutter="[16 , 16]">
      <a-col :sm="24" :md="16" :xl="18">
        <a-card title="图片预览">
          <a-image :src="picture.url" style="max-height: 600px; object-fit: contain"/>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="8" :xl="6">
        <a-card title="图片信息">
          <a-descriptions :column="1">
            <a-descriptions-item label="作者">
              <a-space>
                <a-avatar :size="24" :src="picture.user?.userAvatar"/>
                <div> {{ picture.user?.userName ?? '未知作者' }}</div>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="图片名称">{{ picture.name ?? '未知名称' }}</a-descriptions-item>
            <a-descriptions-item label="图片简介">{{ picture.introduction ?? '暂无' }}</a-descriptions-item>
            <a-descriptions-item label="图片分类">{{ picture.category ?? '默认' }}</a-descriptions-item>
            <a-descriptions-item label="图片标签">
              <a-space>
                <a-tag v-if="picture.tags?.length === 0">暂无</a-tag>
              </a-space>
              <a-tag v-for="tag in picture.tags" :key="tag">{{ tag }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="图片格式">{{ picture.picFormat ?? '未知格式' }}</a-descriptions-item>
            <a-descriptions-item label="宽度*高度"> {{ picture.picWidth }} X {{ picture.picHeight }}</a-descriptions-item>
            <a-descriptions-item label="宽高比"> {{ picture.picScale }}</a-descriptions-item>
            <a-descriptions-item label="图片大小"> {{ formatFileSize(picture.picSize) }}</a-descriptions-item>
          </a-descriptions>
          <a-space wrap>
            <a-button v-if="canEdit" type="primary" :size="16" @click="updatePicture(picture.id)">
              <template #icon>
                <EditOutlined/>
              </template>
              编辑
            </a-button>
            <a-button v-if="canEdit" danger :size="16" @click="deletePicture(picture.id)">
              <template #icon>
                <DeleteOutlined/>
              </template>
              删除
            </a-button>
            <a-button type="primary" :size="16" @click="onDownload">
              <template #icon>
                <DownloadOutlined/>
              </template>
              免费下载
            </a-button>
            <!--            <a-button type="default" :size="16" @click="goBack">-->
            <!--              <template #icon>-->
            <!--                <StepBackwardOutlined/>-->
            <!--              </template>-->
            <!--              返回-->
            <!--            </a-button>-->
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {deletePictureUsingPost, getPictureVoByIdUsingGet} from "@/api/pictureController";
import {message} from "ant-design-vue";
import {downloadFile, formatFileSize} from "@/utills";
import {useRouter} from "vue-router";
import {DeleteOutlined, EditOutlined, StepBackwardOutlined, DownloadOutlined} from '@ant-design/icons-vue'
import {useLoginUserStore} from "@/stores/useLoginUserStore";

interface Props {
  id: string | number;
}

const props = defineProps<Props>();
const picture = ref<API.PictureVo>({});

const fetchData = async () => {
  try {
    const res = await getPictureVoByIdUsingGet({id: props.id});
    if (res.data.code === 0 && res.data.data) {
      picture.value = res.data.data;
    } else {
      message.error("获取图片失败")
    }
  } catch (e) {
    message.error("获取图片失败", e)
  }
}

const router = useRouter();

const goBack = () => {
  //返回首页
  router.push(
    {
      path: '/'
    }
  )
}

const deletePicture = async (id: string | number) => {
  const res = await deletePictureUsingPost({id: id});
  if (res.data.code === 0) {
    message.success("删除成功")
    goBack();
  } else {
    message.error("删除失败")
  }
}

const updatePicture = (id: string | number) => {
  router.push({
    path: '/add_picture',
    query: {
      id: id
    }
  })
}

//权限校验
const canEdit = computed(() => {
  try {
    const loginUserStore = useLoginUserStore()
    const loginUser = loginUserStore?.loginUser ?? {}
    if (!loginUser) {
      return false
    }
    return loginUser.id === picture.value.user.userId || loginUser.userRole === 'admin'
  } catch (e) {
    return false
  }
})

const onDownload = () => {
  downloadFile(picture.value.url, picture.value.name)
}
onMounted(() => {
  fetchData();
})

</script>

<style scoped>

</style>
