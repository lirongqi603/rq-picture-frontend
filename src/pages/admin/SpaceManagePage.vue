<template>
  <div id="spaceManagePage">
    <a-flex justify="space-between" style="margin-bottom: 16px">
      <h2>空间管理</h2>
      <a-space>
        <a-button type="primary" :href="`/space_analyze?isAll=1`" target="_blank">
          <BarChartOutlined/>
          全部图库分析
        </a-button>
        <a-button type="primary" ghost :href="`/space_analyze?isPublic=1`" target="_blank">
          <BarChartOutlined/>
          公共图库分析
        </a-button>
      </a-space>
    </a-flex>
    <a-form
      layout="inline"
      :model="searchParams"
      @finish="handleSearch"
      style="margin-bottom: 16px"
    >
      <a-form-item label="空间名称">
        <a-input v-model:value="searchParams.spaceName" placeholder="请输入空间名称"/>
      </a-form-item>
      <a-form-item label="空间级别">
        <a-select style="width: 158px" v-model:value="searchParams.spaceLevel" :options="spaceLevelList" allow-clear
                  placeholder="请选择空间级别">
        </a-select>
      </a-form-item>
      <a-form-item label="用户ID">
        <a-input v-model:value="searchParams.userId" placeholder="请输入用户ID"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          <SearchOutlined/>
          搜索
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="dataList" :pagination="pagination" @change="doTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'spaceLevel'">
          {{ getSpaceLevelText(record.spaceLevel) }}
        </template>
        <template v-if="column.key === 'spaceInfo'">
          <a-space wrap>
            <div>空间总大小：{{ formatFileSize(record.maxSize) }}</div>
            <div>空间总数量：{{ record.maxCount }}</div>
            <div>空间使用大小：{{ formatFileSize(record?.totalSize) }}</div>
            <div>空间使用数量：{{ record?.totalCount }}</div>
          </a-space>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space wrap>
            <a-button type="link" :href="`/space_analyze?spaceId=${record.id}`" target="_blank">分析</a-button>
            <a-button type="link" @click="openUpdate(record.id)">编辑</a-button>
            <a-button type="link" danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from "vue";
import {
  deleteSpaceUsingPost, getSpaceLevelUsingGet, listPageUsingPost,
} from "@/api/spaceController";
import {message} from "ant-design-vue";
import {SearchOutlined, PlusOutlined, LoadingOutlined, BarChartOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {formatFileSize} from "@/utills";
import {getSpaceLevelText} from "@/utills/SpaceLevel";

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '空间名称',
    dataIndex: 'spaceName',
    key: 'spaceName',
  },
  {
    title: '空间级别',
    dataIndex: 'spaceLevel',
    key: 'spaceLevel',
  },
  {
    title: '空间信息',
    dataIndex: 'spaceInfo',
    key: 'spaceInfo',
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: '编辑时间',
    dataIndex: 'editTime',
    key: 'editTime',
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
const spaceLevelList = ref<{ value: string; label: string }[]>([])

const searchParams = reactive<API.SpaceQueryRequest>({
  current: 1,
  pageSize: 10,
  spaceName: '',
  spaceLevel: undefined,
  userId: ''
})

const fetchData = async () => {
  try {
    const res = await listPageUsingPost({
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

const doDelete = async (key) => {
  try {
    const res = await deleteSpaceUsingPost({id: key});
    if (res.data.code === 0) {
      message.success("删除成功")
      await fetchData()
    } else {
      message.error("删除失败:"+ res.data.message)
    }
  } catch (e) {
    message.error("删除失败", e)
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

const router = useRouter();

const openUpdate = (key) => {
  router.push({
    path: '/admin/update_space',
    query: {
      id: key
    }
  })
}


const getSpaceLevelList = async () => {
  const res = await getSpaceLevelUsingGet();
  if (res.data.code === 0 && res.data.data) {
    spaceLevelList.value = res.data.data?.map(item => ({
      value: item.value,
      label: item.name
    })) || []
  } else {
    message.error("获取数据失败")
  }
}

onMounted(() => {
  fetchData();
  getSpaceLevelList();
})

</script>
<style scoped>
</style>
