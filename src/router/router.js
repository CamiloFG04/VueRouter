import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "./auth-guard";
const routes = [
    { 
        path: '/', 
        redirect: '/dbz'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/* webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout'),
        children:[
            { 
                path: 'home',
                name: 'pokemon-home',
                component: () => import(/* webpackChunkName: "ListPage" */ '@/modules/pokemon/pages/ListPage')
            },
            { 
                path: 'about', 
                name: 'pokemon-about',
                component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/pokemon/pages/AboutPage')
            },
            { 
                path: ':id', 
                name: 'pokemon-id',
                component: () => import(/* webpackChunkName: "PokemonPage" */ '@/modules/pokemon/pages/PokemonPage'),
                props: (route) =>{
                    const id = Number(route.params.id)
                    return isNaN(id) ? {id:1} : {id}
                }
            },
            {
                path: '',
                name:'default-pokemon',
                redirect: {name:"pokemon-home"}
            }
        ]
    },
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import(/* webpackChunkName: "PokemonLayout" */ '@/modules/dbz/layouts/DbzLayout'),
        children:[
            {
                path: 'characters',
                name: 'dbz-characters',
                component: () => import(/* webpackChunkName: "DbzCharacters" */ '@/modules/dbz/pages/CharactersPage')
            },
            {
                path: 'about',
                name: 'dbz-about',
                component: () => import(/* webpackChunkName: "DbzCharacters" */ '@/modules/dbz/pages/AboutPage')
            },
            {
                path: '',
                name:'default-dbz',
                redirect: {name:'dbz-characters'}
            }
        ]
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NoPageFound')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// Global Guard Sync
// router.beforeEach((to,from,next)=>{
    // const random = Math.random() * 100
    // if (random > 50) {
    //     next()
    // }else{
    //     next({name:'pokemon-home'})
    // }
// })

// Global Guard Async
// const canAccess = () => {
//     return new Promise(resolve =>{
//         const random = Math.random() * 100
//         if (random > 50) {
//             resolve(true)
//         }else{
//             resolve(false)
//         }
//     })
// }

// router.beforeEach( async(_,__,next) => {
//     const authorized = await canAccess()
//     authorized ? next() : next({name:'pokemon-home'})
// })

export default router