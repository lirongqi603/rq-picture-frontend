<template>
  <div id="homePage">
    <div class="search-bar">
      <a-input-search
        v-model:value="searchParams.searchText"
        placeholder="请输入关键字"
        enter-button="搜索"
        size="large"
        @search="onSearch"
      />
    </div>
    <div class="filter-bar">
      <!-- 分类筛选-->
      <a-tabs v-model:active-key="selectedCategory" @change="onSearch">
        <a-tab-pane key="all" tab="全部"></a-tab-pane>
        <a-tab-pane v-for="category in categoryList" :key="category" :tab="category"></a-tab-pane>
      </a-tabs>
      <!-- 标签筛选-->
      <div class="tag-bar">
        <span :style="{ marginRight: '8px' }">标签:</span>
        <template v-for="tag in tagList" :key="tag">
          <a-checkable-tag
            :checked="selectedTags.indexOf(tag) > -1"
            @change="checked => handleChange(tag, checked)"
          >
            {{ tag }}
          </a-checkable-tag>
        </template>
      </div>
    </div>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :data-source="data"
            :pagination="pagination" :loading="loading">
      <template #renderItem="{ item : picture}">
        <a-list-item style="padding: 0">
          <a-card hoverable style="width: 240px;" @click="doClickPicture(picture)">
            <template #cover>
              <img :alt="picture.name" :src="picture.thumbnailUrl ?? picture.url"
                   style="height: 180px;object-fit: cover;"/>
            </template>
            <a-card-meta :title="picture.name">
              <template #description>
                <a-flex>
                  <a-tag color="green">{{ picture.category ? picture.category : '默认' }}</a-tag>
                  <a-tag v-for="tag in picture.tags" :key="tag">{{ tag }}</a-tag>
                </a-flex>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {listPagePictureVosUsingPost, listPictureTagCategoryUsingGet} from "@/api/pictureController";
import {useRouter} from "vue-router";

const data = ref<API.PictureVo[]>([])
const total = ref(0);
const loading = ref(false);
const categoryList = ref<string[]>([])
const tagList = ref<string[]>([])
const selectedCategory = ref<string>('all')
const selectedTags = ref<string[]>([])


const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 12,
  searchText: '',
  name: '',
  category: '',
  tags: [],
})

const fetchData = async () => {
  loading.value = true;
  const res = await listPagePictureVosUsingPost({
    ...searchParams
  })
  if (res.data.code === 0) {
    data.value = res.data.data.records
    total.value = res.data.data.total
  }
  loading.value = false;
}

const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: total.value,
    onChange: (page: number, pageSize: number) => {
      searchParams.current = page;
      searchParams.pageSize = pageSize;
      fetchData();
    }
  }
})

const getPictureTagCategoryList = async () => {
  const res = await listPictureTagCategoryUsingGet();
  if (res.data.code === 0 && res.data.data) {
    categoryList.value = res.data.data.categoryList ?? []
    tagList.value = res.data.data.tagList ?? []
  }
}

const handleChange = (tag: string, checked: boolean) => {
  if (checked) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
  }
  searchParams.tags = selectedTags.value;
  onSearch();
};

onMounted(() => {
  fetchData()
  getPictureTagCategoryList()
})


const onSearch = () => {
  searchParams.current = 1;
  searchParams.category = selectedCategory.value === 'all' ? undefined : selectedCategory.value;
  fetchData();
}

const router = useRouter();

const doClickPicture = (picture: API.PictureVo) => {
  router.push({
    path: `/picture/${picture.id}`
  })
}
</script>
<style scoped>
#homePage {
}

#homePage .search-bar {
  width: 720px;
  margin: 0 auto 20px;
}

#homePage .filter-bar .tag-bar {
  margin-bottom: 20px;
}
</style>
