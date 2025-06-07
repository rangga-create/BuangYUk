<script setup>
  import { ref } from 'vue'

const qty = ref(1)
const liked = ref(false)
const deleted = ref(false)

const increaseQty = () => {
  qty.value++
}

const decreaseQty = () => {
  if (qty.value > 1) {
    qty.value--
  }
}



const toggleLike = () => {
  liked.value = !liked.value
    if (liked.value) {
    alert('Barang telah disukai!');
  }
}

</script>


<template>


  <div class="flex min-h-screen bg-gradient-to-b from-[#051D19] via-[#051D19] to-[#0A7D68] text-[#333333]">

    <aside class="w-64 bg-gradient-to-b from-[#051D19] via-[#051D19] to-[#0A7D68] text-[#F8F4E1] p-6 min-h-screen">
  <h1 class="text-2xl font-bold mb-8 flex items-center gap-4">
    🗑️ <span>BuangYuk</span>
  </h1>

  <nav class="flex flex-col space-y-10 text-lg font-medium">
    <a href="#" class="hover:bg-green-900 rounded px-3 py-2 transform transition-all duration-300 ease-in-out hover:translate-x-2 hover:scale-[1.02]">🏠 Beranda</a>
    <a href="#" class="hover:bg-green-900 rounded px-3 py-2 transform transition-all duration-300 ease-in-out hover:translate-x-2 hover:scale-[1.02]">📘 Edukasi</a>
    <a href="#" class="hover:bg-green-900 rounded px-3 py-2 transform transition-all duration-300 ease-in-out hover:translate-x-2 hover:scale-[1.02]">📝 Input Sampah</a>
    <a href="#" class="hover:bg-green-900 rounded px-3 py-2 transform transition-all duration-300 ease-in-out hover:translate-x-2 hover:scale-[1.02]">📄 Riwayat Sampah</a>
    <a href="#" class="hover:bg-green-900 rounded px-3 py-2 transform transition-all duration-300 ease-in-out hover:translate-x-2 hover:scale-[1.02]">🎁 Penukaran Poin</a>
    <a href="#" class="hover:bg-green-900 rounded px-3 py-2 transform transition-all duration-300 ease-in-out hover:translate-x-2 hover:scale-[1.02]">⚙️ Setting</a>
  </nav>
</aside>




    <div class="flex-1 p-8 bg-gradient-to-b from-[#051D19] via-[#051D19] to-[#0A7D68] grid grid-cols-2 gap-6">


  <div class="space-y-6 flex flex-col">


   <!-- Pupuk Kompos -->
<div v-if="!deleted" class="bg-[#F8F4E1] rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
    <h2 class="text-2xl font-bold mb-3 text-[#333333]">Pupuk Kompos</h2>

    <img
      src="https://down-id.img.susercontent.com/file/sg-11134201-23010-h0vn1d8uwomv0d_tn"
      alt="Pupuk Kompos"
      class="w-full h-52 object-cover rounded-lg mb-3"
    />

    <div class="text-sm text-red-600 font-semibold mb-1">Sisa 3 stok</div>

    <p class="text-[#333333] text-sm leading-relaxed mb-3">
      Kompos berkualitas tinggi dari hasil daur ulang organik.<br />
      Rose Jelly, 35ml
    </p>

    <div class="text-right text-[#333333] font-bold text-lg mb-4">Rp75.800</div>


    <div class="flex items-center justify-between">

        <div class="flex items-center justify-center gap-4 text-xl mt-10">

<button
  @click="toggleLike"
  :class="[
    'transition-colors',
    'hover:text-red-400',
    liked ? 'text-red-500' : 'text-gray-600'
  ]"
  aria-label="Suka"
>
  <ion-icon :name="liked ? 'heart' : 'heart-dislike-outline'"></ion-icon>
</button>


    <ion-icon
      name="trash-outline"
      class="text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-300"

    ></ion-icon>
  </div>


     <div class="flex items-center bg-white rounded-lg px-3 py-2 border text-[#333333]">
  <button
    class="text-xl text-green-800 hover:text-green-600 font-bold"
    @click="decreaseQty"
    aria-label="Kurangi jumlah"
  >
    <ion-icon name="remove-circle-outline"></ion-icon>
  </button>

  <span class="text-base font-medium px-4">{{ qty }}</span>

  <button
    class="text-xl text-green-800 hover:text-green-600 font-bold"
    @click="increaseQty"
    aria-label="Tambah jumlah"
  >
    <ion-icon name="add-circle-outline"></ion-icon>
  </button>
