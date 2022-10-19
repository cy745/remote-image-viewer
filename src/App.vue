<script setup>
import {onMounted, ref, watch} from "vue";
import {getList} from "./apis/FileApis.js";
import {baseUrl} from "./main.js";

const pageSizeDefine = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100]

const images = ref([])
const currentPage = ref(1)
const currentPageSize = ref(pageSizeDefine[0])
const currentShowingImages = ref([])

watch([images, currentPage, currentPageSize], ([list, page, size]) => {
  currentShowingImages.value = list.slice((page - 1) * size, page * size)
})

watch(baseUrl, () => {
  getList().then(result => {
    images.value = result.data.map((fileName) => `${baseUrl.value}/static/${fileName}`)
  })
})

onMounted(() => {
  getList().then(result => {
    images.value = result.data.map((fileName) => `${baseUrl.value}/static/${fileName}`)
  })
})
</script>

<template>
  <div>
    <el-container>
      <el-header id="header">
        <el-input v-model="baseUrl" placeholder="Please input"/>
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="currentPageSize"
            :page-sizes="pageSizeDefine"
            :small="false"
            :disabled="false"
            :background="true"
            :layout="'total, sizes, prev, pager, next, jumper'"
            :total="images.length"
        />
      </el-header>
      <el-main id="main">
        <el-space wrap size="small" alignment="center">
          <el-card v-for="(image, index) of currentShowingImages" :key="image">
            <el-image class="image_card" fit="cover"
                      :preview-src-list="currentShowingImages"
                      :initial-index="index"
                      :src="image"
            />
          </el-card>
        </el-space>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 500;
  width: 100%;
}

#main {
  min-height: 100vh;
  padding-top: 64px;
}

.image_card {
  width: 150px;
  height: 150px;
  /*box-shadow: var(--el-box-shadow-dark);*/
}
</style>
