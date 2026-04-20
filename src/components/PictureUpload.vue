<template>
  <div class="picture-upload">
    <a-upload
      list-type="picture-card"
      :show-upload-list="false"
      class="avatar-uploader"
      :custom-request="handleUpload"
      :before-upload="beforeUpload"
    >
      <img v-if="props.picture?.url" :src="props.picture?.url" alt="avatar"/>
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">点击或拖拽上传</div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons-vue';
import {message, UploadProps} from 'ant-design-vue';
import {ref} from 'vue';
import {uploadPictureUsingPost} from "@/api/pictureController";

interface Props {
  picture: API.PictureVo,
  onSuccess: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>();
const fileList = ref([]);
const loading = ref<boolean>(false);


const handleUpload = async ({file}: any) => {
  loading.value = true;
  try {
    const param: API.UploadPictureRequest = props.picture ? {id: props.picture.id, spaceId: props.picture.spaceId} : {}
    const res = await uploadPictureUsingPost(param, {}, file);
    if (res.data.code === 0 && res.data.data) {
      message.success("上传成功")
      props.onSuccess?.(res.data.data)
    } else {
      message.error("上传失败：" + res.data.message)
    }
  } catch (e) {
    message.error("上传失败", e)
  } finally {
    loading.value = false;
  }

}


const beforeUpload = (file: UploadProps ['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请上传jpeg或png格式的图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过2M');
  }
  return isJpgOrPng && isLt2M;
};


</script>
<style scoped>
.picture-upload :deep(.ant-upload) {
  width: 100% !important;
  height: 100% !important;
  min-height: 152px;
  min-width: 152px;
}

.picture-upload img {
  max-width: 100%;
  max-height: 480px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

</style>
