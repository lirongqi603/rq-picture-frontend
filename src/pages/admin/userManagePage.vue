<template>
  <div id="userManagePage">
    <a-form
      layout="inline"
      :model="searchParams"
      @finish="handleSearch"
      style="margin-bottom: 16px"
    >
      <a-form-item>
        <a-input v-model:value="searchParams.userAccount" placeholder="请输入账号"/>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="searchParams.username" placeholder="请输入用户名称"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          <SearchOutlined/>
          搜索
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="openAdd">
          <UserAddOutlined/>
          新增
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="dataList" :pagination="pagination" @change="doTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'userAvatar'">
          <a-image :src="record.userAvatar" alt="头像" style="height: 50px"/>
        </template>
        <template v-else-if="column.key === 'userRole'">
        <span>
          <a-tag v-if="record.userRole === 'admin'" color="green">
            管理员
          </a-tag>
          <a-tag v-else color="geekblue">
            普通用户
          </a-tag>
        </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a-button type="primary" @click="openUpdate(record.id)">编辑</a-button>
            <a-button type="primary" danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="visible"
      :title="formTitle"
      ok-text="提交"
      cancel-text="取消"
      @ok="onSubmit"
    >
      <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <a-form-item
          name="账号"
          label="账号"
          :rules="formState.id ? [] : [
            { required: true, message: '账号不能为空' },
            { max: 16, message: '账号长度不能大于20' },
            { min: 4, message: '账号长度不能小于4' },
            ]"
        >
          <a-input v-model:value="formState.userAccount" :disabled="formState.id!==''"/>
        </a-form-item>
        <a-form-item
          name="userName"
          label="用户名称"
          :rules="[
            { required: true, message: '用户名称不能为空' },
            { max: 20, message: '用户名称长度不能大于20' }
            ]"
        >
          <a-input v-model:value="formState.userName"/>
        </a-form-item>
        <a-form-item name="userProfile" label="用户头像">
          <a-image :src="formState.userAvatar"></a-image>
        </a-form-item>
        <a-form-item name="userProfile" label="用户简介"
                     :rules="[
            { max: 300, message: '用户简介长度不能大于20' },
            ]"
        >
          <a-textarea v-model:value="formState.userProfile"/>
        </a-form-item>
        <a-form-item name="userRole" class="collection-create-form_last-form-item">
          <a-radio-group v-model:value="formState.userRole">
            <a-radio value="admin">管理员</a-radio>
            <a-radio value="user">普通用户</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref, toRaw} from "vue";
import {
  getInfoUsingGet,
  userAddUsingPost,
  userDeleteUsingPost,
  userListUsingPost,
  userUpdateUsingPost
} from "@/api/userManage";
import {message} from "ant-design-vue";
import {SearchOutlined, UserAddOutlined} from '@ant-design/icons-vue';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '用户头像',
    dataIndex: 'userAvatar',
    key: 'userAvatar',
  },
  {
    title: '用户简介',
    dataIndex: 'userProfile',
    key: 'userProfile',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    key: 'userRole',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
  },
];

const dataList = ref([]);
const total = ref(0);

const searchParams = reactive<API.UserQueryRequest>({
  current: 1,
  pageSize: 10,
  userAccount: '',
  userName: '',
})

const fetchData = async () => {
  try {
    const res = await userListUsingPost({
      ...searchParams
    })
    if (res.data.code === 0) {
      dataList.value = res.data.data.records
      total.value = res.data.data.total
    } else {
      message.error("获取数据失败")
    }
  } catch (e) {
    message.error("获取数据失败", e)
  }
}


onMounted(() => {
  fetchData();
})


const doDelete = async (key) => {
  try {
    const res = await userDeleteUsingPost({id: key});
    if (res.data.code === 0) {
      message.success("删除成功")
      await fetchData()
    } else {
      message.success("删除失败")
    }
  } catch (e) {
    message.success("删除失败", e)
  }
}

const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: total.value,
    showSizeChanger: true,
    showTotal: () => `共${total.value}条`
  }
})


const doTableChange = (page: any) => {
  searchParams.current = page.current;
  searchParams.pageSize = page.pageSize;
  fetchData();
}

const handleSearch = () => {
  searchParams.current = 1;
  fetchData();
}
const formTitle = ref<any>("修改用户")
const visible = ref<boolean>(false)
const formState = ref<any>({
  id: "",
  userAccount: "",
  userName: "",
  userAvatar: "",
  userProfile: "",
  userRole: "",
})

const reset = () => {
  formRef.value?.resetFields();
  formState.value = {
    id: "",
    userAccount: "",
    userName: "",
    userAvatar: "",
    userProfile: "",
    userRole: "user",
  }
}

const openUpdate = async (id) => {
  formTitle.value = "修改用户"
  reset()
  visible.value = true
  try {
    const res = await getInfoUsingGet({id: id});
    if (res.data.code === 0) {
      formState.value = res.data.data
    } else {
      message.error("获取信息失败")
    }
  } catch (e) {
    message.error("获取信息失败", e)
  }
}

const openAdd = async () => {
  formTitle.value = "新增用户"
  reset()
  visible.value = true
}
const formRef = ref();
const onSubmit = async () => {
  const form = formState.value
  formRef.value
    .validate()
    .then(async () => {
      if (form.id) {
        try {
          const res = await userUpdateUsingPost(form)
          if (res.data.code === 0) {
            message.success("修改成功")
            await fetchData();
            visible.value = false
          } else {
            message.error(res.data.message)
          }
        } catch (e) {
          message.error("修改失败", e)
        }
      } else {
        try {
          const res = await userAddUsingPost({
            userAccount: form.userAccount,
            userName: form.userName,
            userAvatar: form.userAvatar,
            userProfile: form.userProfile,
            userRole: form.userRole
          })
          if (res.data.code === 0) {
            message.success("新增成功")
            await fetchData();
            visible.value = false
          } else {
            message.error(res.data.message)
          }
        } catch (e) {
          message.error("新增失败", e)
        }
      }
    })
    .catch(error => {
      console.log('error', error);
    });
}
</script>

