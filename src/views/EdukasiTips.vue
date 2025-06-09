<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const dropdownOpen = ref(false)
const router = useRouter()

const isLoggedIn = ref(false)
const user = ref(null)
const searchQuery = ref('')

const navItems = ref([
  { name: 'Dashboard', link: '/', active: false },
  { name: 'Home', link: '/home', active: false },
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

onMounted(() => {
  const loggedIn = localStorage.getItem('loggedInUser')
  if (loggedIn) {
    try {
      user.value = JSON.parse(loggedIn)
      isLoggedIn.value = true
    } catch (error) {
      console.error('Gagal memuat data user:', error)
      user.value = null
      isLoggedIn.value = false
    }
  } else {
    user.value = null
    isLoggedIn.value = false
  }

  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function goToLogin() {
  router.push('/Login')
}

function goToRegister() {
  router.push('/Register')
}

const sampahList = [
  { jenis: 'Plastik', contoh: 'Botol air mineral, kantong belanja', perlakuan: 'Cuci & keringkan' },
  { jenis: 'Kertas', contoh: 'Koran, kardus, majalah', perlakuan: 'Kering & tidak berminyak' },
  { jenis: 'Logam', contoh: 'Kaleng minuman, tutup botol', perlakuan: 'Bilas dari sisa makanan/minuman' },
  { jenis: 'Kaca', contoh: 'Botol kaca, toples', perlakuan: 'Pastikan tidak pecah, bersihkan' },
  { jenis: 'Elektronik', contoh: 'Kabel, charger, ponsel rusak', perlakuan: 'Simpan aman, setor ke TPS terdekat' },
  { jenis: 'Residu & Organik', contoh: 'Popok bekas, tisu, sisa makanan', perlakuan: 'Tidak diterima oleh bank sampah' }
]
</script>



<template>
  <div class="bg-white text-gray-800">


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
          <button type="submit" class="bg-[#43A55D] hover:bg-green-600 text-white px-4 rounded-r-md transition">
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
              <a :href="item.link" class="px-3 py-1 font-medium text-gray-800 hover:text-green-600 transition">
                {{ item.name }}
              </a>
            </template>
          </li>
        </ul>
      </div>
    </nav>


    <div class="relative h-52 bg-cover bg-center flex items-center justify-center" style="background-image: url('/src/components/img/baground.png');">
      <h1 class="text-white text-5xl font-bold">Edukasi & Tips</h1>
    </div>


    <div class="max-w-5xl mx-auto px-4 py-16">
      <h2 class="text-2xl font-bold mb-4 text-center">
        📖 Edukasi & Tips – <span class="text-green-700">BuangYuk</span>
      </h2>
      <p class="mb-24 text-gray-600 text-center">
        Tingkatkan kesadaran lingkunganmu mulai dari memilah sampah dengan benar <br>
        hingga memahami dampak nyata dari daur ulang terhadap bumi kita.
      </p>


      <section class="mb-16">
        <h3 class="text-xl font-bold mb-4">1. Cara Memilih & Memilah Sampah dengan Benar</h3>
        <p class="mb-4">Pilah sebelum buang! Berikut panduan dasar memilih jenis sampah yang bisa disetor ke bank sampah:</p>

        <div class="overflow-auto">
          <table class="w-full table-auto border border-gray-300">
            <thead class="bg-[#43A55D] text-white">
              <tr>
                <th class="px-4 py-2 border">No</th>
                <th class="px-4 py-2 border">Jenis Sampah</th>
                <th class="px-4 py-2 border">Contoh</th>
                <th class="px-4 py-2 border">Perlakuan Sebelum Disetor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sampahList" :key="index" class="bg-white">
                <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                <td class="border px-4 py-2 text-green-700 font-semibold">{{ item.jenis }}</td>
                <td class="border px-4 py-2">{{ item.contoh }}</td>
                <td class="border px-4 py-2">{{ item.perlakuan }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-sm text-gray-500">
          ✨ Tips: Gunakan 3 tempat sampah berbeda di rumah: Organik – Anorganik – Residu
        </p>
      </section>


      <section class="mb-10">
        <h3 class="text-xl font-bold mb-4">2. Fakta Menarik Tentang Daur Ulang</h3>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>1 Botol Plastik = Energi Menyalakan Lampu 6 Jam</strong><br /> Mendaur ulang 1 botol plastik bisa menghemat energi untuk lampu LED selama 6 jam.</li>
          <li><strong>1 Ton Kertas Daur Ulang = Selamatan 17 Pohon</strong><br /> Daur ulang 1000 kg kertas mengurangi penebangan pohon secara signifikan.</li>
          <li><strong>Sampah Plastik Butuh 450 Tahun Terurai</strong><br /> Daur ulang mencegah plastik bertahan ratusan tahun di alam.</li>
          <li><strong>Indonesia Penghasil Sampah Plastik Laut Terbesar Ke-2</strong><br /> Langkah kecil seperti daur ulang dapat mengubah peringkat ini.</li>
        </ul>
      </section>

      <section>
        <h3 class="text-xl font-bold mb-4">3. Dampak Lingkungan dari Sampah Tak Terkelola</h3>
        <blockquote class="italic text-gray-600 mb-4">
          "Satu orang menghasilkan 0,7 kg sampah per hari. Bayangkan 270 juta orang."
        </blockquote>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Pencemaran Udara</strong><br /> Pembakaran terbuka menghasilkan gas berbahaya seperti dioksin dan CO.</li>
          <li><strong>Kerusakan Ekosistem</strong><br /> 8 juta ton plastik masuk laut per tahun, membahayakan hewan dan manusia.</li>
          <li><strong>Banjir</strong><br /> Sampah menyumbat saluran air dan merusak ekosistem.</li>
          <li><strong>Risiko Penyakit</strong><br /> Sampah menciptakan sarang nyamuk penyebab DBD.</li>
        </ul>
      </section>
    </div>


    <footer class="bg-[#43A55D] text-white text-center py-4 text-sm">
      Copyright 2054 My_Tutor | Designed by BuangYuk
    </footer>
  </div>
</template>




<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  white-space: nowrap;
}
</style>
