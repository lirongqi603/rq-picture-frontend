<template>
  <a-modal title="修改用户信息" v-model:visible="visible" :footer="false" @cancel="closeModal">
    <a-form name="formData" :model="formData" @finish="handleSubmit" layout="vertical">
      <a-form-item
        name="userName"
        label="用户名称"
        :rules="[
            { required: true, message: '用户名称不能为空' },
            { max: 20, message: '用户名称长度不能大于20' }
            ]"
      >
        <a-input v-model:value="formData.userName"/>
      </a-form-item>
      <a-form-item name="userProfile" label="用户头像">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :action=uploadUrl
          :before-upload="beforeUpload"
          :with-credentials="true"
          @change="handleChange"
        >
          <img v-if="formData.userAvatar" :src="formData.userAvatar" alt="avatar"
               style="height: 100px;max-width: 100%"/>
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">上传头像</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item name="userProfile" label="用户简介"
                   :rules="[
            { max: 300, message: '用户简介长度不能大于20' },
            ]"
      >
        <a-textarea v-model:value="formData.userProfile"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {message, UploadChangeParam} from "ant-design-vue";
import {editUsingPost, getUserLoginUsingGet} from "@/api/userController";
import {useLoginUserStore} from "@/stores/useLoginUserStore";

const visible = ref<boolean>(false);
const loading = ref<boolean>('');
const uploadUrl = ref('http://localhost:8080/api/file/uploadAvatar');
const formData = ref<API.UserEditRequest>({})

const loginUserStore = useLoginUserStore();
const handleSubmit = async () => {
  loading.value = true;
  const res = await editUsingPost({
    ...formData.value
  });
  if (res.data.code === 0 && res.data.data) {
    message.success("修改成功")
    visible.value = false
    await loginUserStore.fetchLoginUser()
  } else {
    message.error("修改失败：" + res.data.message)
  }
  loading.value = false;
}

const openModel = () => {
  visible.value = true
  fetchData()
}

const closeModal = () => {
  visible.value = false
  formData.value = {}
}

//暴露 方法
defineExpose({
  openModel
})

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    if (info.file.response.code === 0) {
      formData.value.userAvatar = info.file.response.data;
      message.success('上传成功');
    } else {
      message.success('上传失败', info.file.response.message);
    }
    loading.value = false;
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('上传失败');
  }
};

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('图片格式不正确，仅允许jpeg/png');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('用户头像大于2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const fetchData = async () => {
  const res = await getUserLoginUsingGet();
  if (res.data.code === 0 && res.data.data) {
    const loginUser = res.data.data;
    formData.value.id = loginUser.id
    formData.value.userName = loginUser.userName
    formData.value.userAvatar = loginUser.userAvatar
    formData.value.userProfile = loginUser.userProfile
  } else {
    message.error("获取用户信息失败：" + res.data.message)
  }
}
</script>

<style scoped>

</style>
