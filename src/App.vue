<script setup lang="ts">
import { ref } from 'vue';

import NewMovieModal from '@/components/ModalNewMovie.vue';
import { StarIcon } from '@heroicons/vue/24/solid';
import { items } from './assets/movies.json';

import type { Movie } from './model/movie';
import { generateMovieId } from './utils';

const movies = ref<Movie[]>(items);
const newMovieModalOpen = ref(false);

function onModalClose(payload?: Movie) {
  console.log({ payload });
  newMovieModalOpen.value = false;
  if (payload) {
    payload.id = generateMovieId(movies.value);
    console.log(payload.id);
    movies.value.push(payload);
  }
}

function push() {
  movies.value.push({
    id: 111,
    name: 'new movie',
    description: 'qwerty',
    genres: ['Drama'],
    image: '',
    inTheaters: false,
    rating: 1,
  })
}
</script>

<template>
  <div class="p-10">
    <div class="text-right mb-4">
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="newMovieModalOpen = true"
      >
        Add a movie
      </button>

      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="push"
      >
        Push movie
      </button>
    </div>

    <div class="grid grid-cols-2 gap-5">
      <div v-for="movie in movies" :key="movie.id" class="col-span-full xl:col-span-1">
        <div
          class="relative mx-auto md:max-h-56 overflow-hidden flex flex-col items-center border rounded-lg shadow md:flex-row md:max-w- border-gray-700 bg-gray-800"
        >
          <img
            class="object-contain rounded-t-lg h-96 md:h-auto md:w-40 md:rounded-none md:rounded-l-lg"
            :src="movie.image"
            alt=""
          />
          <div class="absolute left-2 top-2">
            <StarIcon :class="['w-10', movie.rating ? 'text-yellow-300' : 'text-gray-300']" />
            <span class="absolute w-full text-center top-1/2 -translate-y-1/2">{{
              movie.rating || '-'
            }}</span>
          </div>

          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ movie.name }}
            </h5>

            <div class="flex items-center space-x-1 mb-6">
              <button
                v-for="idx in 5"
                :key="idx"
                :disabled="movie.rating === idx"
                class="disabled:cursor-not-allowed"
                @click="movie.rating = idx"
              >
                <StarIcon
                  class="w-4"
                  :class="[idx > movie.rating ? 'text-gray-500' : 'text-yellow-500']"
                />
              </button>
            </div>

            <div class="flex items-center space-x-1 mb-2">
              <span
                v-for="genre in movie.genres"
                :key="genre"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {{ genre }}
              </span>
            </div>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              {{ movie.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <NewMovieModal :open="newMovieModalOpen" @close="onModalClose" />
</template>
