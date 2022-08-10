import Home from '../components/Home'
import AddMember from '../components/AddMember'
import UpdateMember from '../components/UpdateMember'

import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'AddMember',
        path: '/add-member',
        component: AddMember
    },
    {
        name: 'UpdateMember',
        path: '/update-member',
        component: UpdateMember
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;