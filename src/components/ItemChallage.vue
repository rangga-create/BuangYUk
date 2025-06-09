
<template>
  <div class="bg-green-100 p-4 rounded">
    <div class="flex items-center justify-between">
      <span class="font-semibold">{{ label }}</span>
      <span v-if="progress === 100" class="text-green-600 font-bold"><ion-icon name="checkmark-done-outline" class="text-[#43A55D]"></ion-icon></span>
    </div>
    <div class="h-2 bg-green-200 rounded mt-2">
      <div :style="{ width: progress + '%' }" class="h-2 bg-[#43A55D] rounded transition-all duration-300"></div>
    </div>
    <p class="text-sm mt-1 text-gray-700">{{ completed }} item terkumpul</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  progress: Number,
  completed: String
});
</script>
