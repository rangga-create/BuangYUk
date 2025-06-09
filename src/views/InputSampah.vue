<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import StatBox from '../components/StatBox.vue'


const isLoggedIn = ref(false)
const router = useRouter()
const dropdownOpen = ref(false)
const totalInputHariIni = ref(1247)
const kontributorAktif = ref(156)
const totalSampah = ref(89)
const form = ref({ jenis: '', berat: '', lokasi: '' })
const fileInput = ref(null)
const user = ref(null)
const uploadedFile = ref(null)
const errors = ref({})


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
      { name: 'Eco Challenge Mingguan', link: '/EcoChallenge' }
    ]
  }
])


const toggleDropdown2 = () => {
  dropdownOpen.value = !dropdownOpen.value
}


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
})

function goToLogin() {
  router.push('/Login')
}

function goToRegister() {
  router.push('/Register')
}

onMounted(() => {
  const loggedIn = localStorage.getItem('loggedInUser')
  if (loggedIn) {
    user.value = JSON.parse(loggedIn)
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.dropdown-toggle')
  const menu = document.querySelector('.dropdown-menu')
  if (
    dropdown && !dropdown.contains(event.target) &&
    menu && !menu.contains(event.target)
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



const estimasiHarga = computed(() => {
  const berat = parseFloat(form.value.berat)
  if (!berat || berat <= 0) return 'Auto Calculate'
  return `Rp ${(berat * 1500).toLocaleString()}`
})

const validateForm = () => {
  errors.value = {}
  if (!form.value.jenis) errors.value.jenis = 'Jenis sampah wajib diisi.'
  if (!form.value.berat || form.value.berat <= 0) errors.value.berat = 'Berat harus lebih dari 0.'
  if (!form.value.lokasi) errors.value.lokasi = 'Lokasi wajib dipilih.'
  return Object.keys(errors.value).length === 0
}


const triggerUpload = () => {
  if (fileInput.value) fileInput.value.click()
}

const uploadFoto = (e) => {
  const file = e.target.files[0]
  if (file) {
    uploadedFile.value = URL.createObjectURL(file)
  }
}

const triggerCamera = () => {
  alert('📷 Fitur kamera akan dibuka (simulasi).')
  if (fileInput.value) {
    fileInput.value.setAttribute('capture', 'environment')
    fileInput.value.click()
  }
}

const triggerGallery = () => {
  if (fileInput.value) {
    fileInput.value.removeAttribute('capture')
    fileInput.value.click()
  }
}

const triggerAIScan = () => {
  alert('🤖 AI scan sedang dijalankan (simulasi).')
  if (uploadedFile.value) {
    alert('Foto sudah diupload, AI akan menganalisis...')
  } else {
    alert('Silakan upload foto terlebih dahulu.')
  }
}

const submitForm = () => {
  if (!validateForm()) return;

  const beratInput = parseFloat(form.value.berat);
  if (!isNaN(beratInput)) {
    totalSampah.value += beratInput;
    totalInputHariIni.value += 1;
    kontributorAktif.value += 1;
  }


  const riwayatSampah = JSON.parse(localStorage.getItem('riwayatSampah')) || [];
  const newEntry = {
    tanggal: new Date().toISOString().split('T')[0],
    jenis: form.value.jenis,
    berat: `${form.value.berat} kg`,
    poin: `${parseFloat(form.value.berat) * 400} poin`,
    status: 'Selesai'
  };
  riwayatSampah.unshift(newEntry);
  localStorage.setItem('riwayatSampah', JSON.stringify(riwayatSampah));

  console.log('DATA DIKIRIM:', {
    ...form.value,
    estimasiHarga: estimasiHarga.value,
    foto: uploadedFile.value || 'Belum upload'
  });

  alert('Form berhasil dikirim!');
  form.value = { jenis: '', berat: '', lokasi: '' };
  uploadedFile.value = null;
  fileInput.value.value = null;
};





</script>

<template>
  <div class="text-center bg-white">


    <header class="bg-white text-black">
  <div class="container mx-auto px-6 md:px-32 py-3 flex items-center justify-between">

    <img src="/src/components/img/Logo.png" alt="Logo" class="w-28 h-8 object-cover" />


    <form class="hidden md:flex w-[850px]">
      <input
        type="text"
        placeholder="Masukkan nama Kota/kecamatan"
        class="w-full py-2 px-4 rounded-l-md text-sm border border-gray-300 focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        class="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-md"
      >
        <ion-icon name="search-outline"></ion-icon>
      </button>
    </form>


    <div v-if="isLoggedIn && user" class="flex items-center gap-2">
      <img :src="user.photo || 'https://images.unsplash.com/photo-1572573309811-48474d1891b7?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" alt="profil" class="w-10 h-10 rounded-full object-cover" />
      <span class="text-sm text-black font-medium">{{ user.name }}</span>
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
    class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
  >
    Daftar
  </button>
</div>

  </div>
    </header>

    <nav class="bg-white shadow">
      <div class="container mx-auto px-4">
        <ul class="flex justify-center items-center space-x-8 py-4 text-sm relative">
          <li v-for="(item, index) in navItems" :key="index" class="relative">
            <div v-if="item.hasDropdown">
              <button
                @click="toggleDropdown2"
                class="dropdown-toggle flex items-center px-3 py-1 hover:text-green-600 font-medium"
                type="button"
              >
                {{ item.name }}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                v-if="dropdownOpen"
                class="dropdown-menu absolute left-0 top-full mt-2 bg-white border rounded shadow z-20"
              >
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
              <a :href="item.link" class="px-3 py-1 hover:text-green-600 font-medium">{{ item.name }}</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <section
      class="bg-cover bg-center bg-no-repeat py-16 px-4"
      style="background-image: url('/src/components/img/baground.png');"
    >
      <h1 class="text-3xl font-bold text-white">Input Sampah</h1>
      <p class="text-white mt-2">Bantu lingkungan dengan mencatat sampah yang kamu kelola!</p>

      <div class="flex justify-center mt-6 space-x-4 flex-wrap">
  <StatBox label="Total input hari ini" :value="totalInputHariIni.toLocaleString()" color="bg-green-500" />
  <StatBox label="Sampah Terkumpul" :value="totalSampah + ' Kg'" color="bg-green-500" />
  <StatBox label="Kontributor Aktif" :value="kontributorAktif.toLocaleString()" color="bg-green-500" />
</div>
    </section>


    <div class="max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-lg mt-10 rounded-md border-1 p-40">
      <h2 class="text-2xl font-bold mb-4 text-black">Form Input Sampah</h2>
      <p class="text-sm font-medium text-black/70 mb-10">Lengkapi data sampah untuk mendapatkan poin dan membantu lingkungan</p>
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-left text-sm font-medium">Pilih Jenis Sampah</label>
            <select v-model="form.jenis" class="w-full border rounded px-3 py-2">
              <option disabled value="">Pilih jenis</option>
              <option>Elektronik</option>
              <option>Plastik</option>
              <option>Kertas</option>
            </select>
            <p v-if="errors.jenis" class="text-red-500 text-sm mt-1">{{ errors.jenis }}</p>
          </div>

          <div>
            <label class="block text-left text-sm font-medium">Berat (kg)</label>
            <input v-model="form.berat" type="number" placeholder="Masukkan Berat.." class="w-full border rounded px-3 py-2" />
            <p v-if="errors.berat" class="text-red-500 text-sm mt-1">{{ errors.berat }}</p>
          </div>

          <div>
            <label class="block text-left text-sm font-medium">Estimasi Harga</label>
            <input :value="estimasiHarga" readonly class="w-full border rounded px-3 py-2 bg-gray-100" />
          </div>

          <div>
            <label class="block text-left text-sm font-medium">Lokasi Penjemputan</label>
            <select v-model="form.lokasi" class="w-full border rounded px-3 py-2">
              <option disabled value="">Pilih lokasi</option>
              <option>Tempat umum</option>
              <option>Rumah</option>
              <option>Kantor</option>
            </select>
            <p v-if="errors.lokasi" class="text-red-500 text-sm mt-1">{{ errors.lokasi }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-left mb-4">Upload Foto Sampah</label>
          <div
            class="border border-dashed border-green-400 p-10 rounded-md text-center text-green-600 cursor-pointer"
            @click="triggerUpload"
          >
            <input type="file" @change="uploadFoto" class="hidden" ref="fileInput" accept="image/*" />
            <p>Upload Foto atau Gambar</p>
            <p class="text-xs text-gray-500">Foto akan dianalisis AI untuk verifikasi otomatis</p>
          </div>

          <div v-if="uploadedFile" class="mt-4">
            <p class="text-sm font-medium text-left mb-1">Preview Foto:</p>
            <img :src="uploadedFile" alt="Preview" class="w-40 h-auto mx-auto rounded shadow" />
          </div>

          <div class="flex justify-center mt-4 gap-4 flex-wrap">
            <button
              type="button"
              @click="triggerCamera"
              class="flex items-center gap-2 bg-gray-100 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow text-sm transition"
            >
              <ion-icon name="camera-outline" class="w-8 h-6"></ion-icon> Camera
            </button>

            <button
              type="button"
              @click="triggerGallery"
              class="flex items-center gap-2 bg-gray-100 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow text-sm transition"
            >
              <ion-icon name="images-outline" class="w-8 h-6"></ion-icon> Galeri
            </button>

            <button
              type="button"
              @click="triggerAIScan"
              class="flex items-center gap-2 bg-green-100 hover:bg-green-300 text-green-900 px-6 py-3 rounded-lg shadow text-sm transition"
            >
              <ion-icon name="logo-reddit" class="w-8 h-6"></ion-icon> AI Scan
            </button>
          </div>
        </div>

        <div class="mt-5 p-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md">
          <div class="flex flex-wrap gap-2">
            <span class="bg-white text-purple-600 rounded-full px-3 py-1 text-sm">HP Rusak</span>
            <span class="bg-white text-purple-600 rounded-full px-3 py-1 text-sm">Charger Bekas</span>
            <span class="bg-white text-purple-600 rounded-full px-3 py-1 text-sm">Baterai</span>
            <span class="bg-white text-purple-600 rounded-full px-3 py-1 text-sm">Kabel USB</span>
          </div>
        </div>

        <div class="flex justify-between mt-6">
          <button type="button" class="border border-gray-400 text-gray-700 px-8 py-2 rounded">
            <ion-icon name="save-outline"></ion-icon> Simpan Draft
          </button>
       <button
  type="submit"
  class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-50 py-2 rounded-full flex items-center gap-2 shadow-sm transition duration-200"
>
  <ion-icon name="send-outline" class="text-lg"></ion-icon>
  Submit & Dapatkan Poin
</button>

        </div>
      </form>
    </div>


    <footer class="bg-[#43A55D] text-white text-center py-4 mt-10">
      Copyright 2054 My_Tutor | Designed By BuangYuk
    </footer>
  </div>
</template>
