<script setup>
import { ref, onMounted, onBeforeUnmount,watch,reactive } from 'vue'
import { useRouter } from 'vue-router'
import ProfileItem from '../components/ProfilPage.vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const user = ref(null)
const isLoggedIn = ref(false)
const dropdownOpen = ref(false)
const selectedMenu = ref('')
const email = ref(user.value?.email || '')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const { locale } = useI18n()
const selectedUser = ref(null)
const accounts = ref([])

onMounted(() => {

  const savedAccounts = localStorage.getItem('accounts')
  accounts.value = savedAccounts ? JSON.parse(savedAccounts) : []


  const loggedIn = localStorage.getItem('loggedInUser')
  if (loggedIn) {
    user.value = JSON.parse(loggedIn)
    isLoggedIn.value = true
  }
})


function selectAccount(account) {
  selectedUser.value = account
  user.value = account
  isLoggedIn.value = true
  localStorage.setItem('loggedInUser', JSON.stringify(account))
  successMessage.value = `Berhasil memilih akun: ${account.username}`
}

watch(user, (newUser) => {
  email.value = newUser?.email || ''
}, { immediate: true })



function changeLanguage() {
  locale.value = selectedLanguage.value
  localStorage.setItem('language', selectedLanguage.value)
}
const form = ref({
  name: '',
  email: '',
  phone: '',
  photo: null
})


const newAccount = reactive({
  username: '',
  email: '',
  password: '',
    photoPreview: null,
})

function handlePhotoChangeForNewAccount(event) {
  const file = event.target.files[0]
  if (!file) return

  newAccount.photo = file

  const reader = new FileReader()
  reader.onload = e => {
    newAccount.photoPreview = e.target.result
  }
  reader.readAsDataURL(file)
}

function submitNewAccount() {
  successMessage.value = ''
  errorMessage.value = ''


  if (!newAccount.username || !newAccount.email || !newAccount.password) {
    errorMessage.value = 'Semua field harus diisi.'
    return
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newAccount.email)) {
    errorMessage.value = 'Format email tidak valid.'
    return
  }


  let accounts = JSON.parse(localStorage.getItem('accounts') || '[]')


  const duplicate = accounts.find(
    acc => acc.username === newAccount.username || acc.email === newAccount.email
  )
  if (duplicate) {
    errorMessage.value = 'Username atau email sudah terdaftar.'
    return
  }

  accounts.push({ ...newAccount })


  localStorage.setItem('accounts', JSON.stringify(accounts))

  successMessage.value = 'Akun berhasil ditambahkan!'


  newAccount.username = ''
  newAccount.email = ''
  newAccount.password = ''
  newAccount.name = ''
  newAccount.phone = ''
  newAccount.photo = null
  newAccount.photoPreview = null
}


const privacySettings = reactive({
  dataSharing: false,
  emailNotifications: true,
  showProfilePublic: false,
})

function savePrivacySettings() {
  localStorage.setItem('privacySettings', JSON.stringify(privacySettings))
  alert('Pengaturan privasi berhasil disimpan!')
}

onMounted(() => {
  const saved = localStorage.getItem('privacySettings')
  if (saved) {
    const parsed = JSON.parse(saved)
    Object.assign(privacySettings, parsed)
  }
})


function updateAccount() {
  if (newPassword.value && newPassword.value !== confirmPassword.value) {
    message.value = 'Password konfirmasi tidak cocok!'
    return
  }

  if (user.value) {
    if (newPassword.value) {
      user.value.password = newPassword.value
    }
    user.value.email = email.value
    localStorage.setItem('loggedInUser', JSON.stringify(user.value))
  }

  newPassword.value = ''
  confirmPassword.value = ''
  message.value = 'Pengaturan akun berhasil diperbarui!'
}

const locations = [
  { code: 'jakarta', label: 'Jakarta' },
  { code: 'bandung', label: 'Bandung' },
  { code: 'surabaya', label: 'Surabaya' },
  { code: 'yogyakarta', label: 'Yogyakarta' },
]


const selectedLocation = ref(localStorage.getItem('selectedLocation') || '')


watch(selectedLocation, (newLoc) => {
  localStorage.setItem('selectedLocation', newLoc)
})

