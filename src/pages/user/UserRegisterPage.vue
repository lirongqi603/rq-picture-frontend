<template>
  <div id="userRegisterPage">
    <div>
      <h2 class="title">云图库-用户注册</h2>
      <div class="describe">智能协同云图库</div>
    </div>
    <a-form class="login"
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
    >
      <a-form-item
        name="userAccount"
        :rules="[{ required: true, message: '请输入账号' },{ min: 4, message: '账号最小长度4' },{ max: 16, message: '账号最大长度16' }]"
      >
        <a-input v-model:value="formState.userAccount" placeholder="请输入账号"/>
      </a-form-item>

      <a-form-item
        name="userPassword"
        :rules="[{ required: true, message: '请输入密码' },{ min: 8, message: '密码最小长度8' },{ max: 16, message: '密码最大长度16' }]"
      >
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码"/>
      </a-form-item>
      <a-form-item
        name="checkPassword"
        :rules="[{ required: true, message: '请输入确认密码' },{ min: 8, message: '确认密码最小长度8' },{ max: 16, message: '确认密码最大长度16' }]"
      >
        <a-input-password v-model:value="formState.checkPassword" placeholder="请输入确认密码"/>
      </a-form-item>

      <div class="tips">已有账号？
        <router-link to="/user/login">去登录</router-link>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import {userRegisterUsingPost} from "@/api/userController";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
});

const router = useRouter()

const onFinish = async (values: API.UserRegisterRequest) => {
  try {
    if (values.userPassword !== values.checkPassword) {
      message.error("两次输入密码不一致")
      return
    }
    const res = await userRegisterUsingPost(values)
    if (res.data.code === 0 && res.data.data) {
      message.success("注册成功")
      await router.push({
        path: '/user/login',
        replace: true
      })
    }
  } catch (e) {
    message.error("注册失败", e)
  }
};

</script>
<style scoped>
#userRegisterPage {
  width: 360px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}

.describe {
  text-align: center;
  color: #bbb;
  margin-bottom: 16px;
}

.tips {
  text-align: right;
  color: #bbb;
  margin-bottom: 16px;
}
</style>

