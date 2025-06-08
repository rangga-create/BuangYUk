<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const startDate = ref('');
const endDate = ref('');
const search = ref('');
const isLoggedIn = ref(false);
const dropdownOpen = ref(false);
const user = ref(null);
const currentPage = ref(1);
const itemsPerPage = 3;

const defaultData = [
  { tanggal: '2025-05-28', jenis: 'Plastik', berat: '3,2 kg', poin: '1.200 poin', status: 'Selesai' },
  { tanggal: '2025-05-22', jenis: 'Kertas', berat: '5,0 kg', poin: '1.200 poin', status: 'Selesai' },
];

const allData = ref([]);

onMounted(() => {
  const storedRiwayat = JSON.parse(localStorage.getItem('riwayatSampah')) || [];
  allData.value = [...storedRiwayat, ...defaultData];

  const loggedIn = localStorage.getItem('loggedInUser');
  if (loggedIn) {
    try {
      user.value = JSON.parse(loggedIn);
      isLoggedIn.value = true;
    } catch (e) {
      console.error('Gagal memuat data user:', e);
    }
  }

  navItems.value.forEach(item => {
    item.active = route.path === item.link;
  });
});



const parseDate = (str) => new Date(str);
const isWithinRange = (tanggal) => {
  const date = parseDate(tanggal);
  const from = startDate.value ? parseDate(startDate.value) : null;
  const to = endDate.value ? parseDate(endDate.value) : null;
  return (!from || date >= from) && (!to || date <= to);
};

const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchSearch =
      item.jenis.toLowerCase().includes(search.value.toLowerCase()) ||
      item.tanggal.includes(search.value);
    return matchSearch && isWithinRange(item.tanggal);
  });
});


const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredData.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / itemsPerPage) || 1
);


watch([search, startDate, endDate], () => {
  currentPage.value = 1;
});


const navItems = ref([
  { name: 'Dashboard', link: '/', active: false },
  { name: 'Home', link: '/home', active: false },
  { name: 'Edukasi & Tips', link: '/edukasi', active: false },
  {
    name: 'Tukar Poin', link: '#', active: false, hasDropdown: true,
    children: [
      { name: 'Form Input Sampah', link: '#' },
      { name: 'Riwayat Sampah', link: '#' },
      { name: 'Daftar Bank Sampah', link: '#' },
      { name: 'Eco Challenge Mingguan', link: '#' }
    ]
  }
]);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};


const goToLogin = () => router.push('/Login');
const goToRegister = () => router.push('/Register');


