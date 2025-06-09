<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'


import Logo from '../components/img/Logo.png'
import Poster from '../components/img/poster.png'
import Pengelolaan from '../components/img/pengelolaan.png'
import UMKM from '../components/img/umkm.png'
import Edukasi2 from '../components/img/edukasi2.png'
import Ilustrasi from '../components/img/Ilustrasi.png'

import GambarDasboard from '../components/GambarDasboard.vue'
import JenisSampah from '../components/JenisSampah.vue'

const router = useRouter()

const isLoggedIn = ref(false)
const user = ref(null)

const sampleTypes = ref([
  {
    label: 'Kertas',
    img: 'https://udsregep.com/wp-content/uploads/2023/01/kertas-1024x576.jpg',
    description: 'Sampah kertas untuk didaur ulang.'
  },
  {
    label: 'Plastik',
    img: 'https://www.rumahmesin.com/wp-content/uploads/2016/11/banyak-botol-plastik-di-rumah-manfaatkan-30-ide-kreatif-daur-ulang-botol-plastik-8.jpg',
    description: 'Berbagai jenis plastik dapat dijual.'
  },
  {
    label: 'Kaca',
    img: 'https://daaitv.co.id/DAAI-WP/wp-content/uploads/2022/10/Kerajinan-Kaca-Tiup-dari-Bali-dari-tim-liputan-Halo-Indonesia-DAAI-TV.jpg',
    description: 'Botol dan pecahan kaca yang dapat didaur ulang.'
  },
  {
    label: 'Tekstil',
    img: 'https://tse1.mm.bing.net/th?id=OIP.G9-PqSSBU8uKoQ_kQ0kBiwHaEK&pid=Api&P=0&h=180',
    description: 'Sampah kain dan bahan tekstil bekas.'
  },
  {
    label: 'Elektronik',
    img: 'https://retron.id/wp-content/uploads/2022/05/retron-mekanisme-daur-ulang-sampah-elektronik.jpg',
    description: 'Sampah elektronik bekas yang masih bisa diproses.'
  },
  {
    label: 'Karet dan Karet Plastik',
    img: 'https://media.istockphoto.com/id/1413322679/id/foto/daur-ulang-karet-dan-plastik-pabrik-pengolahan-polusi-alam-bencana-lingkungan.jpg?s=170667a&w=0&k=20&c=WRX4mI2idHJCpv5Ya_cDsDl8PTr1AGglafJJvOwuMmA=',
    description: 'Sampah karet dan plastik karet yang bisa didaur ulang.'
  },
  {
    label: 'Jenis Sampah Lainnya',
    img: 'https://media.istockphoto.com/id/2182036209/id/vektor/simbol-daur-ulang-plastik-lainnya-7-kode-daur-ulang-plastik-lainnya-7-ilustrasi-vektor.jpg?s=170667a&w=0&k=20&c=hdSb9Wy0CjsSZp0bw8d_YQ0ddjLFeMeapr_AUQQERJI=',
    description: 'Sampah lain yang tidak termasuk kategori di atas.'
  }
])

const steps = ref([
  { title: 'Tawarkan Sampah Anda', desc: 'Isi informasi sampah dan detailnya.' },
  { title: 'Luncurkan di Marketplace', desc: 'Publikasikan ke marketplace dan tunggu penawaran.' },
  { title: 'Beli Sampah untuk Kreasi Anda', desc: 'Beli dari berbagai jenis sampah sesuai kebutuhan Anda.' }
])

const navigateTo = (path) => router.push(path)

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
})

const handleInputClick = () => {
  if (!isLoggedIn.value) {
    alert('Anda harus login terlebih dahulu untuk mengisi formulir sampah.')
    navigateTo('/Register')
    return
  }

  navigateTo('/input')
}

const handlePelajariClick = () => {
  if (!isLoggedIn.value) {
    alert('Anda harus login terlebih dahulu untuk mulai belajar.')
    navigateTo('/Register')
    return
  }

  navigateTo('/home')
}
</script>

