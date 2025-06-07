<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TreeGrowAnimation from './views/LoadingPage.vue'


const loading = ref(false)
const router = useRouter()

router.beforeEach((to, from, next) => {
  loading.value = true

  const start = Date.now()

  const proceed = () => {
    loading.value = false
    next()
  }

  const minDuration = 4000

  const elapsed = Date.now() - start
  const waitTime = elapsed < minDuration ? minDuration - elapsed : 0

  setTimeout(proceed, waitTime)
})
</script>

<template>

  <div>

    <TreeGrowAnimation v-if="loading" />
    <router-view v-else />

  </div>
</template>
