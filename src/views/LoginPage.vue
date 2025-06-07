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
  <div class="min-h-screen flex bg-gradient-to-b from-[#051D19] via-[#051D19] to-[#0A7D68]">
    <h1 class="absolute text-3xl font-bold text-white left-10 italic top-8">BuangYuk 🍃</h1>

    <div class="w-[45%] flex justify-center items-center p-8">
      <div class="max-w-md w-full">
        <div class="text-center mb-6">
          <p class="text-[#68AA62] text-[28px]">Bijak Buang Sampah, Selamatkan Masa Depan</p>
        </div>

        <div class="text-white p-8 rounded-lg">
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
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div class="text-center text-sm text-white">
            Don't have an account?
            <button @click="goToRegister" class="text-green-400 hover:underline font-medium ml-1">Sign Up</button>
          </div>
        </div>

        <div class="flex justify-center space-x-6 text-sm text-white mt-8">
          <router-link to="/about" class="hover:text-[#0A7D68]">About</router-link>
          <router-link to="/terms" class="hover:text-[#0A7D68]">Terms & Conditions</router-link>
          <router-link to="/privacy" class="hover:text-[#0A7D68]">Privacy Policy</router-link>
        </div>
      </div>
    </div>

    <div class="w-[55%] bg-green-100 flex items-center justify-center">
      <img
        src="https://i.pinimg.com/736x/f5/0a/0f/f50a0fa0e97e68b634a6d11e1ede09eb.jpg"
        alt="Waste Management"
        class="object-cover w-full h-[1000px]"
      />
    </div>
  </div>
</template>
