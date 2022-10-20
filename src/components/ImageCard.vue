<script setup>
const emitter = defineEmits(['click'])
const props = defineProps({imageUrl: String})

</script>

<template>
  <div class="h-32 aspect-square rounded-2xl pointer scale-100
            transition duration-300 ease-out cursor-pointer overflow-hidden
            hover:scale-105"
       @click="emitter('click')">
    <el-image class="scale-110 hover:scale-100 transition duration-300 ease-out"
              :src="imageUrl" fit="cover">
      <template #placeholder>
        <el-skeleton-item variant="image" style="height: 100%"/>
      </template>
    </el-image>
  </div>
</template>

<style scoped lang="less">
.hover_card {
  border-radius: 15px;
  transform: scale(1.0);
  transition: all .3s ease-out;

  &:hover {
    border-radius: 8px;
    transform: scale(1.05);
  }
}

.image_card {
  cursor: pointer;
  display: block;
  width: 100%;
  height: var(--imageCardHeight);
  min-width: calc(var(--imageCardHeight) * 0.618);
  filter: blur(5px) brightness(1.1);
  transform: scale(1.1);
  transition: all .3s ease-out;

  &:hover {
    filter: blur(0px) brightness(1);
    transform: scale(1);
  }
}
</style>