import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from "../components/HelloWorld.vue";
import Details from "../components/Details.vue"



const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/details',
        name: 'Details',
        component: Details,
        props: true,
    }
]

const router = createRouter({
    history: createWebHistory(), routes, mode: 'abstract',
})
export default router