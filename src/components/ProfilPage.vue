<template>
  <div
    class="flex items-center gap-3 p-4 hover:bg-green-100 cursor-pointer"
    @click="$emit('click')"
  >
    <i :class="['fas', icon, 'text-green-600', 'w-5']"></i>
    <span class="text-sm font-medium">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  text: String,
})
</script>
