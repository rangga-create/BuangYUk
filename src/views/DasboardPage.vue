<script setup>
import { ref, defineComponent } from 'vue'
import GambarDasboard from '../components/GambarDasboard.vue'

const sampleTypes = ref([
  'Kertas', 'Plastik', 'Kaca', 'Tekstil',
  'Elektronik', 'Karet dan Karet Plastik',
  'Jenis Sampah Lainnya'
])


const steps = ref([
  { title: 'Tawarkan Sampah Anda', desc: 'Isi informasi sampah dan detailnya.' },
  { title: 'Luncurkan di Marketplace', desc: 'Publikasikan ke marketplace dan tunggu penawaran.' },
  { title: 'Beli Sampah untuk Kreasi Anda', desc: 'Beli dari berbagai jenis sampah sesuai kebutuhan Anda.' }
])






const SampleType = defineComponent({
  props: {
    label: String
  },
  template: `
    <div class="bg-white p-4 shadow rounded-xl text-center">
      <h4 class="font-semibold">{{ label }}</h4>
    </div>
  `
})
</script>

<template>
  <div class="bg-white text-gray-800">

<header class="bg-green-100 py-4 px-4 md:px-8">


  <div class="flex justify-between items-center">


    <div class="flex items-center gap-2">
      <img src="../components/img/Logo.png" alt="Logo" class="h-8" />
    </div>


    <nav class="hidden md:flex space-x-10 font-medium text-sm">
      <a href="#">Beranda</a>
      <a href="#">Edukasi</a>
      <a href="#">Dashboard</a>
      <a href="#">Tentang Kami</a>
    </nav>

    <div class="flex gap-2">
      <button class="border border-green-700 text-green-700 rounded-full px-3 py-1 text-sm font-medium">
        Masuk
      </button>
      <button class="bg-green-600 text-white rounded-full px-3 py-1 text-sm font-medium">
        Daftar
      </button>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-center px-4 md:px-0">
    <div class="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left py-8">


      <div class="md:w-1/2">
        <h1 class="text-3xl font-bold text-green-900 leading-snug">
          Ubah Sampah Jadi Rupiah
        </h1>
        <p class="text-gray-700 mt-1 text-sm">
          Jadi kontributor bijak dengan menjual sampah Anda sekarang!
        </p>
        <button class="mt-4 bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold">
          Jual Sampah
        </button>
      </div>


      <div class="md:w-1/2">
        <img
          src="../components/img/poster.png"
          alt="poster"
          class="w-64 md:w-80 mx-auto md:mx-0"
        />
      </div>

    </div>
  </div>

</header>



  <section class="py-16 px-4 md:px-12 text-center">
    <h2 class="text-2xl font-bold mb-10">Mengapa Bang Sampah?</h2>
    <div class="space-y-8 max-w-4xl mx-auto">
      <GambarDasboard
        title="Pengelolaan Sampah yang Mudah"
        text="Kami bantu Anda menemukan cara yang tepat untuk mengelola sampah Anda."
        :img="daurUlangImg"
        :reverse="false"
      />
      <GambarDasboard
        title="Dukungan UMKM Kreatif"
        text="Jual beli sampah untuk kreasi industri berkolaborasi dengan UMKM untuk mengolahnya."
        :img="umkmImg"
        :reverse="true"
      />
      <GambarDasboard
        title="Edukasi untuk Masa Depan Bersih"
        text="Informasi penting tentang pemilahan dan daur ulang."
        :img="eduImg"
        :reverse="false"
      />
    </div>
  </section>

    <section class="bg-gray-50 py-16 px-4 md:px-12">
      <h2 class="text-2xl font-bold text-center mb-10">Bagaimana Cara Kerja Bang Sampah?</h2>
      <ol class="space-y-10 max-w-3xl mx-auto">
        <li v-for="(step, index) in steps" :key="index" class="flex gap-4 items-start">
          <span class="bg-green-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {{ index + 1 }}
          </span>
          <div>
            <h3 class="font-semibold">{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </li>
      </ol>
    </section>


    <section class="py-16 px-4 md:px-12 bg-green-50">
      <h2 class="text-2xl font-bold text-center mb-10">Jenis Sampah Apa Saja yang Bisa Dijual?</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <SampleType v-for="type in sampleTypes" :key="type" :label="type" />
      </div>
    </section>


    <section class="py-16 px-4 md:px-12 bg-green-800 text-white">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Pelajari Cara Pemilahan Sampah Disini</h2>
        <p class="mb-6">Pemilahan sampah bantu kurangi volume dan lindungi lingkungan.</p>
        <button class="bg-white text-green-800 px-6 py-2 rounded-full font-semibold">Mulai pelajari cara pemilahan sampah</button>
      </div>
      <div class="grid md:grid-cols-3 gap-6 mt-10 text-center">
        <div class="bg-white text-green-900 p-6 rounded-xl">
          <h3 class="font-bold mb-2">Pendidikan & Pemahaman</h3>
          <p class="text-sm">Meningkatkan literasi tentang pengelolaan dan manfaat sampah.</p>
        </div>
        <div class="bg-white text-green-900 p-6 rounded-xl">
          <h3 class="font-bold mb-2">Kota Berkelanjutan</h3>
          <p class="text-sm">Menunjang kota bersih & inklusif lewat pengelolaan ideal.</p>
        </div>
        <div class="bg-white text-green-900 p-6 rounded-xl">
          <h3 class="font-bold mb-2">Konsumsi & Produksi</h3>
          <p class="text-sm">Mendukung gaya hidup ramah lingkungan dan daur ulang.</p>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 md:px-12 text-center">
      <h2 class="text-2xl font-bold text-green-800 mb-4">Berikan Sampahmu Nilai Lebih, Mulai Sekarang!</h2>
      <p class="mb-6">Setiap sampah memiliki nilai. Yuk mulai kontribusi sekarang.</p>
      <button class="bg-green-600 text-white px-6 py-2 rounded-full font-semibold">Mulai Isi Formulir Sampah</button>
    </section>


    <footer class="bg-green-900 text-white py-10 px-4 md:px-12">
      <div class="grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 class="font-bold mb-2">BangSampah</h4>
          <p>Telepon: +62-819-2046-7690</p>
          <p>Email: info@bangsampah.com</p>
        </div>
        <div>
          <h4 class="font-bold mb-2">Navigasi</h4>
          <p>Beranda</p>
          <p>Layanan</p>
          <p>Dashboard</p>
          <p>Tentang Kami</p>
        </div>
        <div>
          <h4 class="font-bold mb-2">Ikuti Kami</h4>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>WhatsApp</p>
        </div>
        <div>
          <p>&copy; KopiLestari | InovasiEcom 2054</p>
        </div>
      </div>
    </footer>
  </div>
</template>



<style>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
body {
  font-family: 'Inter', sans-serif;
}

</style>
