import './assets/main.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import App from './App.vue';
import MovieList from '@/pages/MovieList.vue';
import MovieDetail from '@/pages/MovieDetail.vue';

createApp(App)
  .use(createPinia())
  .use(
    createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: MovieList
        },
        {
          path: '/:id',
          component: MovieDetail
        }
      ]
    })
  )
  .mount('#app');
