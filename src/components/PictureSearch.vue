<template>
  <div class="pictureSearch">
    <a-form
      layout="inline"
      :model="searchParams"
      style="margin-bottom: 16px"
    >
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
      <a-form-item label="图片名称">
        <a-input v-model:value="searchParams.name" placeholder="请输入图片名称" allow-clear/>
      </a-form-item>
      <a-form-item label="图片介绍">
        <a-input v-model:value="searchParams.introduction" placeholder="请输入图片介绍" allow-clear/>
      </a-form-item>
      <a-form-item label="图片宽度">
        <a-input-number min="1" style="width: 158px" v-model:value="searchParams.picWidth" placeholder="请输入图片宽度"/>
      </a-form-item>
      <a-form-item label="图片高度">
        <a-input-number min="1" style="width: 158px" v-model:value="searchParams.picHeight" placeholder="请输入图片高度"/>
      </a-form-item>
      <a-form-item label="图片格式">
        <a-select style="width: 158px" v-model:value="searchParams.picFormat" placeholder="请选择图片格式">
          <a-select-option value="png">png</a-select-option>
          <a-select-option value="jpg">jpg</a-select-option>
          <a-select-option value="webp">webp</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="图片修改时间">
        <a-range-picker
          style="width: 400px"
          show-time
          format="YYYY/MM/DD HH:mm:ss"
          :placeholder="['编辑开始时间', '编辑结束时间']"
          v-model:value="dateRange"
          :presets="rangePresets"
          @change="onRangeChange"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit" @click="handleSearch">
            <SearchOutlined/>
            搜索
          </a-button>
          <a-button type="default" html-type="reset" @click="handleReset">
            重置
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {listPictureTagCategoryUsingGet} from "@/api/pictureController";
import {message} from "ant-design-vue";
import {SearchOutlined} from '@ant-design/icons-vue';
import {RangeValue} from "ant-design-vue/es/vc-picker/interface";
import dayjs from "dayjs";

interface Props {
  onSearch: () => void
}

const props = defineProps<Props>()

const categoryList = ref<{ value: string; label: string }[]>([])
const tagList = ref<{ value: string; label: string }[]>([])
const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  searchText: '',
  name: '',
  category: undefined,
  tags: undefined,
  introduction: '',
  picWidth: undefined,
  picHeight: undefined,
  picFormat: undefined,
  editStartTime: undefined,
  editEndTime: undefined
})
const dateRange = ref<RangeValue<any>>([])

const handleSearch = () => {
  searchParams.current = 1;
  props.onSearch?.(searchParams)
}

const handleReset = () => {
  searchParams.current = 1;
  searchParams.searchText = '';
  searchParams.name = '';
  searchParams.category = undefined;
  searchParams.tags = undefined;
  searchParams.introduction = '';
  searchParams.picWidth = undefined;
  searchParams.picHeight = undefined;
  searchParams.picFormat = undefined;
  searchParams.editStartTime = undefined;
  searchParams.editEndTime = undefined;
  dateRange.value = []
  props.onSearch?.(searchParams)
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

const onRangeChange = (dates: RangeValue<any>, dateStrings: string[]) => {
  if (dates) {
    searchParams.editStartTime = dates[0]
    searchParams.editEndTime = dates[1]
  } else {
    searchParams.editStartTime = undefined
    searchParams.editEndTime = undefined
  }
};

const rangePresets = ref([
  {label: '过去7天', value: [dayjs().add(-7, 'd'), dayjs()]},
  {label: '过去14天', value: [dayjs().add(-14, 'd'), dayjs()]},
  {label: '过去30天', value: [dayjs().add(-30, 'd'), dayjs()]},
  {label: '过去90天', value: [dayjs().add(-90, 'd'), dayjs()]},
]);

onMounted(() => {
  getPictureTagCategoryList()
})
</script>
<style scoped>

.pictureSearch :deep(.ant-form-item){
  margin-top: 16px;
  margin-left: 16px;
}
</style>
