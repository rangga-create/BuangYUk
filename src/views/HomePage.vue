<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

function navigateTo(path) {
  router.push(path)
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col font-sans text-gray-800 relative bg-cover bg-center bg-no-repeat"
    :style="{
      backgroundImage: `url('https://images.unsplash.com/photo-1681371082908-e2c77d3de093?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlY3lsZXxlbnwwfHwwfHx8MA%3D%3D')`,
      filter: 'brightness(0.6) saturate(0.7)'
    }"
  >

    <div class="absolute inset-0  bg-opacity-60 backdrop-blur-sm pointer-events-none"></div>

    <header class="flex justify-around items-center p-6 sticky top-0 z-30 bg-transparent">
   <nav class="flex space-x-24 text-md font-semibold">
  <a
    href="/Home"
    class="relative text-emerald-200 hover:text-emerald-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-emerald-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
  >
    Home
  </a>
  <a
    href="/"
    class="relative text-emerald-200 hover:text-emerald-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-emerald-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
  >
    Dashboard
  </a>
  <a
    href="/edukasi"
    class="relative text-emerald-200 hover:text-emerald-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-emerald-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
  >
    Edukasi
  </a>
  <a
    href="/#tentang-kami"
    class="relative text-emerald-200 hover:text-emerald-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-emerald-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
  >
    About Us
  </a>
</nav>

      <div class="relative">
         <form class="hidden md:flex w-[850px]" @submit.prevent>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Masukkan kata kunci"
            class="w-full py-2 px-4 rounded-l-md text-sm border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <button type="submit" class="bg-[#43A55D] hover:bg-green-600 text-white px-4 rounded-r-md transition">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </form>
      </div>
    </header>

    <main class="flex flex-col flex-grow justify-center px-6 md:px-16 py-12 relative z-10">
      <div class="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16 mb-16">

        <div class="flex-1 text-left max-w-xl">
          <h1 class="text-5xl font-extrabold text-emerald-200 mb-4 leading-tight">
            ENJOY <br> <span class="text-emerald-400 italic"> BuangYuk</span>
          </h1>
          <div class="h-1 w-24 bg-emerald-400 mb-6 rounded"></div>
          <p class="text-emerald-100 text-lg mb-8 leading-relaxed">
            Tingkatkan kesadaran lingkunganmu mulai dari memilah sampah dengan benar hingga memahami
            dampak nyata dari daur ulang terhadap bumi kita.
          </p>
          <button
            @click="navigateTo('/')"
            class="bg-emerald-400 hover:bg-emerald-500 text-white py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Learn More
          </button>
        </div>

        <div class="flex-1 max-w-xl ml-12">
          <img
            src="https://images.unsplash.com/photo-1681371082908-e2c77d3de093?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlY3lsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Nature Illustration"
            class="rounded-2xl shadow-lg w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>
      </div>

      <footer class="flex justify-center md:justify-end py-8 px-6 rounded-lg mt-32 relative z-10">
        <div class="flex items-center space-x-10 text-3xl text-emerald-200">
          <a href="#" aria-label="Facebook" class="hover:text-emerald-300 transition duration-300 transform hover:scale-110">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-emerald-300 transition duration-300 transform hover:scale-110">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
          <a href="#" aria-label="Instagram" class="hover:text-emerald-300 transition duration-300 transform hover:scale-110">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </div>
      </footer>
    </main>
  </div>
</template>

