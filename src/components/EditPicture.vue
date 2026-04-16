<template>
  <a-modal title="编辑图片" v-model:visible="visible" :footer="false">
    <vueCropper
      ref="cropper"
      :img="props.picture.url"
      :outputSize="props.picture.picSize"
      outputType="png"
      :autoCrop="true"
      :canMove="false"
      :centerBox="true"
      :info="true"
    ></vueCropper>

    <div class="operatePic">
      <a-space size="middle">
        <a-button @click="changeScale(1)" class="btn">放大</a-button>
        <a-button @click="changeScale(-1)" class="btn">缩小</a-button>
        <a-button @click="rotateLeft">左旋</a-button>
        <a-button @click="rotateRight">右旋</a-button>
        <a-button @click="refreshCrop">重置</a-button>
        <a-button type="primary" :loading="loading" @click="handleSubmit">确认</a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<script setup lang="ts">

import {ref} from "vue";
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";
import {uploadPictureUsingPost} from "@/api/pictureController";
import {message} from "ant-design-vue";

interface Props {
  picture: API.PictureVo;
  onSuccess: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>();

const visible = ref<boolean>(false)

const cropper = ref<any>()
const changeScale = (num) => {
  num = num || 1;
  cropper.value.changeScale(num);
}
const rotateLeft = () => {
  cropper.value.rotateLeft();
}
const rotateRight = () => {
  cropper.value.rotateRight();
}
const refreshCrop = () => {
  cropper.value.refresh();
}
const openModel = () => {
  visible.value = true
}

const handleSubmit = () => {
  cropper.value.getCropBlob((blob: Blob) => {
    const picName = (props.picture.name ?? '默认名称') + '.png';
    console.log(picName)
    const file = new File([blob], picName, {type: blob.type});
    handleUpload({file})
  })
}

const loading = ref<boolean>(false);
const handleUpload = async ({file}: any) => {
  loading.value = true;
  try {
    const param: API.UploadPictureRequest = props.picture ? {id: props.picture.id, spaceId: props.picture.spaceId} : {}
    const res = await uploadPictureUsingPost(param, {}, file);
    if (res.data.code === 0 && res.data.data) {
      message.success("上传成功")
      visible.value = false
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
//暴露 方法
defineExpose({
  openModel
})

</script>

<style scoped>
.vue-cropper {
  height: 400px !important;
}

.operatePic {
  margin-top: 16px;
  text-align: center;
}
</style>
