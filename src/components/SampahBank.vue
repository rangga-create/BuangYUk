<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  bank: {
    type: Object,
    required: true
  }
})

function handleClick() {
  alert(`Klik detail: ${props.bank.name}`)
}
</script>


<template>
  <div
    class="bg-white rounded-lg shadow-lg mb-24 p-4 flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    @click="handleClick"
  >
    <img
      :src="bank.image"
      alt="Bank Sampah"
      class="w-full h-40 object-cover rounded-lg mb-4"
      loading="lazy"
    />
    <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate">{{ bank.name }}</h3>
    <p class="text-sm text-gray-500 mb-1 flex items-center gap-2">
      <svg
        class="w-4 h-4 text-green-500"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
      {{ bank.operationalHours }}
    </p>
    <p class="text-sm text-gray-600 mb-4 flex items-center gap-2">
      <svg
        class="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M17 21v-2a4 4 0 00-3-3.87" />
        <path d="M9 21v-2a4 4 0 013-3.87" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      {{ bank.address }}
    </p>
    <button
      @click.stop="handleClick"
      class="mt-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors"
    >
      Lihat Detail
    </button>
  </div>
</template>



<style scoped>
div:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}
</style>
