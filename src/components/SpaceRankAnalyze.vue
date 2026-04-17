<template>
  <div class="space-rank-analyze">
    <a-card title="空间使用排行">
      <v-chart :option="options" style="height: 320px; max-width: 100%;" :loading="loading"/>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import "echarts";
import {spaceUsageRankUsingPost} from "@/api/spaceAnalyzeController";
import {computed, ref, watchEffect} from "vue";
import {message} from "ant-design-vue";

interface Props {
  isAll: boolean
  isPublic: boolean
  spaceId: string
}

const props = withDefaults(defineProps<Props>(), {
  isAll: false,
  isPublic: false,
})

const dataList = ref<API.SpaceRankAnalyzeRequest>([])
const loading = ref<boolean>(false)
const fetchData = async () => {
  loading.value = true
  const res = await spaceUsageRankUsingPost({
    isAll: props.isAll,
    isPublic: props.isPublic,
    spaceId: props.spaceId,
    topN: 10
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
  const spaceNames = dataList.value.map((item) => item.spaceName)
  const usageData = dataList.value.map((item) => (item.totalSize / (1024 * 1024)).toFixed(2)) // 转为 MB

  return {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: spaceNames,
    },
    yAxis: {
      type: 'value',
      name: '空间使用量 (MB)',
    },
    series: [
      {
        name: '空间使用量 (MB)',
        type: 'bar',
        data: usageData,
        itemStyle: {
          color: '#5470C6', // 自定义柱状图颜色
        },
      },
    ],
  }
})


</script>

<style scoped>
</style>
