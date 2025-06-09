<script setup>
import ProgressItem from '../components/ItemChallage.vue';
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

let timer = null;
const challengeDuration = 3 * 60 * 60 * 1000;
const endTime = Date.now() + challengeDuration;
const countdownText = ref('');
const dropdownOpen = ref(false);
const router = useRouter();
const isLoggedIn = ref(false);
const user = ref(null);
const searchQuery = ref('');

function updateCountdown() {
  const now = Date.now();
  const distance = endTime - now;

  if (distance <= 0) {
    countdownText.value = 'Challenge selesai!';
    clearInterval(timer);
    return;
  }

  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownText.value = `${hours}H ${minutes}J ${seconds}D<br><div class="text-sm font-normal text-green-300">Sisa Waktu Challenge</div>`;
}

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

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
      { name: 'Daftar Bank Sampah', link: '/bank-sampah' },
      { name: 'Eco Challenge Mingguan', link: '/EcoChallenge' },
        {name:'penukaran point',link:'/penukaran'}
    ],
  },
]);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.dropdown-toggle');
  const menu = document.querySelector('.dropdown-menu');
  if (
    dropdown &&
    !dropdown.contains(event.target) &&
    menu &&
    !menu.contains(event.target)
  ) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  const loggedIn = localStorage.getItem('loggedInUser');
  if (loggedIn) {
    try {
      user.value = JSON.parse(loggedIn);
      isLoggedIn.value = true;
    } catch (error) {
      console.error('Gagal memuat data user:', error);
      user.value = null;
      isLoggedIn.value = false;
    }
  } else {
    user.value = null;
    isLoggedIn.value = false;
  }

  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function goToLogin() {
  router.push('/login');
}

function goToRegister() {
  router.push('/register');
}

function uploadProof() {
  document.getElementById('proofUpload').click();
}

function handleProofUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      console.log('Image data:', imageData);

      alert('Bukti berhasil diunggah!');
    };
    reader.readAsDataURL(file);
  } else {
    alert('Tidak ada file yang dipilih.');
  }
}

