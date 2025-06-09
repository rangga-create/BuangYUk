<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const dropdownOpen = ref(false)
const user = ref(null)
const currentPage = ref(1)
const totalPages = 12

const navItems = ref([
  { name: 'Dashboard', link: '/', active: false },
  { name: 'Home', link: '#', active: false },
  { name: 'Edukasi & Tips', link: '/edukasi', active: false },
  {
    name: 'Tukar Poin',
    link: '/penukaran',
    active: false,
    hasDropdown: true,
    children: [
      { name: 'Form Input Sampah', link: '/input' },
      { name: 'Riwayat Sampah', link: '/riwayat' },
      { name: 'Daftar Bank Sampah', link: '/BankSampah' },
      { name: 'Eco Challenge Mingguan', link: '/EcoChallenge' },
        {name:'penukaran point',link:'/penukaran'}
    ]
  }
])

onMounted(() => {
  const loggedIn = localStorage.getItem('loggedInUser')
  if (loggedIn) {
    try {
      user.value = JSON.parse(loggedIn)
      isLoggedIn.value = true
    } catch (e) {
      console.error('Gagal memuat data user:', e)
      isLoggedIn.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.dropdown-toggle')
  const menu = document.querySelector('.dropdown-menu')
  if (
    dropdown &&
    !dropdown.contains(event.target) &&
    menu &&
    !menu.contains(event.target)
  ) {
    dropdownOpen.value = false
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page
  }
}

const goToLogin = () => {
  router.push('/login')
}
const goToRegister = () => {
  router.push('/register')
}

const tabs = ref([
  { icon: 'reload-outline', label: 'Semua' },
  { icon: 'wallet-outline', label: 'E-Wallet' },
  { icon: 'pricetags-outline', label: 'Voucher Belanja' },
  { icon: 'restaurant-outline', label: 'Produk Rumah Tangga' },
  { icon: 'ticket-outline', label: 'Tiket & Hiburan' },
  { icon: 'gift-outline', label: 'Sembako' }
])

const items = ref([
  { title: 'Saldo OVO Rp 10.000', image: 'https://www.astronauts.id/blog/wp-content/uploads/2022/08/Belanja-di-Astro-Lebih-Hemat-dengan-Promo-OV-1.jpg', point: 2000 },
  { title: 'Voucher Indomaret 20K', image: 'https://filebroker-cdn.lazada.co.id/kf/S9d26f9c5aeb44d15abab1e7664f6e4122.png', point: 2000 },
  { title: 'Tiket Nonton CGV', image: 'https://cdn-www.vinid.net/8e4a8c35-voucher-cgv-4.jpg', point: 2000 },
  { title: 'Minyak Goreng 1L', image: 'https://kecipir.com/blog/wp-content/uploads/2021/11/promo-minyak-goreng.jpg', point: 2000 },
  { title: 'Saldo OVO Rp 10.000', image: 'https://www.astronauts.id/blog/wp-content/uploads/2022/08/Belanja-di-Astro-Lebih-Hemat-dengan-Promo-OV-1.jpg', point: 2000 },
  { title: 'Voucher Indomaret 20K', image: 'https://filebroker-cdn.lazada.co.id/kf/S9d26f9c5aeb44d15abab1e7664f6e4122.png', point: 2000 },
  { title: 'Tiket Nonton CGV', image: 'https://cdn-www.vinid.net/8e4a8c35-voucher-cgv-4.jpg', point: 2000 },
  { title: 'Minyak Goreng 1L', image: 'https://kecipir.com/blog/wp-content/uploads/2021/11/promo-minyak-goreng.jpg', point: 2000 }
])
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white text-black shadow-sm">
      <div class="container mx-auto px-6 md:px-32 py-3 flex items-center justify-between">
        <img src="/src/components/img/Logo.png" alt="Logo" class="w-28 h-8 object-contain" />
        <form class="hidden md:flex w-[850px]" @submit.prevent>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Masukkan nama Kota/kecamatan"
            class="w-full py-2 px-4 rounded-l-md text-sm border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-md transition"
          >
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </form>
     <div v-if="isLoggedIn && user" class="flex items-center gap-3">
  <router-link to="/profil">
    <img
      :src="user.photo || 'https://images.unsplash.com/photo-1572573309811-48474d1891b7?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
      alt="profil"
      class="w-10 h-10 rounded-full object-cover border border-gray-300"
    />
  </router-link>
  <span class="text-sm font-medium text-black truncate max-w-xs">{{ user.name }}</span>
</div>

        <div v-else class="flex gap-3">
          <button @click="goToLogin" class="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition duration-200">Login</button>
          <button @click="goToRegister" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200">Daftar</button>
        </div>
      </div>
    </header>

    <nav class="bg-white shadow">
      <div class="container mx-auto px-4">
        <ul class="flex justify-center items-center space-x-8 py-4 text-sm relative select-none">
          <li v-for="(item, index) in navItems" :key="index" class="relative">
            <template v-if="item.hasDropdown">
              <button @click="toggleDropdown" class="dropdown-toggle flex items-center px-3 py-1 font-medium text-gray-800 hover:text-green-600 transition">
                {{ item.name }}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="dropdownOpen" class="dropdown-menu absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-20">
                <a v-for="(child, cIndex) in item.children" :key="cIndex" :href="child.link" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 whitespace-nowrap">
                  {{ child.name }}
                </a>
              </div>
            </template>
            <template v-else>
              <a :href="item.link" class="px-3 py-1 font-medium text-gray-800 hover:text-green-600 transition">{{ item.name }}</a>
            </template>
          </li>
        </ul>
      </div>
    </nav>

    <div class="py-10 relative h-52">
      <div
        class="absolute inset-0 h-52 bg-cover bg-center"
        style="background-image: url('/src/components/img/penukaran.png');"
      ></div>
    </div>

    <div class="container mx-auto px-4 py-6">
      <div class="bg-green-600 text-white rounded-xl p-4 flex items-center justify-between">
        <div>
          <h2 class="text-4xl mb-4 ml-20 font-bold">Poin Anda Saat Ini: 12.500 Poin</h2>
          <p class="text-sm ml-20 italic">Tukar sekarang sebelum masa berlaku poin habis!</p>
        </div>
        <img src="/src/components/img/daurUlang.png" alt="Recycle" class="h-48" />
      </div>

      <h3 class="text-3xl font-bold mb-10 mt-4">Penukaran Poin BuangYuk</h3>
    </div>

    <div class="container mx-auto px-4">
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          class="border rounded-md px-16 py-2 text-sm hover:bg-green-100 flex items-center gap-2"
        >
          <ion-icon :name="tab.icon"></ion-icon>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="px-4 sm:px-8 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
      <div
        v-for="item in items"
        :key="item.title"
        class="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden"
      >
        <div class="h-40 bg-gray-50 flex items-center justify-center">
          <img :src="item.image" :alt="item.title" class="rounded-md h-full object-contain" />
        </div>
        <div class="p-4">
          <h4 class="text-center font-medium mb-2">{{ item.title }}</h4>
          <div class="text-center">
            <button class="bg-green-600 text-white px-6 py-2 rounded-md text-sm">
              {{ item.point }} poin
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-6 space-x-2 text-sm">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded-full bg-white text-green-600 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1 border rounded-full transition',
          currentPage === page
            ? 'bg-green-600 text-white font-semibold shadow'
            : 'bg-white text-green-600 hover:bg-green-100',
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded-full bg-white text-green-600 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
    </div>

    <footer class="bg-green-700 text-white text-center py-4 mt-10">
      Copyright 2054 My_Tutor | Designed By BuangYuk
    </footer>
  </div>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
