<template>
  <div class="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col text-center transition hover:shadow-xl">
   
    <img
      :src="img"
      alt="Gambar bank sampah"
      class="w-full h-32 object-cover"
    />


    <div class="p-4 flex flex-col items-center gap-2">
      <h4 class="text-lg font-semibold text-gray-800">{{ label }}</h4>
      <p class="text-sm text-gray-600">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  img: String,
  description: String,
})
</script>
