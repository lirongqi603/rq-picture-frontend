<template>
  <div class="space-size-analyze">
    <a-card title="空间图片大小占用分析">
      <v-chart :option="options" style="height: 320px; max-width: 100%;" :loading="loading"/>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import "echarts";
import {spaceImageSizeUsingPost} from "@/api/spaceAnalyzeController";
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

const dataList = ref<API.SpaceSizeAnalyzeResponse>([])
const loading = ref<boolean>(false)
const fetchData = async () => {
  loading.value = true
  const res = await spaceImageSizeUsingPost({
    isAll: props.isAll,
    isPublic: props.isPublic,
    spaceId: props.spaceId
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
  const pieData = dataList.value.map((item) => ({
    name: item.sizeRange,
    value: item.count,
  }))

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      top: 'bottom',
    },
    series: [
      {
        name: '图片大小',
        type: 'pie',
        radius: '50%',
        data: pieData,
      },
    ],
  }
})


</script>

<style scoped>
</style>
