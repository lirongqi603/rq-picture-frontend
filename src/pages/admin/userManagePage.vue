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
        <a-input v-model:value="searchParams.username" placeholder="请输入用户名"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
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
        <span>
          <a-button type="primary" danger @click="doDelete(record.id)">删除</a-button>
        </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from "vue";
import {userDeleteUsingPost, userListUsingPost, userUpdateUsingPost} from "@/api/userManage";
import {message} from "ant-design-vue";

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
</script>

