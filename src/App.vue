<script setup>
import {onMounted, ref, watch} from "vue";
import {getList} from "./apis/FileApis.js";
import {throttleFilter, useDark, useLocalStorage} from '@vueuse/core'
import {Sunny, Moon} from '@element-plus/icons-vue'
import {onKeyStroke} from '@vueuse/core'

const isDark = useDark()
const storage = useLocalStorage(
    "App_Screen_Page_Info",
    {page: 1, size: 10},
    {eventFilter: throttleFilter(1000)}
).value

const showingImages = ref([])
const images = ref([])

// 监听列表、页面数据
watch([images, storage], ([list, storage]) => {
  showingImages.value = list.slice((storage.page - 1) * storage.size, storage.page * storage.size)
})

onKeyStroke("ArrowLeft", () => {
  storage.page = Math.max(storage.page - 1, 0)
})

onKeyStroke("ArrowRight", () => {
  storage.page = Math.min(storage.page + 1, Math.ceil(images.value.length / storage.page))
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
              <el-slider style="width: 100px;" size="small" v-model="storage.size" :min="1"
                         :max="100"/>
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
          <el-card class="hover_card" shadow="hover" :body-style="{ padding: '0px', minWidth:'140px'}"
                   v-for="(image, index) of showingImages" :key="image">
            <el-image class="image_card" fit="cover"
                      preview-teleported
                      :preview-src-list="showingImages"
                      :initial-index="index"
                      :src="image">
              <template #placeholder>
                <el-skeleton-item variant="image" style="width: 140px; height: 100%"/>
              </template>
            </el-image>
          </el-card>
        </el-space>
      </el-main>
    </el-container>
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

.hover_card {
  border-radius: 15px;
  transform: scale(1);
  transition: all .3s ease-out;

  &:hover {
    border-radius: 8px;
    transform: scale(1.05);
  }
}

.image_card {
  width: 100%;
  height: 30vh;
  display: block;
  transform: scale(1.1);
  transition: all .3s ease-out;

  &:hover {
    transform: scale(1);
  }
}
</style>
