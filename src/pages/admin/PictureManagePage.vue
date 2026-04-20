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
          + 新增
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" href="/batch_add_picture" target="_blank" ghost>
          + 批量增加
        </a-button>
      </a-form-item>
    </a-form>
    <a-tabs v-model:activeKey="searchParams.reviewStatus" @change="onTabChange">
      <a-tab-pane key="all" tab="全部"></a-tab-pane>
      <a-tab-pane v-for="status in statusList" :key="status.value" :tab="status.label"></a-tab-pane>
    </a-tabs>
    <a-table :columns="columns" :data-source="dataList" :pagination="pagination" @change="doTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'url'">
          <a-image :src="record.thumbnailUrl?? record.url" alt="图片" style="height: 50px"/>
        </template>
        <template v-if="column.key === 'imgInfo'">
          <a-space wrap>
            <div>图片体积：{{ formatFileSize(record.picSize) }}</div>
            <div>图片宽高：{{ record.picWidth }} x {{ record.picHeight }}</div>
            <div>图片宽高比例：{{ record.picScale }}</div>
            <div>图片格式：{{ record.picFormat }}</div>
          </a-space>
        </template>
        <template v-if="column.key === 'reviewInfo'">
          <a-space wrap>
            <div>审核状态：{{ getReviewStatusText(record.reviewStatus) }}</div>
            <div>审核意见：{{ record.reviewMessage }}</div>
            <div>审核人：{{ record.reviewerId }}</div>
            <div v-if="record.reviewStatus !==  ReviewStatusEnum.PENDING">审核时间：{{ record.reviewTime }}</div>
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
          <a-space wrap>
            <a-button v-if="record.reviewStatus !==  ReviewStatusEnum.PASS" type="link" @click="doReview(record.id)">
              审核
            </a-button>
            <a-button v-if="record.reviewStatus ===  ReviewStatusEnum.PASS" danger type="link"
                      @click="doRefuse(record.id)">
              拒绝
            </a-button>
            <a-button type="link" @click="openUpdate(record.id)">编辑</a-button>
            <a-button type="link" danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="审核信息" @ok="handleReview">
      <a-form
        layout="horizontal"
        :model="reviewInfo"
        style="margin-bottom: 16px"
      >
        <a-form-item name="reviewStatus" label="审核状态">
          <a-radio-group v-model:value="reviewInfo.reviewStatus">
            <a-radio v-for="status in statusOptions"
                     :key="status.value" :value="status.value" :label="status.label">
              {{ status.label }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="reviewMessage" label="审核意见">
          <a-textarea v-model:value="reviewInfo.reviewMessage" placeholder="请输入审核意见" rows="4"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from "vue";
import {
  deletePictureUsingPost,
  listPagePicturesUsingPost,
  listPictureTagCategoryUsingGet, reviewPictureUsingPost
} from "@/api/pictureController";
import {message} from "ant-design-vue";
import {SearchOutlined, PlusOutlined, LoadingOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {
  getReviewStatusText,
  ReviewStatusEnum,
  getReviewStatusOptions
} from "@/utills/ReviewStatus";
import {formatFileSize} from "@/utills";


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
    title: '审核信息',
    dataIndex: 'reviewInfo',
    key: 'reviewInfo',
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
  reviewStatus: undefined
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

const visible = ref<Boolean>(false);
const statusOptions = computed(() => {
  return getReviewStatusOptions().filter(item => item.value !== ReviewStatusEnum.PENDING);
})
const reviewInfo = reactive<API.PictureReviewRequest>({
  id: undefined,
  reviewStatus: ReviewStatusEnum.PASS,
  reviewMessage: '',
})

const resetReviewInfo = () => {
  reviewInfo.id = undefined;
  reviewInfo.reviewStatus = ReviewStatusEnum.PASS;
  reviewInfo.reviewMessage = '';
}

const doReview = async (id) => {
  resetReviewInfo()
  if (!id) {
    return
  }
  visible.value = true;
  reviewInfo.id = id;
}

const doRefuse = async (id) => {
  reviewInfo.id = id;
  reviewInfo.reviewStatus = ReviewStatusEnum.REFUSE;
  reviewInfo.reviewMessage = '审核未通过';
  await handleReview()
}

const handleReview = async () => {
  try {
    const res = await reviewPictureUsingPost(reviewInfo)
    if (res.data.code === 0) {
      message.success("审核成功")
      visible.value = false;
      await fetchData();
    } else {
      message.error("审核失败")
    }
  } catch (e) {
    message.error("审核失败", e)
  }
}


const statusList = computed(() => {
  return getReviewStatusOptions();
})

const onTabChange = (key) => {
  searchParams.reviewStatus = key === 'all' ? undefined : key;
  handleSearch();
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
