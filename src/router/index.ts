import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AddPicturePage from '@/pages/AddPicturePage.vue'
import PictureDetails from '@/pages/PictureDetails.vue'
import BatchAddPicturePage from '@/pages/BatchAddPicturePage.vue'
import AddSpacePage from '@/pages/AddSpacePage.vue'
import AdminUpdateSpacePage from '@/pages/AdminUpdateSpacePage.vue'
import MySpacePage from '@/pages/MySpacePage.vue'
import SpaceDetails from '@/pages/SpaceDetails.vue'
import SpaceAnalyzePage from '@/pages/SpaceAnalyzePage.vue'
import SpaceUserManagePage from '@/pages/admin/SpaceUserManagePage.vue'

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
      path: '/batch_add_picture',
      name: 'batchAddPicture',
      component: BatchAddPicturePage
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
      component: () => import('../pages/admin/UserManagePage.vue'),
    },
    {
      path: '/admin/pictureManagePage',
      name: 'pictureManagePage',
      component: () => import('../pages/admin/PictureManagePage.vue'),
    },
    {
      path: '/admin/spaceManagePage',
      name: 'spaceManagePage',
      component: () => import('../pages/admin/spaceManagePage.vue'),
    },
    {
      path: '/add_space',
      name: 'addSpace',
      component: AddSpacePage
    },
    {
      path: '/admin/update_space',
      name: 'updateSpace',
      component: AdminUpdateSpacePage
    },
    {
      path: '/my_space',
      name: '我的空间',
      component: MySpacePage,
    },
    {
      path: '/space/:id',
      name: 'spaceDetails',
      component: SpaceDetails,
      props: true
    },
    {
      path: '/space_analyze',
      name: 'spaceAnalyze',
      component: SpaceAnalyzePage,
      props: true
    },
    {
      path: '/space_user',
      name: 'spaceUser',
      component: SpaceUserManagePage
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
