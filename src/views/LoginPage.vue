<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)

const login = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const foundUser = users.find(user => user.email === form.email && user.password === form.password)

  if (foundUser) {
    alert('Login berhasil!')
    localStorage.setItem('loggedInUser', JSON.stringify(foundUser))
    router.push('/home')
  } else {
    alert('Email atau password salah!')
  }

  form.email = ''
  form.password = ''
}

const goToRegister = () => {
  router.push('/register')
}

</script>

<template>
  <div class="min-h-screen flex  bg-gradient-to-br from-[#0B3C36] via-[#0A7D68] to-[#B2DFDB]">
    <div class="absolute text-3xl font-bold text-white left-10 italic top-8"> <img src="../components/img/Logo.png" alt=""></div>

    <div class="w-[45%] flex justify-center items-center p-8">
      <div class="max-w-md w-full">
        <div class="text-center mb-6">
         <p class="text-[#C2EABA] text-[24px] font-semibold">Bijak Buang Sampah, Selamatkan Masa Depan</p>
        </div>

        <div class="bg-[#0F2F2B]/70 text-white p-8 rounded-lg">
          <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>

          <div class="mb-4">
            <label for="email" class="block text-sm font-medium mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              placeholder="Input your email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7D68]"
            />
          </div>

          <div class="mb-6">
            <label for="password" class="block text-sm font-medium mb-2">Password</label>
            <div class="relative">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Input your password"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7D68]"
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

          <button
            @click="login"
            class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-[#0A7D68] transition font-medium mb-4"
          >
            Sign In
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
            Don't have an account?
   <button
  @click="goToRegister"
  class="text-green-300 hover:text-green-200 hover:underline font-semibold transition duration-200 ml-1"
>
  Sign Up
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
        class="object-cover w-full  h-[1000px]"
      />
    </div>
  </div>
</template>
