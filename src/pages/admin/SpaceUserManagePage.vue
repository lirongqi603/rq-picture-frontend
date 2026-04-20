<template>
  <div id="spaceManagePage">
    <a-form
      layout="inline"
      :model="formData"
      @finish="handleSubmit"
      style="margin-bottom: 16px"
    >
      <a-form-item label="用户ID">
        <a-input v-model:value="formData.userId" placeholder="请输入用户ID"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          <PlusOutlined/>
          添加成员
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="dataList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'userInfo'">
          <a-space wrap>
            {{ record.user.userName }}
          </a-space>
        </template>
        <template v-else-if="column.key === 'spaceRole'">
          <a-select v-model:value="record.spaceRole" :options="SPACE_ROLE_OPTIONS"
                    @change="value=>handleEdit(value,record.id)"></a-select>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space wrap>
            <a-button type="link" danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {PlusOutlined} from '@ant-design/icons-vue';
import {useRoute, useRouter} from "vue-router";
import {
  addSpaceUserUsingPost,
  deleteSpaceUserUsingPost,
  editSpaceUserUsingPost,
  querySpaceUserUsingPost
} from "@/api/spaceUserController";
import {SPACE_ROLE_ENUM, SPACE_ROLE_OPTIONS} from "@/utills/SpaceType";

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户信息',
    dataIndex: 'userInfo',
    key: 'userInfo',
  },
  {
    title: '角色',
    dataIndex: 'spaceRole',
    key: 'spaceRole',
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
const formData = reactive<API.SpaceUserAddRequest>({});
const route = useRoute();

const fetchData = async () => {
  try {
    const res = await querySpaceUserUsingPost({
      spaceId: route.query.spaceId,
    })
    if (res.data.code === 0) {
      dataList.value = res.data.data
    } else {
      message.error("获取数据失败：" + res.data.message)
    }
  } catch (e) {
    message.error("获取数据失败", e)
  }
}

const doDelete = async (key) => {
  try {
    const res = await deleteSpaceUserUsingPost({id: key});
    if (res.data.code === 0) {
      message.success("删除成功")
      await fetchData()
    } else {
      message.error("删除失败:" + res.data.message)
    }
  } catch (e) {
    message.error("删除失败", e)
  }
}

const handleSubmit = async () => {
  formData.spaceId = route.query.spaceId;
  formData.spaceRole = SPACE_ROLE_ENUM.VIEWER;
  const res = await addSpaceUserUsingPost(formData)
  if (res.data.code === 0 && res.data.data) {
    message.success("添加成功")
    await fetchData();
  } else {
    message.error("添加失败" + res.data.message)
  }
}

const handleEdit = async (value, key) => {
  try {
    const res = await editSpaceUserUsingPost({
      id: key,
      spaceRole: value
    })
    if (res.data.code === 0) {
      message.success("修改成功")
      await fetchData()
    } else {
      message.error("修改失败:" + res.data.message)
    }
  } catch (e) {
    message.error("修改失败", e)
  }
}
onMounted(() => {
  fetchData();
})

</script>
<style scoped>
</style>
