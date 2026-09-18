import { createRouter, createWebHistory } from 'vue-router'
import SolutionMatrixView from '@/views/SolutionMatrixView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'solution-matrix',
      component: SolutionMatrixView,
    },
  ],
})

export default router
