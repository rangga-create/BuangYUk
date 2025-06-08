<script setup>
defineProps({
  title: String,
  text: String,
  img: String,
  reverse: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="flex items-center gap-10 mb-[150px]"
    :class="reverse ? 'flex-row-reverse text-left' : 'flex-row text-left'"
  >
 
    <div class="relative w-[250px] h-[300px] rounded-4xl">
      <img
        :src="img"
        alt="icon"
        class="w-full h-full object-cover rounded-4xl relative z-10"
      />

      <div class="border-miring absolute top-2 left-2 w-full h-full rounded-4xl z-0"></div>
    </div>

    <div>
      <h3 class="font-bold text-2xl mb-8">{{ title }}</h3>
      <p class="text-sm text-gray-700">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.border-miring {
  border: 4px solid #4caf50;
  transform: skew(-15deg);
  box-sizing: border-box;
}
</style>
