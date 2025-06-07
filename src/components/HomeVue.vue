<script setup>
const emit = defineEmits(['logout'])

const logout = () => {
  // Clear the logged-in user from localStorage
  localStorage.removeItem('loggedInUser')
  // Emit the logout event
  emit('logout', true)
}
</script>

<template>
  <div>
    <h1>Selamat datang di Beranda!</h1>
    <button @click="logout">Logout</button>
  </div>
</template>
