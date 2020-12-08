import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Categorias from '../views/Categorias.vue'
import Columnas from '../views/Columnas.vue'
import Memora from '../views/Memora.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Categorias',
        name: 'Categoria',
        component: Categorias
    },
    {
        path: '/Columnas',
        name: 'Columnas',
        component: Columnas
    },
    {
        path: '/Memora',
        name: 'Memora',
        component: Memora
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router