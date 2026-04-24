import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'STEMHub Uganda — Driving Innovation in STEM Teaching & Learning' },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: 'About Us — STEMHub Uganda' },
    },
    {
        path: '/programs',
        name: 'programs',
        component: () => import('@/views/ProgramsView.vue'),
        meta: { title: 'Our Programs — STEMHub Uganda' },
    },
    {
        path: '/programs/:id',
        name: 'program-detail',
        component: () => import('@/views/ProgramDetailView.vue'),
        meta: { title: 'Program — STEMHub Uganda' },
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/views/ContactView.vue'),
        meta: { title: 'Contact Us — STEMHub Uganda' },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { el: to.hash, behavior: 'smooth' }
        return { top: 0, behavior: 'smooth' }
    },
})

router.afterEach((to) => {
    document.title = to.meta.title || 'STEMHub Uganda'
})

export default router