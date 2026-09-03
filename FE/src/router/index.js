import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import PostingListView from '@/views/PostingListView.vue'
import PostingDetailView from '@/views/PostingDetailView.vue'

const routes = [
  { path: '/', name: 'posting-list', component: PostingListView },
  {
    path: '/postings/:externalPostingId',
    name: 'posting-detail',
    component: PostingDetailView,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true },
  },

  {
    path: '/recommendations',
    name: 'recommendation-list',
    component: () => import('@/views/RecommendationListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/recommendations/items/:recommendationItemId',
    name: 'recommendation-item',
    component: () => import('@/views/RecommendationItemView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },

  {
    path: '/applications',
    name: 'application-list',
    component: () => import('@/views/ApplicationListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/applications/new',
    name: 'application-create',
    component: () => import('@/views/ApplicationCreateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/applications/:applicationId',
    name: 'application-workspace',
    component: () => import('@/views/ApplicationWorkspaceView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },

  {
    path: '/experiences',
    name: 'experience-list',
    component: () => import('@/views/ExperienceListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/experiences/new',
    name: 'experience-create',
    component: () => import('@/views/ExperienceEditView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/experiences/:experienceId/edit',
    name: 'experience-edit',
    component: () => import('@/views/ExperienceEditView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    if (to.name === 'application-create') {
      auth.setPendingIntent({
        externalPostingId: to.query.externalPostingId,
        recommendationItemId: to.query.recommendationItemId,
        returnTo: to.fullPath,
      })
    }
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'posting-list' }
  }

  return true
})

export default router