const languages = [
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'en', label: 'English' },
  { code: 'jp', label: '日本語' }
]


const selectedLanguage = ref(localStorage.getItem('selectedLanguage') || 'id')


watch(selectedLanguage, (newLang) => {
  localStorage.setItem('selectedLanguage', newLang)
})

const photoPreview = ref(null)

function handlePhotoChange(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.photo = file
    const reader = new FileReader()
    reader.onload = e => {
      photoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function submitForm() {
  if (!form.value.name.trim() || !form.value.email.trim()) {
    alert('Nama dan email wajib diisi!')
    return
  }

  user.value.name = form.value.name
  user.value.email = form.value.email
  user.value.phone = form.value.phone

  if (photoPreview.value) {
    user.value.photo = photoPreview.value
  }

  localStorage.setItem('loggedInUser', JSON.stringify(user.value))

  alert('Profil berhasil diperbarui!')

  photoPreview.value = null
}

onMounted(() => {
  const loggedIn = localStorage.getItem('loggedInUser')
  if (loggedIn) {
    try {
      user.value = JSON.parse(loggedIn)
      isLoggedIn.value = true


      form.value.name = user.value.name || ''
      form.value.email = user.value.email || ''
      form.value.phone = user.value.phone || ''

    } catch (e) {
      console.error('Gagal memuat data user:', e)
      isLoggedIn.value = false
    }
  } else {
    isLoggedIn.value = false
  }

  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function toggleDropdown2() {
  dropdownOpen.value = !dropdownOpen.value
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

function goToLogin() {
  router.push('/login')
}

function goToRegister() {
  router.push('/register')
}

function logout() {
  localStorage.removeItem('loggedInUser')
  user.value = null
  isLoggedIn.value = false
  router.push('/login')
}

function selectMenu(menu) {
  selectedMenu.value = menu
}

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


</script>

<template>
  <div class="min-h-screen bg-gray-100">

    <header class="bg-white text-black">
      <div class="container mx-auto px-6 md:px-32 py-3 flex items-center justify-between">
        <img src="/public/img/Logo.png" alt="Logo" class="w-28 h-8 object-cover" />

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
          <img
            :src="user.photo || 'https://images.unsplash.com/photo-1572573309811-48474d1891b7?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
            alt="profil"
            class="w-10 h-10 rounded-full object-cover"
          />
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
        <ul class="flex justify-center items-center space-x-8 py-4 text-sm font-medium relative">
          <li v-for="(item, index) in navItems" :key="index" class="relative">
            <div v-if="item.hasDropdown">
              <button
                @click="toggleDropdown2"
                class="dropdown-toggle flex items-center px-3 py-1 hover:text-green-600"
                type="button"
              >
                {{ item.name }}
                <svg
                  class="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
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
              <a
                :href="item.link"
                class="px-3 py-1 hover:text-green-600 font-medium"
              >
                {{ item.name }}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>


<section
  class="bg-cover bg-center bg-no-repeat py-24 px-4 flex flex-col items-center justify-center text-center"
  style="background-image: url('/public/img/baground.png');"
>



  <div class="relative z-10 max-w-3xl">
    <h1 class="text-4xl font-bold text-white mb-4">Profil</h1>
    <p class="text-white text-lg">Kelola data profil kamu dengan mudah di sini.</p>
  </div>
</section>




    <div class="container mx-auto mt-10 px-6 flex flex-col lg:flex-row gap-6">

      <div class="flex-shrink-0">
        <img
          :src="user?.photo || 'https://images.unsplash.com/photo-1572573309811-48474d1891b7?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
          alt="Profile"
          class="rounded-lg w-60 h-auto object-cover"
        />
      </div>

      <div class="flex-shrink-0 w-60">
        <div class="bg-white rounded-lg shadow divide-y">
          <ProfileItem icon="fa-user-edit" text="Edit Profil" @click="() => selectMenu('edit-profil')" />
          <ProfileItem icon="fa-globe" text="Bahasa" @click="() => selectMenu('bahasa')" />
          <ProfileItem icon="fa-map-marker-alt" text="Lokasi" @click="() => selectMenu('lokasi')" />
          <ProfileItem icon="fa-cog" text="Pengaturan Akun" @click="() => selectMenu('pengaturan-akun')" />
          <ProfileItem icon="fa-info-circle" text="Informasi" @click="() => selectMenu('informasi')" />
          <ProfileItem icon="fa-shield-alt" text="Keamanan dan Privasi" @click="() => selectMenu('privasi')" />
          <ProfileItem icon="fa-user-plus" text="Tambahkan Akun" @click="() => selectMenu('tambah-akun')" />
          <ProfileItem icon="fa-sign-out-alt" text="Keluar" @click="logout" />
        </div>
      </div>


      <div class="flex-1">
        <div class="bg-white rounded-lg shadow p-6 min-h-[300px]">

          <template v-if="selectedMenu === 'edit-profil'">
            <h2 class="text-2xl font-bold mb-6 text-green-700">Edit Profil</h2>

            <form @submit.prevent="submitForm" class="space-y-6 max-w-md">

              <div>
                <label class="block mb-2 font-medium text-gray-700">Foto Profil</label>
                <div class="flex items-center gap-4">
                  <img
                    :src="photoPreview || (user?.photo || 'https://images.unsplash.com/photo-1572573309811-48474d1891b7?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                    alt="Foto Profil"
                    class="w-24 h-24 rounded-full object-cover border border-gray-300"
                  />
                  <input type="file" accept="image/*" @change="handlePhotoChange" />
                </div>
              </div>

              <div>
                <label for="name" class="block mb-2 font-medium text-gray-700">Nama Lengkap</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label for="email" class="block mb-2 font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Masukkan email"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label for="phone" class="block mb-2 font-medium text-gray-700">Nomor HP</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="Masukkan nomor HP"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <button
                  type="submit"
                  class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </template>

<template v-else-if="selectedMenu === 'bahasa'">
  <h2 class="text-xl font-bold mb-4">{{ $t('language_settings') }}</h2>
  <p>{{ $t('choose_language') }}</p>
  <ul class="mt-4 space-y-2">
    <li v-for="lang in languages" :key="lang.code">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          :value="lang.code"
          v-model="selectedLanguage"
          class="form-radio text-green-600"
          @change="changeLanguage"
        />
        <span>{{ lang.label }}</span>
      </label>
    </li>
  </ul>
  <p class="mt-4 text-green-600 font-semibold">
    {{ $t('current_language') }}: {{ languages.find(l => l.code === selectedLanguage)?.label }}
  </p>
</template>



       <template v-else-if="selectedMenu === 'lokasi'">
  <h2 class="text-xl font-bold mb-4">      {{ $t('locationTitle') }}</h2>
  <p>      {{ $t('chooseLocation') }}</p>

  <select
    v-model="selectedLocation"
    class="mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
  >
    <option disabled value="">{{ $t('settings.selectPlaceholder') }}</option>
    <option v-for="loc in locations" :key="loc.code" :value="loc.code">
      {{ loc.label }}
    </option>
  </select>

  <p class="mt-4 text-green-600 font-semibold" v-if="selectedLocation">
      {{ $t('currentLocation') }}: {{ locations.find(l => l.code === selectedLocation)?.label }}
  </p>
</template>


     <template v-else-if="selectedMenu === 'pengaturan-akun'">
  <h2 class="text-xl font-bold mb-4">Pengaturan Akun</h2>

  <form @submit.prevent="updateAccount" class="space-y-4 max-w-md">
    <div>
      <label class="block mb-1 font-semibold" for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="email"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />
    </div>

    <div>
      <label class="block mb-1 font-semibold" for="newPassword">Password Baru</label>
      <input
        id="newPassword"
        type="password"
        v-model="newPassword"
        placeholder="Kosongkan jika tidak ingin ganti"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>

    <div>
      <label class="block mb-1 font-semibold" for="confirmPassword">Konfirmasi Password</label>
      <input
        id="confirmPassword"
        type="password"
        v-model="confirmPassword"
        placeholder="Konfirmasi password baru"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>

    <button
      type="submit"
      class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
    >
      Simpan
    </button>

    <p class="mt-2 text-green-600 font-semibold" v-if="message">{{ message }}</p>
  </form>
</template>


     <template v-else-if="selectedMenu === 'informasi'">
  <h2 class="text-xl font-bold mb-4">Informasi Akun & Aplikasi</h2>

  <div class="space-y-4 max-w-md text-gray-700">
    <div>
      <h3 class="font-semibold">Informasi Pengguna</h3>
      <p><strong>Nama:</strong> {{ user?.name || '-' }}</p>
      <p><strong>Email:</strong> {{ user?.email || '-' }}</p>
      <p><strong>Username:</strong> {{ user?.username || '-' }}</p>
    </div>

    <div>
      <h3 class="font-semibold mt-6">Informasi Aplikasi</h3>
      <p>Versi aplikasi: 1.0.0</p>
      <p>Dikembangkan oleh: BuangYuk</p>
      <p>Hak Cipta © 2054 My_Tutor</p>
    </div>
  </div>
</template>


<template v-else-if="selectedMenu === 'privasi'">
  <h2 class="text-xl font-bold mb-4">Keamanan dan Privasi</h2>

  <div class="max-w-md space-y-4 text-gray-700">
    <div>
      <label class="flex items-center space-x-3">
        <input type="checkbox" v-model="privacySettings.dataSharing" />
        <span>Izinkan berbagi data anonim untuk pengembangan aplikasi</span>
      </label>
    </div>

    <div>
      <label class="flex items-center space-x-3">
        <input type="checkbox" v-model="privacySettings.emailNotifications" />
        <span>Terima notifikasi email terkait aktivitas akun</span>
      </label>
    </div>

    <div>
      <label class="flex items-center space-x-3">
        <input type="checkbox" v-model="privacySettings.showProfilePublic" />
        <span>Tampilkan profil saya secara publik</span>
      </label>
    </div>

    <button
      @click="savePrivacySettings"
      class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Simpan Pengaturan
    </button>
  </div>
</template>



<template v-else-if="selectedMenu === 'tambah-akun'">
  <h2 class="text-xl font-bold mb-4">Tambahkan Akun</h2>

  <form @submit.prevent="submitNewAccount" class="max-w-md space-y-4 text-gray-700">

        <div>
      <label class="block mb-1 font-medium" for="photo">Foto Profil</label>
      <input
        id="photo"
        type="file"
        @change="handlePhotoChangeForNewAccount"
        accept="image/*"
        class="w-full"
      />
      <img
        v-if="newAccount.photoPreview"
        :src="newAccount.photoPreview"
        alt="Preview Foto"
        class="mt-2 w-24 h-24 object-cover rounded-full"
      />
    </div>

    <div>
      <label class="block mb-1 font-medium" for="username">Username</label>
      <input
        id="username"
        v-model="newAccount.username"
        type="text"
        required
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>

    <div>
      <label class="block mb-1 font-medium" for="email">Email</label>
      <input
        id="email"
        v-model="newAccount.email"
        type="email"
        required
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>

    <div>
      <label class="block mb-1 font-medium" for="password">Password</label>
      <input
        id="password"
        v-model="newAccount.password"
        type="password"
        required
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>





    <button
      type="submit"
      class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Tambah Akun
    </button>
  </form>

  <p v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</p>
  <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>

  <hr class="my-8 border-gray-300" />

  <h2 class="text-xl font-bold mb-4">Pilih Akun yang Akan Digunakan</h2>

<div class="max-w-2lg grid grid-cols-2 gap-4 text-gray-700">
  <div
    v-for="(account, index) in accounts"
    :key="index"
    @click="selectAccount(account)"
    :class="[
      'cursor-pointer p-3 border rounded hover:bg-green-100 flex items-center space-x-3',
      user?.username === account.username ? 'bg-green-200' : 'bg-white'
    ]"
  >
    <img
      v-if="account.photo"
      :src="account.photo"
      alt="Foto Profil"
      class="w-10 h-10 rounded-full object-cover"
    />
    <div>
      <strong>{{ account.username }}</strong> — {{ account.email }}<br />
      <small>{{ account.name }} | {{ account.phone }}</small>
    </div>
  </div>
</div>

</template>


          <template v-else>
            <p class="text-gray-500 italic">Silakan pilih menu di sebelah kiri.</p>
          </template>

        </div>
      </div>
    </div>



  </div>
    <footer class="bg-green-700 text-white text-center py-4">
      Copyright 2054 My_Tutor | Designed By BuangYuk
    </footer>
</template>



<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
