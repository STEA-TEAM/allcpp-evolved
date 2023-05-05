import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'event' },
      {
        name: 'event',
        path: 'event',
        components: {
          default: () => import('pages/EventPage.vue'),
          drawer: () => import('layouts/drawers/MainDrawer.vue'),
          header: () => import('layouts/headers/MainHeader.vue'),
        },
      },
    ],
  },

  // Always leave this as the last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
