<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  router.push('/Login')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-900 px-4">

    <svg class="w-24 h-24 mb-6 animate-spin-slow" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <g fill="#388e3c">
        <path d="M32 0C24 12 24 24 24 32s0 20 8 32c8-12 8-20 8-32s0-20-8-32z" />
        <path d="M0 32c12 8 20 8 32 8s20 0 32-8c-12-8-20-8-32-8s-20 0-32 8z" />
        <path d="M32 64c8-12 8-20 8-32s0-20-8-32c-8 12-8 20-8 32s0 20 8 32z" opacity="0.5"/>
      </g>
    </svg>


    <h1 class="text-4xl font-extrabold mb-2">Selamat Datang di <span class="italic"> BuangYuk </span> </h1>
    <p class="text-lg text-center max-w-md mb-6">
      Mari kita jaga bumi dengan mendaur ulang dan mengurangi limbah. Setiap tindakan kecil membawa perubahan besar! 🌱
    </p>


    <button
      @click="logout"
      class="w-[120px] bg-red-600 p-3 text-white text-lg font-semibold rounded hover:bg-red-700 transition">
      Logout
    </button>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}
</style>
