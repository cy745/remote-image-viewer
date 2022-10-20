<script setup>
const emitter = defineEmits(['click'])
const props = defineProps({
  imageUrl: String,
  height: {
    type: Number,
    default: 100
  }
})
</script>

<template class="template-container">
  <div class="image_container rounded-2xl pointer scale-100
            transition duration-500 ease cursor-pointer overflow-hidden
            hover:scale-105 active:scale-95 active:duration-100 active:ease-in-out"
       @click="emitter('click')">
    <el-image class="scale-110 hover:scale-100 transition duration-500 ease block"
              :style="{height:`${ height }px`,minWidth:`${ height * 0.618 }px`}"
              :src="imageUrl" fit="cover">
      <template #placeholder>
        <el-skeleton-item variant="image" style="height: 100%;width: 100%"/>
      </template>
    </el-image>
  </div>
</template>

<style scoped lang="less">
.image_container {
  --image-container-border1-color: black;
  --image-container-border2-color: white;

  .dark & {
    --image-container-border1-color: white;
    --image-container-border2-color: black;
  }

  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px var(--image-container-border2-color), 0 0 0 5px var(--image-container-border1-color);
  }
}
</style>