<template>
  <div class="space-usage-analyze">
    <a-flex gap="middle">
      <a-card title="存储空间" style="width: 50%">
        <div style="height: 160px; text-align: center">
          <h3>{{ formatFileSize(spaceUsage?.usedSize) }} /
            {{ spaceUsage?.maxSize ? formatFileSize(spaceUsage?.maxSize) : '无限制' }}</h3>
          <a-progress type="dashboard" :percent="spaceUsage?.sizeUsageRatio ?? 0"/>
        </div>
      </a-card>
      <a-card title="图片数量" style="width: 50%">
        <div style="height: 160px; text-align: center">
          <h3>{{ spaceUsage?.usedCount }} / {{ spaceUsage?.maxCount ?? '无限制' }} </h3>
          <a-progress type="dashboard" :percent="spaceUsage?.countUsageRatio ?? 0"/>
        </div>
      </a-card>
    </a-flex>
  </div>
</template>

<script setup lang="ts">

import {spaceUsageUsingPost} from "@/api/spaceAnalyzeController";
import {onMounted, ref, watchEffect} from "vue";
import {message} from "ant-design-vue";
import {formatFileSize} from "@/utills";

interface Props {
  isAll: boolean
  isPublic: boolean
  spaceId: string
}

const props = withDefaults(defineProps<Props>(), {
  isAll: false,
  isPublic: false,
})

const spaceUsage = ref<API.SpaceUsageAnalyzeResponse>()
const loading = ref<boolean>(false)
const fetchData = async () => {
  loading.value = true
  const res = await spaceUsageUsingPost({
    isAll: props.isAll,
    isPublic: props.isPublic,
    spaceId: props.spaceId
  })
  if (res.data.code === 0 && res.data.data) {
    spaceUsage.value = res.data.data
  } else {
    message.error("获取数据错误：" + res.data.message)
  }
  loading.value = false
}

watchEffect(() => {
  fetchData()
})
</script>

<style scoped>
.space-usage-analyze{
  margin-bottom: 16px;
}
</style>