function shareChallenge() {
  if (navigator.share) {
    navigator.share({
      title: 'Eco Challenge Mingguan',
      text: 'Yuk ikut tantangan daur ulang mingguan dan dapatkan hadiah menarik!',
      url: window.location.href,
    })
    .then(() => alert('Terima kasih telah membagikan!'))
    .catch(console.error);
  } else {
    alert('Browser tidak mendukung fitur share');
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
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
          <button
            @click="goToLogin"
            class="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition duration-200"
          >
            Login
          </button>
          <button
            @click="goToRegister"
            class="px-4 py-2 text-sm font-medium text-white bg-[#43A55D] rounded-md hover:bg-green-700 transition duration-200"
          >
            Daftar
          </button>
        </div>
      </div>
    </header>

    <nav class="bg-white shadow">
      <div class="container mx-auto px-4">
        <ul class="flex justify-center items-center space-x-8 py-4 text-sm relative select-none">
          <li v-for="(item, index) in navItems" :key="index" class="relative">
            <template v-if="item.hasDropdown">
              <button
                @click="toggleDropdown"
                class="dropdown-toggle flex items-center px-3 py-1 font-medium text-gray-800 hover:text-green-600 transition"
              >
                {{ item.name }}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                v-if="dropdownOpen"
                class="dropdown-menu absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-20"
              >
                <a
                  v-for="(child, cIndex) in item.children"
                  :key="cIndex"
                  :href="child.link"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 whitespace-nowrap"
                >
                  {{ child.name }}
                </a>
              </div>
            </template>
            <template v-else>
              <a
                :href="item.link"
                class="px-3 py-1 font-medium text-gray-800 hover:text-green-600 transition"
              >
                {{ item.name }}
              </a>
            </template>
          </li>
        </ul>
      </div>
    </nav>

 <section
  class="relative h-52 bg-cover bg-center flex flex-col items-center justify-center text-white"
  :style="{ backgroundImage: `url('/public/img/baground.png')` }"
>
  <h1 class="text-3xl md:text-5xl font-bold drop-shadow-md">
    Eco Challenge Mingguan
  </h1>
  <div
    class="bg-emerald-600/70 mt-4 text-white font-semibold px-6 py-2 rounded text-lg shadow-md backdrop-blur-sm"
    v-html="countdownText"
  ></div>
</section>


    <section class="max-w-6xl mx-auto px-6 py-8 space-y-10">
     <div>
  <h2 class="text-2xl font-bold mb-2 text-emerald-700">Progress Challenge</h2>
  <p class="text-emerald-600 text-sm text-right mb-4">2/3 Selesai</p>
  <div class="space-y-4">
    <ProgressItem label="Sampah Plastik" :progress="100" completed="5/5" />
    <ProgressItem label="Sampah Organik" :progress="100" completed="5/5" />
    <ProgressItem label="Sampah Kertas" :progress="60" completed="3/5" />
  </div>
</div>


 <div
  class="bg-gradient-to-r from-green-100 via-green-50 to-white p-6 rounded-xl text-green-800 shadow-md"
>
  <h3 class="text-2xl font-bold mb-6 flex items-center">
    <span class="text-3xl mr-3 text-emerald-500">
      <ion-icon name="gift-outline"></ion-icon>
    </span>
    Hadiah Minggu Ini
  </h3>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div
      class="bg-white border border-green-200 p-4 rounded-xl text-center font-semibold shadow-sm hover:scale-105 hover:bg-green-50 transition-transform duration-300"
    >
      <div class="text-2xl mb-1 text-green-600">
        <ion-icon name="cash-outline"></ion-icon>
      </div>
      +500 Poin
    </div>
    <div
      class="bg-white border border-green-200 p-4 rounded-xl text-center font-semibold shadow-sm hover:scale-105 hover:bg-green-50 transition-transform duration-300"
    >
      <div class="text-2xl mb-1 text-green-600">
        <ion-icon name="trophy-outline"></ion-icon>
      </div>
      Badge Collector
    </div>
    <div
      class="bg-white border border-green-200 p-4 rounded-xl text-center font-semibold shadow-sm hover:scale-105 hover:bg-green-50 transition-transform duration-300"
    >
      <div class="text-2xl mb-1 text-green-600">
        <ion-icon name="ticket-outline"></ion-icon>
      </div>
      20% Voucher Diskon
    </div>
    <div
      class="bg-white border border-green-200 p-4 rounded-xl text-center font-semibold shadow-sm hover:scale-105 hover:bg-green-50 transition-transform duration-300"
    >
      <div class="text-2xl mb-1 text-green-600">
        <ion-icon name="leaf-outline"></ion-icon>
      </div>
      Bibit Gratis
    </div>
  </div>
</div>

    </section>

  <div class="max-w-4xl mx-auto px-6 py-6 flex flex-wrap gap-4 justify-center">
  <button
    @click="uploadProof"
    class="bg-white text-sky-600 border border-sky-200 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-sky-50 transition duration-200 shadow-sm"
  >
    <ion-icon name="camera-outline" class="text-sky-500"></ion-icon>
    Foto Bukti
  </button>

  <input
    type="file"
    id="proofUpload"
    accept="image/*"
    capture="environment"
    @change="handleProofUpload"
    class="hidden"
  />

  <button
    @click="shareChallenge"
    class="bg-white text-sky-600 border border-sky-200 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-sky-50 transition duration-200 shadow-sm"
  >
    <ion-icon name="share-social-outline" class="text-sky-500"></ion-icon>
    Share Challenge
  </button>
</div>

    <footer class="bg-green-700 text-white text-center py-4 text-sm">
      Copyright 2054 My_Tutor | Designed by BuangYuk
    </footer>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>
