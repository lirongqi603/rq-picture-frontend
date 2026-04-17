<template>
  <div id="spaceAnalyzePage">
    <h2>
      空间图库分析-
      <span v-if="isAll">全部图库</span>
      <span v-else-if="isPublic">公共图库</span>
      <span v-else>私有图库：<a :href="'/space/'+spaceId" target="_blank">{{ spaceId }}</a></span>
    </h2>
    <div>父组件 isAll 值：{{ isAll }}</div>
    <SpaceUsageAnalyze :isAll="isAll" :isPublic="isPublic" :spaceId="spaceId"/>
    <a-row :gutter="[16,16]">
      <a-col :xs="24" :md="12">
        <SpaceCategoryAnalyze :isAll="isAll" :isPublic="isPublic" :spaceId="spaceId"/>
      </a-col>
      <a-col :xs="24" :md="12">
        <SpaceTagAnalyze :isAll="isAll" :isPublic="isPublic" :spaceId="spaceId"/>
      </a-col>
      <a-col :xs="24" :md="12">
        <SpaceSizeAnalyze :isAll="isAll" :isPublic="isPublic" :spaceId="spaceId"/>
      </a-col>
      <a-col :xs="24" :md="12">
        <SpaceUserAnalyze :isAll="isAll" :isPublic="isPublic" :spaceId="spaceId" :isAdmin="isAdmin"/>
      </a-col>
      <a-col :xs="24" :md="12">
        <SpaceRankAnalyze v-if="isAdmin" :isAll="isAll" :isPublic="isPublic" :spaceId="spaceId"/>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import SpaceUsageAnalyze from "@/components/SpaceUsageAnalyze.vue";
import SpaceCategoryAnalyze from "@/components/SpaceCategoryAnalyze.vue";
import SpaceTagAnalyze from "@/components/SpaceTagAnalyze.vue";
import SpaceSizeAnalyze from "@/components/SpaceSizeAnalyze.vue";
import SpaceUserAnalyze from "@/components/SpaceUserAnalyze.vue";
import SpaceRankAnalyze from "@/components/SpaceRankAnalyze.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {useLoginUserStore} from "@/stores/useLoginUserStore";

const route = useRoute();

console.log(route.query?.isAll)
console.log(!!route.query?.isAll)
const isAll = computed(() => {
  return !!route.query?.isAll;
})
const isPublic = computed(() => {
  return !!route.query?.isPublic;
})
const spaceId = computed(() => {
  return route.query?.spaceId;
})
const loginUserStore = useLoginUserStore();
const loginUser = loginUserStore.loginUser;
const isAdmin = computed(() => {
  return loginUser?.userRole === 'admin'
})
</script>

<style scoped>

</style>
