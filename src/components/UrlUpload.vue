<template>
  <div class="url-picture-upload">
    <a-input-group compact>
      <a-input v-model:value="fileUrl" style="width: calc(100% - 160px)" placeholder="请输入图片链接"/>
      <a-button type="primary" :loading="loading" style="width: 160px" @click="handleUpload">提交</a-button>
    </a-input-group>
    <div class="img-bar">
      <img v-if="props.picture" :src="props.picture.url" alt="avatar"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons-vue';
import {message, UploadProps} from 'ant-design-vue';
import {ref} from 'vue';
import {uploadPictureByUrlUsingPost, uploadPictureUsingPost} from "@/api/pictureController";

interface Props {
  picture: API.PictureVo,
  onSuccess: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>();
const fileUrl = ref<string>();
const loading = ref<boolean>(false);


const handleUpload = async () => {
  loading.value = true;
  try {
    const param: API.UploadPictureRequest = {
      url: fileUrl.value
    }
    if (props.picture) {
      param.id = props.picture.id
    }
    const res = await uploadPictureByUrlUsingPost(param);
    if (res.data.code === 0 && res.data.data) {
      message.success("上传成功")
      props.onSuccess?.(res.data.data)
    } else {
      message.error("上传失败")
    }
  } catch (e) {
    message.error("上传失败", e)
  } finally {
    loading.value = false;
  }

}

</script>
<style scoped>

.url-picture-upload img {
  max-width: 100%;
  max-height: 480px;
}
.url-picture-upload .img-bar {
  text-align: center;
  margin-bottom: 16px;
  margin-top: 16px;
}

</style>
