import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AddPicturePage from '@/pages/AddPicturePage.vue'
import PictureDetails from '@/pages/PictureDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/add_picture',
      name: 'addPicture',
      component: AddPicturePage
    },
    {
      path: '/picture/:id',
      name: 'pictureDetails',
      component: PictureDetails,
      props: true
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('../pages/user/UserLoginPage.vue'),
    },
    {
      path: '/user/register',
      name: 'register',
      component: () => import('../pages/user/UserRegisterPage.vue'),
    },
    {
      path: '/admin/userManage',
      name: 'userManage',
      component: () => import('../pages/admin/userManagePage.vue'),
    },
    {
      path: '/admin/pictureManagePage',
      name: 'pictureManagePage',
      component: () => import('../pages/admin/pictureManagePage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