<template>
  <div class="bg-white text-gray-800">

    <header class="bg-green-100 py-4 px-4 md:px-8">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <img :src="Logo" alt="Logo" class="h-8" />
        </div>


        <nav class="hidden md:flex space-x-10 font-medium text-sm">
          <router-link to="/home" class="hover:text-green-600">Beranda</router-link>
          <router-link to="/edukasi" class="hover:text-green-600">Edukasi</router-link>
          <router-link to="/" class="hover:text-green-600">Dashboard</router-link>
          <router-link to="#tentang-kami" hash="#tentang-kami" class="hover:text-green-600">Tentang Kami</router-link>
        </nav>
<div class="flex gap-2 items-center">

  <template v-if="isLoggedIn && user">
    <img
      :src="user.photo || 'https://images.unsplash.com/photo-1572573309811-48474d1891b7?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
      alt="profil"
      class="w-10 h-10 rounded-full object-cover"
    />
    <span class="text-sm text-black font-medium">{{ user.name }}</span>
    <button
      @click="() => {
        localStorage.removeItem('loggedInUser')
        isLoggedIn.value = false
        user.value = null
        navigateTo('/home')
      }"
      class="border border-red-600 text-red-600 rounded-full px-3 py-1 text-sm font-medium hover:bg-red-100 transition"
    >
      Keluar
    </button>
  </template>


  <template v-else>
    <button
      @click="navigateTo('/Login')"
      class="border border-green-700 text-green-700 rounded-full px-3 py-1 text-sm font-medium hover:bg-green-50 transition"
    >
      Masuk
    </button>
    <button
      @click="navigateTo('/Register')"
      class="bg-green-600 text-white rounded-full px-3 py-1 text-sm font-medium hover:bg-green-700 transition"
    >
      Daftar
    </button>
  </template>
</div>




      </div>

      <div class="mt-6 flex items-center justify-center px-4 md:px-0">
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left py-8">
          <div class="md:w-1/2">
            <h1 class="text-4xl font-bold text-green-900 leading-snug">
              Ubah Sampah <br />
              Jadi <span class="text-green-600">Rupiah</span>
            </h1>
            <p class="text-gray-700 mt-1 text-sm">
              Jadi kontributor bijak dengan menjual <br /> sampah Anda sekarang!
            </p>
            <button
              @click="navigateTo('/penukaran')"
              class="mt-4 bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition"
            >
              Tukarkan Point
            </button>
          </div>

          <div class="md:w-1/2">
            <img :src="Poster" alt="poster" class="w-64 md:w-80 mx-auto md:mx-0" />
          </div>
        </div>
      </div>
    </header>


    <section class="py-16 px-4 md:px-12 text-center">
      <h2 class="text-2xl font-bold mb-32">Mengapa Bang Sampah?</h2>
      <div class="space-y-8 max-w-4xl mx-auto">
        <GambarDasboard
          title="Pengelolaan Sampah yang Mudah"
          text="Kami bantu Anda menemukan cara yang tepat untuk mengelola sampah Anda."
          :img="Pengelolaan"
          :reverse="false"
        />
        <GambarDasboard
          title="Dukungan UMKM Kreatif"
          text="Jual beli sampah untuk kreasi industri berkolaborasi dengan UMKM untuk mengolahnya."
          :img="UMKM"
          :reverse="true"
        />
        <GambarDasboard
          title="Edukasi untuk Masa Depan Bersih"
          text="Informasi penting tentang pemilahan dan daur ulang."
          :img="Edukasi2"
          :reverse="false"
        />
      </div>
    </section>


    <section class="bg-gray-50 py-16 px-4 md:px-12 mb-12">
      <h2 class="text-2xl font-bold text-center mb-14">Bagaimana Cara Kerja Bang Sampah?</h2>

      <ol class="relative max-w-3xl mx-auto">
        <li
          v-for="(step, index) in steps"
          :key="index"
          class="relative pl-12 mb-10 last:mb-0"
        >
          <div
            v-if="index < steps.length - 1"
            class="absolute left-4 top-8 bottom-0 h-20 w-px bg-green-300"
          ></div>

          <div
            class="absolute left-0 top-0 w-8 h-8 bg-green-600 text-white font-bold rounded-full flex items-center justify-center z-10"
          >
            {{ index + 1 }}
          </div>

          <div>
            <h3 class="font-semibold mb-1">{{ step.title }}</h3>
            <p class="text-gray-700">{{ step.desc }}</p>
          </div>
        </li>
      </ol>
    </section>


    <section class="py-16 px-4 md:px-12 bg-green-50">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-green-800 mb-10">Jenis Sampah Apa Saja yang Bisa Dijual?</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <JenisSampah
            v-for="item in sampleTypes"
            :key="item.label"
            :label="item.label"
            :img="item.img"
            :description="item.description"
          />
        </div>
      </div>
    </section>


    <section class="py-20 px-6 md:px-12 bg-green-50 text-green-900">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="md:w-1/2 text-center md:text-left">
          <h2 class="text-4xl font-extrabold mb-4 text-green-800 leading-snug">
            Pelajari Cara Pemilahan Sampah di Sini
          </h2>
          <p class="mb-6 text-green-700 text-base md:text-lg leading-relaxed">
            Pemilahan sampah membantu mengurangi volume sampah dan melindungi lingkungan. Mulai dari langkah kecil untuk perubahan besar.
          </p>
        <button
  @click="handlePelajariClick"
  class="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold shadow-md transition duration-300"
