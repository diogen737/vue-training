import { createRouter, createWebHistory } from 'vue-router';

import MovieList from '@/pages/MovieList.vue';
import MovieDetail from '@/pages/MovieDetail.vue';
import SimpleCalculator from '@/pages/SimpleCalculator.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/movies'
    },
    {
      path: '/movies',
      children: [
        {
          path: '',
          component: MovieList
        },
        {
          path: ':id',
          component: MovieDetail
        }
      ]
    },
    {
      path: '/calculator',
      component: SimpleCalculator
    }
    // {
    //   path: '/tic-tac-toe',
    //   component: '',
    // },
  ]
});
