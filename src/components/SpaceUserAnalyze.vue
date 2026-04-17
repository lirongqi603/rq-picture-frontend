<template>
  <div class="space-user-analyze">
    <a-card title="空间图片用户分析">
      <v-chart :option="options" style="height: 320px; max-width: 100%;" :loading="loading"/>
      <template #extra>
        <a-segmented v-model:value="timeDimension" :options="timeDimensionOptions"/>
        <a-input-search v-if="props.isAdmin" placeholder="请输入用户 id" enter-button="搜索用户" @search="doSearch"/>
      </template>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import "echarts";
import {userUploadBehaviorUsingPost} from "@/api/spaceAnalyzeController";
import {computed, ref, watchEffect} from "vue";
import {message} from "ant-design-vue";

interface Props {
  isAll: boolean
  isPublic: boolean
  spaceId: string,
  isAdmin: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isAll: false,
  isPublic: false,
  isAdmin: false
})

const userId = ref<string>()
const timeDimension = ref<string>('day')
const timeDimensionOptions = [
  {
    label: '日',
    value: 'day',
  },
  {
    label: '周',
    value: 'week',
  },
  {
    label: '月',
    value: 'month',
  },
]
const doSearch = (value: string) => {
  userId.value = value
}


const dataList = ref<API.SpaceCategoryAnalyzeResponse>([])
const loading = ref<boolean>(false)
const fetchData = async () => {
  loading.value = true
  const res = await userUploadBehaviorUsingPost({
    isAll: props.isAll,
    isPublic: props.isPublic,
    spaceId: props.spaceId,
    timeDimension: timeDimension.value,
    userId: userId.value
  })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data ?? []
  } else {
    message.error("获取数据错误：" + res.data.message)
  }
  loading.value = false
}

watchEffect(() => {
  fetchData()
})
const options = computed(() => {
  const periods = dataList.value.map((item) => item.period) // 时间区间
  const counts = dataList.value.map((item) => item.count) // 上传数量

  return {
    tooltip: {trigger: 'axis'},
    xAxis: {type: 'category', data: periods, name: '时间区间'},
    yAxis: {type: 'value', name: '上传数量'},
    series: [
      {
        name: '上传数量',
        type: 'line',
        data: counts,
        smooth: true, // 平滑折线
        emphasis: {
          focus: 'series',
        },
      },
    ],
  }
})


</script>

<style scoped>
</style>