</div>

    </div>
  </div>

    <!-- Delivery Info -->
    <div class="bg-[#F8F4E1] rounded-xl shadow p-6 flex-1">
  <h3 class="text-lg font-bold mb-6 text-[#333333]">Delivery Information</h3>
  <form class="grid grid-cols-2 gap-6 text-sm">
    <div class="flex flex-col">
      <label class="mb-1 font-medium text-[#333333]">Nama</label>
      <input
        type="text"
        value="Risa Anggriana"
        class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
    <div class="flex flex-col">
      <label class="mb-1 font-medium text-[#333333]">Nomor Telp</label>
      <input
        type="text"
        value="0812356372909"
        class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
    <div class="flex flex-col">
      <label class="mb-1 font-medium text-[#333333]">Email</label>
      <input
        type="email"
        value="risaangri@gmail.com"
        class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
    <div class="flex flex-col">
      <label class="mb-1 font-medium text-[#333333]">Kode Pos</label>
      <input
        type="text"
        value="546738"
        class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
    <div class="flex flex-col">
      <label class="mb-1 font-medium text-[#333333]">Kota</label>
      <input
        type="text"
        value="Depok"
        class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
    <div class="flex flex-col">
      <label class="mb-1 font-medium text-[#333333]">Negara</label>
      <input
        type="text"
        value="Indonesia"
        class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
    <div class="col-span-2 flex flex-col">
      <label class="mb-1 font-medium text-[#333333]">Alamat</label>
      <textarea
        rows="3"
        class="w-full p-2 rounded border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
      >Jl. Kamboja RT 007 RW 05 No. 21 Kampung areman, Cimanggis, Depok, Jawa Barat</textarea>
    </div>
  </form>
</div>

  </div>

  <!-- Kolom Kanan: Order Summary -->
 <div class="bg-[#F8F4E1] rounded-xl shadow p-6 flex flex-col justify-between h-full">
  <div>
    <button
      class="text-sm text-[#333333] mb-6 hover:text-green-600 transition-colors"
      aria-label="Kembali ke pesanan"
    >
      ← Kembali ke pesanan
    </button>

    <h3 class="text-xl font-bold mb-6 border-b pb-6 border-gray-300">Order Summary</h3>

    <div class="space-y-20  text-sm">

<div class="space-y-2">
  <label class="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="payment" checked class="peer hidden" />
    <span class="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-[#F99955] flex items-center justify-center">

    </span>
    <span class="peer-checked:text-[#F99955] text-gray-400">Online Payment</span>
  </label>

  <label class="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="payment" class="peer hidden" />
    <span class="w-4 h-4  rounded-full border-2 border-gray-400 peer-checked:border-[#F99955] flex items-center justify-center">

    </span>
    <span class="peer-checked:text-[#F99955] text-gray-400">Cash on delivery</span>
  </label>

  <label class="flex items-center gap-2 cursor-pointer border-b pb-4 border-gray-300">
    <input type="radio" name="payment" class="peer hidden" />
    <span class="w-4 h-4  rounded-full border-2 border-gray-400 peer-checked:border-[#F99955] flex items-center justify-center">

    </span>
    <span class="peer-checked:text-[#F99955] text-gray-400">Post on delivery</span>
  </label>
</div>



      <div class="flex   items-center gap-2 border-b pb-6 border-gray-300">
        <input
          type="text"
          placeholder="Add Promo"
          class="flex-1 p-2 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          class="bg-[#00423E] hover:bg-[#68AA62] text-white px-4 py-1   rounded-full transition-colors"
          aria-label="Apply promo code"
        >
          Apply
        </button>
      </div>

      <div class="mt-4 space-y-2">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>Rp 20.000</span>
        </div>
        <div class="flex justify-between">
          <span>Delivery Fee</span>
          <span>Rp 5.000</span>
        </div>
        <div class="flex justify-between">
          <span>Coupon Discount</span>
          <span class="text-gray-500">Tidak tersedia</span>
        </div>
        <div class="flex justify-between">
          <span>Taxes</span>
          <span>Rp 100</span>
        </div>
        <div class="flex justify-between font-bold text-lg border-t border-gray-300 pt-6">
          <span>Total</span>
          <span>Rp 25.100</span>
        </div>
      </div>
    </div>
  </div>

  <button
    class="w-full mt-6 bg-[#00423E] hover:bg-[#68AA62] text-white py-3 rounded-full text-lg font-semibold transition-colors"
    aria-label="Confirm Order"
  >
    Confirm Order
  </button>
</div>


</div>



  </div>
</template>



<style scoped>
.bg-beige {
  background-color: #fefcf2;
}
.bg-cream {
  background-color: #fef9ec;
}
</style>
