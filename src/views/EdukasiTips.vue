<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const dropdownOpen = ref(false);

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
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const sampahList = [
  { jenis: 'Plastik', contoh: 'Botol air mineral, kantong belanja', perlakuan: 'Cuci & keringkan' },
  { jenis: 'Kertas', contoh: 'Koran, kardus, majalah', perlakuan: 'Kering & tidak berminyak' },
  { jenis: 'Logam', contoh: 'Kaleng minuman, tutup botol', perlakuan: 'Bilas dari sisa makanan/minuman' },
  { jenis: 'Kaca', contoh: 'Botol kaca, toples', perlakuan: 'Pastikan tidak pecah, bersihkan' },
  { jenis: 'Elektronik', contoh: 'Kabel, charger, ponsel rusak', perlakuan: 'Simpan aman, setor ke TPS terdekat' },
  { jenis: 'Residu & Organik', contoh: 'Opok bekas, tisu, sisa makanan', perlakuan: 'Tidak diterima oleh bank sampah' },
];


</script>


<template>
  <div class="bg-white text-gray-800">

<header class="bg-white text-black">
  <div class="container mx-auto px-32 py-3 flex items-center justify-between">

    <div class="flex items-center">
       <img
    src="/src/components/img/Logo.png"
    alt="Logo"
    class="w-28 h-8 mr-3  object-cover"
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
    class="w-10 h-10  object-cover"
  />

    </div>
    </div>
  </div>
</header>




 <nav class="bg-white shadow">
    <div class="container mx-auto px-4">
      <ul class="flex  justify-center items-center space-x-14 py-4 text-sm relative">
        <li
          v-for="(item, index) in navItems"
          :key="index"
          class="relative"
        >

          <div v-if="item.hasDropdown">
            <button
              @click="toggleDropdown"
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



   <div class=" py-10  relative h-52">
 <div
  class="relative h-52 bg-cover bg-center flex items-center justify-center"
  style="background-image: url('/src/components/img/baground.png');"
>
  <h1 class="text-white text-5xl font-bold">Edukasi & Tips</h1>
</div>


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
            <thead class="bg-green-700 text-white">
              <tr>
                <th class="px-4 py-2 border">No</th>
                <th class="px-4 py-2 border">Jenis Sampah</th>
                <th class="px-4 py-2 border">Contoh</th>
                <th class="px-4 py-2 border">Perlakuan Sebelum Disetor</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white" v-for="(item, index) in sampahList" :key="index">
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
          <li><span class="font-semibold">1 Botol Plastik = Energi Menyalakan Lampu 6 Jam</span><br />
            Mendaur ulang 1 botol plastik bisa menghemat energi yang cukup untuk menyalakan lampu LED selama 6 jam.
          </li>
          <li><span class="font-semibold">1 Ton Kertas Daur Ulang = Selamatan 17 Pohon</span><br />
            Jika 1.000 kg kertas didaur ulang, kita bisa mengurangi penebangan pohon secara signifikan.
          </li>
          <li><span class="font-semibold">Sampah Plastik Butuh 450 Tahun Terurai</span><br />
            Dengan daur ulang, kita bisa mencegah plastik mengendap di laut dan tanah selama berabad-abad.
          </li>
          <li><span class="font-semibold">Indonesia Penghasil Sampah Plastik Laut Terbesar Ke-2 di Dunia</span><br />
            Daur ulang adalah langkah kecil yang berdampak besar untuk mengubah peringkat ini.
          </li>
        </ul>
      </section>


      <section>
        <h3 class="text-xl font-bold mb-4">3. Dampak Lingkungan dari Sampah Tak Terkelola</h3>
        <blockquote class="italic text-gray-600 mb-4">
          "Satu orang menghasilkan 0,7 kg sampah per hari. Bayangkan 270 juta orang."
        </blockquote>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
          <li><span class="font-semibold">Pencemaran Udara</span><br />
            Pembakaran sampah terbuka menghasilkan gas berbahaya seperti dioksin dan karbon monoksida.
          </li>
          <li><span class="font-semibold">Kerusakan Ekosistem</span><br />
            8 juta ton plastik masuk ke laut setiap tahun. Ini membahayakan hewan laut dan masuk ke rantai makanan manusia.
          </li>
          <li><span class="font-semibold">Banjir</span><br />
            Sampah di aliran bisa menutup jalur air, merusak tanah, dan membunuh organisme penting dalam ekosistem.
          </li>
          <li><span class="font-semibold">Risiko Penyakit</span><br />
            Sampah menumpuk menutupi saluran air dan menciptakan sarang nyamuk penyebab DBD.
          </li>
        </ul>
      </section>
    </div>

    <footer class="bg-green-700 text-white text-center py-4 text-sm">
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
