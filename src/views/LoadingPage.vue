<script setup>
import { ref, onMounted } from 'vue'

// Simulasi loading selesai dalam 3 detik
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 3000) // durasi loading
})
</script>

<template>
  <div v-if="isLoading" class="loading-screen">
    <svg class="recycle-leaf" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <g fill="#4CAF50">

        <path d="M32 0C24 12 24 24 24 32s0 20 8 32c8-12 8-20 8-32s0-20-8-32z" />
        <path d="M0 32c12 8 20 8 32 8s20 0 32-8c-12-8-20-8-32-8s-20 0-32 8z" />
        <path d="M32 64c8-12 8-20 8-32s0-20-8-32c-8 12-8 20-8 32s0 20 8 32z" opacity="0.5"/>
      </g>
    </svg>
  </div>

  <div v-else class="content">
    <h1 class="italic" >BuangYuk 🍃</h1>
         
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  background: #e8f5e9;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.recycle-leaf {
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: xx-large;
 color: #4CAF50;
 background-color: #e8f5e9;
  font: bold;
  font-family: sans-serif;
}
</style>
