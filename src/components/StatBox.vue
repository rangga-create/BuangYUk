<template>
  <div :class="['text-white text-center px-6 py-4 rounded-lg shadow', color]">
    <div class="text-2xl font-bold">{{ value }}</div>
    <div class="text-sm">{{ label }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  color: String
})
</script>
