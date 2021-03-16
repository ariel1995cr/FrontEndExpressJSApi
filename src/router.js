import { createRouter, createWebHashHistory } from 'vue-router';
import PeliculasIndex from './pages/Peliculas/index.vue';
import PeliculasAgregar from './pages/Peliculas/agregar.vue';

import ClasificacionIndex from './pages/Clasificaciones//index.vue';
import ClasificacionAgregar from './pages/Clasificaciones/agregar.vue';
const routes = [
    {
        path: '/',
        name: 'peliculas.index',
        component: PeliculasIndex,
    },
    {
        path: '/Peliculas/Agregar',
        name: 'peliculas.agregar',
        component: PeliculasAgregar,
    },
    {
        path: '/Clasificacion',
        name: 'clasificacion.index',
        component: ClasificacionIndex,
    },
    {
        path: '/Clasificacion/Agregar',
        name: 'clasificacion.agregar',
        component: ClasificacionAgregar,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
