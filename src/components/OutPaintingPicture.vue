<template>
  <a-modal title="AI扩图" v-model:visible="visible" :footer="false">
    <a-row :gutter="[16 , 16]">
      <a-col :span="12">
        <h4>原图信息</h4>
        <img style="height: 200px;max-width: 100%;" :src="props.picture.url" :alt="props.picture.name">
      </a-col>
      <a-col :span="12">
        <h4>扩图信息</h4>
        <img v-if="imgUrl" style="height: 200px;max-width: 100%;" :src="imgUrl" :alt="props.picture.name">
      </a-col>
    </a-row>
    <div class="operatePic">
      <a-space size="middle">
        <a-button type="primary" ghost @click="createTask" :loading="!!taskId">
          <FullscreenOutlined/>
          AI扩图
        </a-button>
        <a-button type="primary" v-if="imgUrl" :loading="loading" @click="handleSubmit">应用</a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<script setup lang="ts">

import {onUnmounted, ref} from "vue";
import {createAiTaskUsingPost, getAiTaskProgressUsingGet, uploadPictureByUrlUsingPost} from "@/api/pictureController";
import {message} from "ant-design-vue";
import {FullscreenOutlined} from '@ant-design/icons-vue';

interface Props {
  picture: API.PictureVo;
  onSuccess: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>();

const visible = ref<boolean>(false)
const imgUrl = ref<string>()
const taskId = ref<string>()

const openModel = () => {
  visible.value = true
}

//定时器
let pollingTimer: NodeJS.Timeout = null

const clearPolling = () => {
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
    taskId.value = null
  }
}

const createTask = async () => {
  try {
    const res = await createAiTaskUsingPost({
      input: {
        image_url: props.picture.url
      },
      parameters: {
        xScale: 2,
        yScale: 2
      }
    });
    if (res.data.code === 0 && res.data.data) {
      message.success("任务创建成功，请耐心等待结果，不要退出弹窗！")
      taskId.value = res.data.data.output.task_id
      startPolling()
    } else {
      message.error("任务创建失败")
    }
  } catch (e) {
    message.error("任务创建失败", e)
  }
}

//轮训获取任务进度
const startPolling = () => {
  if (!taskId.value) return
  pollingTimer = setInterval(async () => {
    try {
      const res = await getAiTaskProgressUsingGet({
        taskId: taskId.value
      });
      if (res.data.code === 0 && res.data.data) {
        const output = res.data.data.output
        if (output.task_status === "SUCCEEDED") {
          message.success("任务完成")
          imgUrl.value = output.output_image_url
          clearPolling()
        } else if (output.task_status === "FAILED" || output.task_status === "CANCELED" || output.task_status === "UNKNOWN") {
          message.error("任务失败")
          clearPolling()
        }
      }
    } catch (e) {
      clearPolling()
      message.error("任务失败", e)
    }
  }, 3000)

}

onUnmounted(()=>{
  clearPolling()
})

const handleSubmit = () => {
  handleUpload()
}

const loading = ref<boolean>(false);
const handleUpload = async () => {
  loading.value = true;
  try {
    const param: API.UploadPictureRequest = {
      url: imgUrl.value
    }
    if (props.picture) {
      param.id = props.picture.id
      param.spaceId = props.picture.spaceId
    }
    const res = await uploadPictureByUrlUsingPost(param);
    if (res.data.code === 0 && res.data.data) {
      message.success("上传成功")
      imgUrl.value = null
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
