<script setup>
import {onMounted, ref, watch} from "vue";
import {getList} from "./apis/FileApis.js";

const pageSizeDefine = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100]

const images = ref([])
const currentPage = ref(1)
const currentPageSize = ref(pageSizeDefine[0])
const currentShowingImages = ref([])

watch([images, currentPage, currentPageSize], ([list, page, size]) => {
  currentShowingImages.value = list.slice((page - 1) * size, page * size)
})

onMounted(() => {
  getList().then(result => {
    images.value = result.data.map((fileName) => `/api/static/${fileName}`)
  })
})
</script>

<template>
  <div>
    <el-container>
      <el-header id="header">
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="currentPageSize"
            :page-sizes="pageSizeDefine"
            :small="false"
            :disabled="false"
            :background="false"
            :layout="'total, sizes, prev, pager, next, jumper'"
            :total="images.length"
        />
      </el-header>
      <el-main>
        <el-image v-for="(image, index) of currentShowingImages" :key="image"
                  style="width: 100px; height: 100px"
                  :preview-src-list="currentShowingImages"
                  :initial-index="index"
                  fit="cover"
                  :src="image"
        />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
#header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
