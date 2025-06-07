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
    class="bg-white rounded-xl shadow p-6 flex items-center gap-6"
    :class="reverse ? 'flex-row-reverse text-left' : 'flex-row text-left'"
  >
    <img :src="img" alt="icon" class="w-16 h-16" />
    <div>
      <h3 class="font-bold text-lg mb-2">{{ title }}</h3>
      <p class="text-sm text-gray-700">{{ text }}</p>
    </div>
  </div>
</template>