>
  Mulai Pelajari Sekarang
</button>
        </div>

        <div class="md:w-1/2">
          <img
            :src="Ilustrasi"
            alt="Ilustrasi Pemilahan Sampah"
            class="border-miring w-full h-[350px] max-w-md mx-auto rounded-2xl border border-green-200 shadow-lg object-cover"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto text-center">
        <div class= "border-miring  bg-white text-green-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 class="font-bold text-xl mb-2">Pendidikan & Pemahaman</h3>
          <p class="text-sm leading-relaxed">
            Meningkatkan literasi tentang pengelolaan dan manfaat daur ulang sampah.
          </p>
        </div>
        <div class="border-miring   bg-white text-green-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 class="font-bold text-xl mb-2">Kota Berkelanjutan</h3>
          <p class="text-sm leading-relaxed">
            Menunjang kota yang bersih dan inklusif melalui pengelolaan sampah yang efektif.
          </p>
        </div>
        <div class="border-miring   bg-white text-green-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 class="font-bold text-xl mb-2">Konsumsi & Produksi</h3>
          <p class="text-sm leading-relaxed">
            Mendukung gaya hidup ramah lingkungan dengan daur ulang yang bijak.
          </p>
        </div>
      </div>
    </section>


    <section class="bg-green-50 py-16 px-4 md:px-12 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-green-800 mb-4">
          Berikan Sampahmu Nilai Lebih, Mulai Sekarang!
        </h2>
        <p class="text-gray-700 mb-6">
          Setiap sampah memiliki nilai. Yuk mulai kontribusi untuk lingkungan yang lebih baik.
        </p>
      <button
  @click="handleInputClick"
  class="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-full font-semibold"
>
  Mulai Isi Formulir Sampah
</button>
      </div>
    </section>


    <footer id="tentang-kami" class="bg-green-900 text-white py-10 px-4 md:px-12">
      <div class="grid md:grid-cols-4 gap-24 text-sm mb-6">
        <div>
          <img :src="Logo" alt="Logo BangSampah" class="mb-8" />
          <p>Telepon: +62-819-2046-7690</p>
          <p>Email: info@bangsampah.com</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">Navigasi</h4>
          <router-link to="/beranda" class="cursor-pointer hover:underline">Beranda</router-link>
          <router-link to="/edukasi" class="cursor-pointer hover:underline block mt-1">Edukasi</router-link>
          <router-link to="/" class="cursor-pointer hover:underline block mt-1">Dashboard</router-link>
          <router-link to="/" hash="#tentang-kami" class="cursor-pointer hover:underline block mt-1">
            Tentang Kami
          </router-link>
        </div>
        <div>
          <h4 class="font-bold mb-3">Layanan</h4>
          <router-link to="/Login" class="cursor-pointer hover:underline block mt-1">Login</router-link>
          <router-link to="/Register" class="cursor-pointer hover:underline block mt-1">Daftar</router-link>
        </div>
        <div>
          <h4 class="font-bold mb-3">Media Sosial</h4>
          <ul class="space-y-1">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="hover:underline">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p class="text-center text-sm text-green-300">
        &copy; 2023 BuangYuk. Semua hak cipta dilindungi.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.border-miring {
  border-radius: 48% 12% 12% 48% / 48% 48% 12% 12%;
}
</style>
