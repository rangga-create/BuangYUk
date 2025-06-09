<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import BankSampahCard from '../components/SampahBank.vue'

const router = useRouter()
const isLoggedIn = ref(false)
const dropdownOpen = ref(false)
const user = ref(null)
const searchQuery = ref('')

const newBank = ref({
  name: '',
  address: '',
  operationalHours: '',
  image: ''
})

const banks = ref([])

function addBank() {
  if (
    newBank.value.name.trim() &&
    newBank.value.address.trim() &&
    newBank.value.operationalHours.trim() &&
    newBank.value.image.trim()
  ) {
    const newEntry = { ...newBank.value }
    banks.value.unshift(newEntry)
    saveToLocalStorage()
    newBank.value = { name: '', address: '', operationalHours: '', image: '' }
  } else {
    alert('Mohon lengkapi semua kolom sebelum menambahkan bank sampah.')
  }
}

function saveToLocalStorage() {
  localStorage.setItem('banksData', JSON.stringify(banks.value))
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem('banksData')
  if (stored) {
    banks.value = JSON.parse(stored)
  } else {
    banks.value = [
      {
        name: 'Bank Sampah Citra Bersih',
        address: 'Jl. Merdeka No. 15, Bekasi Utara',
        operationalHours: 'Senin-Sabtu, 08.00-16.00',
        image: 'https://images.unsplash.com/photo-1653858712082-9877c9fbe417?q=80&w=1331'
      },
      {
        name: 'Bank Sampah Hijau Lestari',
        address: 'Perumahan Griya Asri Blok C2',
        operationalHours: 'Senin-Jumat, 09.00-15.00',
        image: 'https://images.unsplash.com/photo-1592209962066-db0e9b617477?q=80&w=2578'
      },
      {
        name: 'Bank Sampah Mandiri',
        address: 'Jl. Raya Cibubur No. 88, Jakarta',
        operationalHours: 'Setiap Hari, 07.00-17.00',
        image: 'https://images.unsplash.com/photo-1706376764637-64b34837aaa6?q=80&w=1287'
      },
      {
        name: 'Bank Sampah Alam Hijau',
        address: 'Jl. Kenanga No. 22, Depok',
        operationalHours: 'Senin-Sabtu, 08.00-16.00',
        image: 'https://images.unsplash.com/photo-1712642178674-12d269ca9e21?q=80&w=1470'
      },
      {
        name: 'Bank Sampah Berseri',
        address: 'Jl. Melati Indah No. 5, Tangerang',
        operationalHours: 'Senin-Jumat, 09.00-15.00',
        image: 'https://plus.unsplash.com/premium_photo-1744148531931-51d1a1c45590?q=80&w=1384'
      },
      {
        name: 'Bank Sampah Harapan Baru',
        address: 'Jl. Pahlawan No. 10, Bogor',
        operationalHours: 'Setiap Hari, 07.00-17.00',
        image: 'https://images.unsplash.com/photo-1651346864838-26f9b20b3559?q=80&w=1470'
      }
    ]
    saveToLocalStorage()
  }
}

onMounted(() => {
  loadFromLocalStorage()
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

const navItems = ref([
  { name: 'Dashboard', link: '/', active: false },
  { name: 'Home', link: '/Home', active: false },
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

const filteredBanks = computed(() =>
  banks.value.filter(bank =>
    bank.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const limitedBanks = computed(() => filteredBanks.value.slice(0, 6))

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function goToLogin() {
  router.push('/Login')
}

function goToRegister() {
  router.push('/Register')
}

function handleClickOutside(event) {
  const dropdown = document.querySelector('.dropdown-toggle')
  const menu = document.querySelector('.dropdown-menu')
  if (
    dropdown && !dropdown.contains(event.target) &&
    menu && !menu.contains(event.target)
  ) {
    dropdownOpen.value = false
  }
}
</script>

<template>
  <div class="bg-white min-h-screen flex flex-col">

    <header class="bg-white text-black shadow-sm">
      <div class="container mx-auto px-6 md:px-32 py-3 flex items-center justify-between">
        <img src="/public/img/Logo.png" alt="Logo" class="w-28 h-8 object-contain" />
        <form class="hidden md:flex w-[850px]" @submit.prevent>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Masukkan nama Kota/kecamatan"
            class="w-full py-2 px-4 rounded-l-md text-sm border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <button
            type="submit"
            class="bg-green-500 hover:bg-[#43A55D] text-white px-4 rounded-r-md transition"
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
          <button @click="goToRegister" class="px-4 py-2 text-sm font-medium text-white bg-[#43A55D] rounded-md hover:bg-green-700 transition duration-200">Daftar</button>
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

    <div class="relative h-52 bg-cover bg-center flex items-center justify-center" style="background-image: url('/public/img/baground.png');">
      <h1 class="text-white text-5xl font-bold">Daftar Bank Sampah</h1>
    </div>

    <section class="container mx-auto px-6 py-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">Tambah Bank Sampah</h2>
      <form @submit.prevent="addBank" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-lg shadow-md">
        <input v-model="newBank.name" type="text" placeholder="Nama Bank Sampah" class="input-style" />
        <input v-model="newBank.address" type="text" placeholder="Alamat" class="input-style" />
        <input v-model="newBank.operationalHours" type="text" placeholder="Jam Operasional" class="input-style" />
        <input v-model="newBank.image" type="text" placeholder="URL Gambar" class="input-style col-span-full" />
        <div v-if="newBank.image" class="col-span-full">
          <img :src="newBank.image" alt="Preview Gambar" class="h-32 object-cover rounded border" />
        </div>
        <button type="submit" class="bg-[#43A55D] hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition col-span-full">
          Tambah Bank Sampah
        </button>
      </form>
    </section>


    <section class="flex-grow container mx-auto px-6 py-12">
      <h2 class="text-2xl font-bold mb-4 text-center"><span class="text-green-700 italic">Daftar Bank Sampah Mitra BuangYuk</span></h2>
      <p class="mb-24 text-gray-600 text-center">Temukan bank sampah terdekat dari lokasi Anda!</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <bank-sampah-card v-for="bank in limitedBanks" :key="bank.name" :bank="bank" />
      </div>
    </section>


    <footer class="bg-[#43A55D] text-white text-center py-4 mt-auto">
      <p class="text-sm">&copy; 2054 My_Tutor | Designed By BuangYuk</p>
    </footer>
  </div>
</template>

<style scoped>
.input-style {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition: box-shadow 0.2s ease-in-out;
}
.input-style:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
}
</style>
