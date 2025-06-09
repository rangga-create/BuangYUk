<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const register = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []

  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    alert('Semua field wajib diisi!')
    return
  }

  if (form.password !== form.confirmPassword) {
    alert('Password dan konfirmasi tidak cocok!')
    return
  }

  const isEmailTaken = users.some((user) => user.email === form.email)
  if (isEmailTaken) {
    alert('Email sudah terdaftar!')
    return
  }

  users.push({
    name: form.name,
    email: form.email,
    password: form.password,
  })

  localStorage.setItem('users', JSON.stringify(users))
  alert('Registrasi berhasil!')

  form.name = ''
  form.email = ''
  form.password = ''
  form.confirmPassword = ''


  router.push('/login')
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-br from-[#0B3C36] via-[#0A7D68] to-[#B2DFDB]">
    <h1 class="absolute text-3xl font-bold text-white left-10 top-8 italic "><img src="/public/img/Logo.png" alt=""></h1>

    <div class="w-[45%] flex justify-center items-center p-8">
      <div class="max-w-md w-full">
        <div class="mb-6 text-center">
          <p class="text-[#C2EABA] text-[28px]">Bijak Buang Sampah, Selamatkan Masa Depan</p>
        </div>

        <div class="bg-[#0F2F2B]/70 text-white p-8 rounded-lg">
          <h2 class="text-2xl font-semibold mb-6 text-center">Create Account</h2>


          <div class="mb-4">
            <label for="name" class="block text-sm font-medium mb-2">Full Name</label>
            <input
              id="name"
              type="text"
              v-model="form.name"
              placeholder="Input your full name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7D68] text-white"
            />
          </div>

          <div class="mb-4">
            <label for="email" class="block text-sm font-medium mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              placeholder="Input your email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7D68] text-white"
            />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium mb-2">Password</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="form.password"
                placeholder="Create your password"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7D68] text-white"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <span class="text-sm text-white">{{ showPassword ? 'Hide' : 'Show' }}</span>
              </button>
            </div>
          </div>

          <div class="mb-6">
            <label for="confirm-password" class="block text-sm font-medium mb-2"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="form.confirmPassword"
                placeholder="Confirm your password"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7D68] text-white"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <span class="text-sm text-white">{{ showConfirmPassword ? 'Hide' : 'Show' }}</span>
              </button>
            </div>
          </div>

          <button
            @click="register" to="../views/LoginPage.vue"
            class="w-full bg-[#0A7D68] text-white py-2 px-4 rounded-md hover:bg-[#086652] transition mb-4 font-medium"
          >
            Sign Up
          </button>

          <div class="flex items-center my-6">
            <div class="flex-grow border-t border-gray-300"></div>
            <span class="mx-4 text-white text-sm">OR</span>
            <div class="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            class="w-full bg-white text-gray-800 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center mb-6 font-medium"
          >
              <ion-icon name="logo-google" class="mr-8 "></ion-icon>
            Continue with Google
          </button>

          <div class="text-center text-sm text-white">
            Already have an account?
       <button
  @click="goToLogin"
  class="text-green-300 hover:text-green-200 hover:underline font-semibold transition duration-200"
>
  Sign In
</button>

          </div>
        </div>

        <div class="flex justify-center space-x-6 text-sm text-white mt-8">
          <router-link to="/about" class="hover:text-green-300">About</router-link>
          <router-link to="/terms" class="hover:text-green-300">Terms & Conditions</router-link>
          <router-link to="/privacy" class="hover:text-green-300">Privacy Policy</router-link>
        </div>
      </div>
    </div>

    <div class="w-[55%] bg-green-100 flex items-center justify-center">
      <img
        src="https://plus.unsplash.com/premium_photo-1737180621224-bdddbe8df9a2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF1ciUyMHVsYW5nfGVufDB8fDB8fHww"
        alt="Waste Management"
        class="object-cover w-full h-[1000px]"
      />
    </div>
  </div>
</template>
