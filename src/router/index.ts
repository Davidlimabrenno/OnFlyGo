// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from 'src/layouts/MainLayout.vue'
import IndexPage from 'src/pages/IndexPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: '', name: 'Index', component: IndexPage }],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
