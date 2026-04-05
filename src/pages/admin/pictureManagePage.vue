<template>
  <div id="pictureManagePage">
    <a-form
      layout="inline"
      :model="searchParams"
      @finish="handleSearch"
      style="margin-bottom: 16px"
    >
      <a-form-item label="图片名称">
        <a-input v-model:value="searchParams.name" placeholder="请输入图片名称"/>
      </a-form-item>
      <a-form-item label="关键字">
        <a-input v-model:value="searchParams.searchText" placeholder="请输入名称或介绍"/>
      </a-form-item>

      <a-form-item label="图片分类">
        <a-select style="width: 158px" v-model:value="searchParams.category" :options="categoryList" allow-clear
                  placeholder="请选择图片分类">
        </a-select>
      </a-form-item>
      <a-form-item label="图片标签">
        <a-select
          v-model:value="searchParams.tags"
          mode="tags"
          style="width: 158px"
          placeholder="请选择标签"
          :options="tagList"
          allow-clear
        ></a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          <SearchOutlined/>
          搜索
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="openAdd">
          <PictureAddOutlined/>
          新增
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="dataList" :pagination="pagination" @change="doTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'url'">
          <a-image :src="record.url" alt="图片" style="height: 50px"/>
        </template>
        <template v-if="column.key === 'imgInfo'">
          <a-space wrap>
            <div>图片体积：{{ (record.picSize / 1024).toFixed(2) }} KB</div>
            <div>图片宽高：{{ record.picWidth }} x {{ record.picHeight }}</div>
            <div>图片宽高比例：{{ record.picScale }}</div>
            <div>图片格式：{{ record.picFormat }}</div>
          </a-space>
        </template>
        <template v-if="column.key === 'tags'">
          <a-space wrap>
            <a-tag v-for="tag in JSON.parse(record.tags)" :key="tag">
              {{ tag }}
            </a-tag>
          </a-space>
        </template>

        <template v-else-if="column.key === 'action'">
          <a-space>
            <a-button type="primary" @click="openUpdate(record.id)">编辑</a-button>
            <a-button type="primary" danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>

  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from "vue";
import {
  deletePictureUsingPost,
  listPagePicturesUsingPost,
  listPictureTagCategoryUsingGet
} from "@/api/pictureController";
import {message} from "ant-design-vue";
import {SearchOutlined, PlusOutlined, LoadingOutlined} from '@ant-design/icons-vue';
import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
import {useRouter} from "vue-router";


const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '图片',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: '图片名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '图片信息',
    dataIndex: 'imgInfo',
    key: 'imgInfo',
  },
  {
    title: '图片简介',
    dataIndex: 'introduction',
    key: 'introduction',
    ellipsis: true,
  },
  {
    title: '图片分类',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '图片标签',
    dataIndex: 'tags',
    key: 'tags',
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
const categoryList = ref<{ value: string; label: string }[]>([])
const tagList = ref<{ value: string; label: string }[]>([])

const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 10,
  searchText: '',
  name: '',
  category: undefined,
  tags: undefined,
})

const fetchData = async () => {
  try {
    const res = await listPagePicturesUsingPost({
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
    const res = await deletePictureUsingPost({id: key});
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

const router = useRouter();
const openAdd = () => {
  router.push({
    path: '/add_picture'
  })
}

const openUpdate = (key) => {
  router.push({
    path: '/add_picture',
    query: {
      id: key
    }
  })
}


const getPictureTagCategoryList = async () => {
  const res = await listPictureTagCategoryUsingGet();
  if (res.data.code === 0 && res.data.data) {
    categoryList.value = res.data.data.categoryList?.map(item => ({
      value: item,
      label: item
    })) || []

    tagList.value = res.data.data.tagList?.map(item => ({
      value: item,
      label: item
    })) || []
  } else {
    message.error("获取数据失败")
  }
}


onMounted(() => {
  fetchData();
  getPictureTagCategoryList();
})

</script>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
