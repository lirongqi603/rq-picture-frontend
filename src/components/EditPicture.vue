<template>
  <a-modal title="编辑图片" v-model:visible="visible" :footer="false" @cancel="closeModal">
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
    <div style="margin-bottom: 16px"></div>
    <!-- 协同编辑操作 -->
    <div class="image-edit-actions">
      <a-space v-if="isTeamSpace">
        <a-button v-if="editingUser" disabled> {{ editingUser.userName }}正在编辑</a-button>
        <a-button v-if="canEnterEdit" type="primary" ghost @click="enterEdit">进入编辑</a-button>
        <a-button v-if="canExitEdit" danger ghost @click="exitEdit">退出编辑</a-button>
      </a-space>
    </div>
    <div class="operatePic">
      <a-space size="middle">
        <a-button @click="changeScale(1)" :disabled="!canEdit" class="btn">放大</a-button>
        <a-button @click="changeScale(-1)" :disabled="!canEdit" class="btn">缩小</a-button>
        <a-button @click="rotateLeft" :disabled="!canEdit">左旋</a-button>
        <a-button @click="rotateRight" :disabled="!canEdit">右旋</a-button>
        <a-button @click="refreshCrop" :disabled="!canEdit">重置</a-button>
        <a-button type="primary" :loading="loading" :disabled="!canEdit" @click="handleSubmit">确认</a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<script setup lang="ts">

import {computed, onUnmounted, ref, watchEffect} from "vue";
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";
import {uploadPictureUsingPost} from "@/api/pictureController";
import {message} from "ant-design-vue";
import {useLoginUserStore} from "@/stores/useLoginUserStore";
import PictureEditWebSocket from "@/utills/PictureEditWebSocket";
import {PICTURE_EDIT_ACTION_ENUM, PICTURE_EDIT_MESSAGE_TYPE_ENUM} from "@/utills/picture";
import {SPACE_TYPE_ENUM} from "@/utills/SpaceType";

interface Props {
  picture: API.PictureVo;
  space: API.SpaceVo;
  onSuccess: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>();

const visible = ref<boolean>(false)

const cropper = ref<any>()
const changeScale = (num) => {
  num = num || 1;
  cropper.value.changeScale(num);
  if (num < 0) {
    editAction(PICTURE_EDIT_ACTION_ENUM.ZOOM_OUT)
  } else {
    editAction(PICTURE_EDIT_ACTION_ENUM.ZOOM_IN)
  }
}
const rotateLeft = () => {
  cropper.value.rotateLeft();
  editAction(PICTURE_EDIT_ACTION_ENUM.ROTATE_LEFT)
}
const rotateRight = () => {
  cropper.value.rotateRight();
  editAction(PICTURE_EDIT_ACTION_ENUM.ROTATE_RIGHT)
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

// 是否为团队空间
const isTeamSpace = computed(() => {
  return props.space?.spaceType === SPACE_TYPE_ENUM.TEAM;
})

// --------- 实时编辑 ---------
const loginUserStore = useLoginUserStore()
let loginUser = loginUserStore.loginUser
// 正在编辑的用户
const editingUser = ref<API.UserLoginVo>()
// 没有用户正在编辑中，可进入编辑
const canEnterEdit = computed(() => {
  return !editingUser.value
})
// 正在编辑的用户是本人，可退出编辑
const canExitEdit = computed(() => {
  return editingUser.value?.id === loginUser.id
})
// 可以编辑
const canEdit = computed(() => {
  if (!isTeamSpace.value) {
    return true
  }
  return editingUser.value?.id === loginUser.id
})

let websocket: PictureEditWebSocket | null

// 初始化 WebSocket 连接，绑定事件
const initWebsocket = () => {
  const pictureId = props.picture?.id
  if (!pictureId || !visible.value) {
    return
  }
  // 防止之前的连接未释放
  if (websocket) {
    websocket.disconnect()
  }
  // 创建 WebSocket 实例
  websocket = new PictureEditWebSocket(pictureId)
  // 建立 WebSocket 连接
  websocket.connect()

  // 监听通知消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.INFO, (msg) => {
    console.log('收到通知消息：', msg)
    message.info(msg.message)
  })

  // 监听错误消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.ERROR, (msg) => {
    console.log('收到错误消息：', msg)
    message.error(msg.message)
  })

  // 监听进入编辑状态消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.ENTER_EDIT, (msg) => {
    console.log('收到进入编辑状态消息：', msg)
    message.info(msg.message)
    editingUser.value = msg.user
  })

  // 监听编辑操作消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.EDIT_ACTION, (msg) => {
    console.log('收到编辑操作消息：', msg)
    message.info(msg.message)
    switch (msg.editAction) {
      case PICTURE_EDIT_ACTION_ENUM.ROTATE_LEFT:
        cropper.value.rotateLeft()
        break
      case PICTURE_EDIT_ACTION_ENUM.ROTATE_RIGHT:
        cropper.value.rotateRight()
        break
      case PICTURE_EDIT_ACTION_ENUM.ZOOM_IN:
        cropper.value.changeScale(1)
        break
      case PICTURE_EDIT_ACTION_ENUM.ZOOM_OUT:
        cropper.value.changeScale(-1)
        break
    }
  })

  // 监听退出编辑状态消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.EXIT_EDIT, (msg) => {
    console.log('收到退出编辑状态消息：', msg)
    message.info(msg.message)
    editingUser.value = undefined
  })
}

// 进入编辑状态
const enterEdit = () => {
  if (websocket) {
    // 发送进入编辑状态的消息
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.ENTER_EDIT,
    })
  }
}

// 退出编辑状态
const exitEdit = () => {
  if (websocket) {
    // 发送退出编辑状态的消息
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.EXIT_EDIT,
    })
  }
}

// 编辑图片操作
const editAction = (action: string) => {
  if (websocket) {
    // 发送编辑操作的请求
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.EDIT_ACTION,
      editAction: action,
    })
  }
}

watchEffect(() => {
  if (isTeamSpace.value) {
    initWebsocket()
  }
})

onUnmounted(() => {
  // 断开连接
  if (websocket) {
    websocket.disconnect()
  }
  editingUser.value = undefined
})

// 关闭弹窗
const closeModal = () => {
  visible.value = false
  // 断开连接
  if (websocket) {
    websocket.disconnect()
  }
  editingUser.value = undefined
}

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