const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.dropdown-toggle');
  const menu = document.querySelector('.dropdown-menu');
  if (
    dropdown && !dropdown.contains(event.target) &&
    menu && !menu.contains(event.target)
  ) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);


  const loggedIn = localStorage.getItem('loggedInUser');
  if (loggedIn) {
    try {
      user.value = JSON.parse(loggedIn);
      isLoggedIn.value = true;
    } catch (e) {
      console.error('Gagal memuat data user:', e);
    }
  }


  navItems.value.forEach(item => {
    item.active = route.path === item.link;
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>



<template>
  <div class="min-h-screen bg-gray-50">

    <header class="bg-white text-black shadow-sm">
      <div class="container mx-auto px-6 md:px-32 py-3 flex items-center justify-between">
        <img src="/src/components/img/Logo.png" alt="Logo" class="w-28 h-8 object-cover" />


        <form class="hidden md:flex w-[850px]">
          <input
            type="text"
            placeholder="Masukkan nama Kota/kecamatan"
            class="w-full py-2 px-4 rounded-l-md text-sm border border-gray-300 focus:ring-2 focus:ring-green-400"
          />
          <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-md">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </form>


        <div v-if="isLoggedIn && user" class="flex items-center gap-2">
          <img :src="user.photo || '/src/components/img/profil.webp'" alt="profil" class="w-10 h-10 rounded-full object-cover" />
          <span class="text-sm text-black font-medium">{{ user.name }}</span>
        </div>
        <div v-else class="flex gap-3">
          <button @click="goToLogin" class="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition duration-200">Login</button>
          <button @click="goToRegister" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200">Daftar</button>
        </div>
      </div>
    </header>

    <nav class="bg-white shadow">
      <div class="container mx-auto px-4">
        <ul class="flex justify-center items-center space-x-8 py-4 text-sm relative">
          <li v-for="(item, index) in navItems" :key="index" class="relative">
            <div v-if="item.hasDropdown">
              <button @click="toggleDropdown" class="dropdown-toggle flex items-center px-3 py-1 hover:text-green-600 font-medium" type="button">
                {{ item.name }}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="dropdownOpen" class="dropdown-menu absolute left-0 top-full mt-2 bg-white border rounded shadow z-20">
                <a
                  v-for="(child, cIndex) in item.children"
                  :key="cIndex"
                  :href="child.link"
                  class="px-4 py-2 text-sm hover:bg-green-100 whitespace-nowrap block text-left"
                >
                  {{ child.name }}
                </a>
              </div>
            </div>
            <div v-else>
              <a :href="item.link" :class="['px-3 py-1 font-medium', item.active ? 'text-green-600' : 'hover:text-green-600']">{{ item.name }}</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div class="bg-green-600 text-white py-12 px-4 rounded-b-lg flex flex-col md:flex-row md:items-center justify-between max-w-7xl mx-auto mt-6">
      <div>
        <h2 class="text-2xl font-bold">Selamat datang kembali, {{ user?.name || 'Pengguna' }}</h2>
        <p class="mt-2 flex items-center gap-2 text-sm"><i class="fa fa-map-marker-alt"></i> BS Mandiri Jaya, Bekasi Selatan</p>
        <p class="flex items-center gap-2 text-sm"><i class="fa fa-calendar"></i> Jumat, 30 Mei 2025</p>
      </div>
      <img src="../components/img/poster.png" alt="Recycling" class="w-56 mt-4 md:mt-0" />
    </div>


    <div class="max-w-7xl mx-auto mt-10 p-12 bg-white rounded-lg shadow">
      <h3 class="text-xl font-bold mb-4">Riwayat Terbaru Pembuangan Sampah</h3>

      <div class="flex flex-wrap gap-4 mb-4">
        <input type="date" v-model="startDate" class="border px-3 py-2 rounded w-full sm:w-48" />
        <input type="date" v-model="endDate" class="border px-3 py-2 rounded w-full sm:w-48" />
        <div class="ml-auto w-full sm:w-64">
          <input type="text" v-model="search" placeholder="Cari jenis/tanggal" class="border px-3 py-2 w-full rounded" />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-4 py-2">NO</th>
              <th class="border px-4 py-2">TANGGAL</th>
              <th class="border px-4 py-2">JENIS SAMPAH</th>
              <th class="border px-4 py-2">BERAT</th>
              <th class="border px-4 py-2">NILAI POIN</th>
              <th class="border px-4 py-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedData" :key="index" class="text-center">
              <td class="border px-4 py-2">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="border px-4 py-2">{{ item.tanggal }}</td>
              <td class="border px-4 py-2">{{ item.jenis }}</td>
              <td class="border px-4 py-2">{{ item.berat }}</td>
              <td class="border px-4 py-2">{{ item.poin }}</td>
              <td class="border px-4 py-2">
                <span class="inline-flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                  ✅ {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between mt-4 text-sm text-gray-600">
        <p>Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} of {{ filteredData.length }} entries</p>
        <div class="flex gap-2">
          <button class="px-3 py-1 border rounded" :disabled="currentPage === 1" @click="currentPage--">Previous</button>
          <button
            v-for="n in totalPages"
            :key="n"
            @click="currentPage = n"
            :class="['px-3 py-1 border rounded', currentPage === n ? 'bg-blue-500 text-white' : '']"
          >
            {{ n }}
          </button>
          <button class="px-3 py-1 border rounded" :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
        </div>
      </div>
    </div>


    <footer class="text-center py-6 text-sm text-white bg-green-700 mt-10">
      Copyright 2054 My_Tutor | Designed By BuangYuk
    </footer>
  </div>
</template>



<style scoped>

</style>
