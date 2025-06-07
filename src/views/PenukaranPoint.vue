<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'


const dropdownOpen = ref(false)

const navItems = ref([
  { name: 'Dashboard', link: '#', active: false },
  { name: 'Home', link: '#', active: false },
  { name: 'Edukasi & Tips', link: '#', active: false },
  {
    name: 'Tukar Poin',
    link: '#',
    active: false,
    hasDropdown: true,
    children: [
      { name: 'Form Input Sampah', link: '#' },
      { name: 'Riwayat Sampah', link: '#' },
      { name: 'Daftar Bank Sampah', link: '#' },
      { name: 'Eco Challenge Mingguan', link: '#' }
    ]
  }
])

const toggleDropdown2 = () => {
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

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const currentPage = ref(1)
const totalPages = 12

function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page
  }
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

    <header class="bg-white text-black">
      <div class="container mx-auto px-32 py-3 flex items-center justify-between">
        <div class="flex items-center">
          <img
            src="/src/components/img/Logo.png"
            alt="Logo"
            class="w-28 h-8 mr-3 object-cover"
          />
        </div>

        <div class="flex-1 flex justify-center">
          <form class="w-[850px] flex">
            <input
              type="text"
              placeholder="Masukkan nama Kota/kecamatan"
              class="w-full py-2 px-4 rounded-l-md text-gray-800 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            />
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-md flex items-center justify-center"
              aria-label="Search"
            >
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </form>
        </div>

        <div class="w-24">
          <div class="flex items-center">
            <img
              src="https://th.bing.com/th/id/OIP.7FsDgas0kcH0W1ajb1rZEgHaHa?rs=1&pid=ImgDetMain"
              alt="profil"
              class="w-10 h-10 object-cover"
            />
          </div>
        </div>
      </div>
    </header>


    <nav class="bg-white shadow">
      <div class="container mx-auto px-4">
        <ul class="flex justify-center items-center space-x-14 py-4 text-sm relative">
          <li v-for="(item, index) in navItems" :key="index" class="relative">
            <div v-if="item.hasDropdown">
              <button
                @click="toggleDropdown2"
                class="dropdown-toggle flex items-center px-3 py-1 rounded hover:text-green-600 font-medium"
              >
                {{ item.name }}
                <svg
                  class="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                v-if="dropdownOpen"
                class="dropdown-menu absolute left-0 top-full mt-2 flex flex-col bg-white border rounded shadow z-20"
              >
                <a
                  v-for="(child, cIndex) in item.children"
                  :key="cIndex"
                  :href="child.link"
                  class="px-4 py-2 text-sm hover:bg-green-100 whitespace-nowrap"
                >
                  {{ child.name }}
                </a>
              </div>
            </div>

            <div v-else>
              <a
                :href="item.link"
                class="px-3 py-1 rounded hover:text-green-600 font-medium"
              >
                {{ item.name }}
              </a>
            </div>
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
          <h2 class="text-4xl mb-4 ml-20  font-bold">Poin Anda Saat Ini: 12.500 Poin</h2>
          <p class="text-sm ml-20 italic">Tukar sekarang sebelum masa berlaku poin habis!</p>
        </div>
        <img src="/src/components/img/daurUlang.png/" alt="Recycle" class="h-48" />
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

    <div class="h-40  bg-gray-50 flex items-center justify-center">
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
