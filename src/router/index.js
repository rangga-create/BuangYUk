import{ createRouter, createWebHistory } from 'vue-router'


const Home = () => import ('../views/HomePage.vue')
const Login = () => import('../views/LoginPage.vue')
const About = () => import('../views/RegisterPage.vue')
// const anime = () => import('../views/AnimeJs.vue')
const edukasi = () => import('../views/EdukasiTips.vue')
const penukaran = () => import ('../views/PenukaranPoint.vue')
const input = () => import ('../views/InputSampah.vue')
const profil = () => import ('../views/ProfilPage.vue')
const dasboard = () => import ('../views/DasboardPage.vue')
const Riwayat = () => import ('../views/RiwayatSampah.vue')
const BankSampah = () => import ('../views/BankSampah.vue')

const routes = [
{ path: '/Home', component: Home},
  { path: '/Login',component: Login },
  { path: '/Register', component: About },
  // {path: '/anim', component: anime },
  {path : '/edukasi', component: edukasi },
  {path : '/penukaran', component: penukaran},
  {path : '/input', component: input},
  {path: '/profil', component:profil},
  {path: '/', component: dasboard},
  {path: '/riwayat', component: Riwayat},
  {path: '/BankSampah', component: BankSampah},


]

const router = createRouter({
  history: createWebHistory(),
  routes,
    scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('loggedInUser')
  if (to.path === '/Home' && !isAuthenticated) {
    next('/Login')
  } else {
    next()
  }
})

export default router



