<script setup>
import {onMounted, ref, watch} from "vue";
import {getList} from "./apis/FileApis.js";
import {onKeyStroke, useDark, useLocalStorage} from '@vueuse/core'
import {Moon, Sunny} from '@element-plus/icons-vue'
import ImageCard from "./components/ImageCard.vue";

const isDark = useDark()
const storage = useLocalStorage(
    "App_Screen_Page_Info",
    {page: 1, size: 10}
).value

const showingImages = ref([])
const images = ref([])
const imageCardHeight = ref(200)
const previewIndex = ref(-1)

const previewImage = (index) => {
  previewIndex.value = index
}

// 监听列表、页面数据
watch([images, storage], ([list, storage]) => {
  showingImages.value = list.slice((storage.page - 1) * storage.size, storage.page * storage.size)
})

onKeyStroke("ArrowLeft", () => {
  if (previewIndex.value >= 0) return
  storage.page = Math.max(storage.page - 1, 0)
})

onKeyStroke("ArrowRight", () => {
  if (previewIndex.value >= 0) return
  storage.page = Math.min(storage.page + 1, Math.ceil(images.value.length / storage.size))
})

onMounted(() => {
  getList().then(result => {
    images.value = result.data.map((fileName) => `/static/${fileName}`).reverse()
  })
})
</script>

<template>
  <div>
    <el-container>
      <el-header id="header">
        <el-pagination
            v-model:currentPage="storage.page"
            v-model:page-size="storage.size"
            :total="images.length"
            :small="false"
            :disabled="false"
            :background="true"
            :layout="'slot, prev, pager, next'"
        >
          <template #default>
            <div style="display: flex; justify-content: center;align-items: center;gap: 20px; margin-right: 20px">
              <span>{{ storage.size }} 张/页</span>
              <el-slider style="width: 100px;" size="small" :min="1" :max="100" v-model="storage.size"/>
            </div>
          </template>
        </el-pagination>
        <el-switch
            v-model="isDark"
            class="mt-2"
            style="margin-left: 24px"
            :inline-prompt="false"
            :active-icon="Moon"
            :inactive-icon="Sunny"
        />
      </el-header>
      <el-main id="main">
        <el-space wrap size="large" alignment="center">
          <ImageCard v-for="(image, index) of showingImages" :key="image"
                     :image-url="image"
                     :height="imageCardHeight"
                     @click="previewImage(index)"/>
        </el-space>
      </el-main>
    </el-container>

    <el-image-viewer v-if="previewIndex >= 0" @close="previewImage(-1)"
                     :initial-index="previewIndex" :url-list="showingImages"/>
  </div>
</template>

<style scoped lang="less">
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 500;
  width: 100%;
  backdrop-filter: saturate(50%) blur(8px);

  .dark & {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

#main {
  min-height: 100vh;
  padding-top: 72px;
}
</style>
