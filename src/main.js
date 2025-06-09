import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import id from '../src/Bahasa/id.json'
import en from '../src/Bahasa/en.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'id',
  fallbackLocale: 'id',
  messages: { id, en }
})


createApp(App).use(router).use(i18n).mount('#app')





