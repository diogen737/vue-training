<script setup lang="ts">
import { computed, ref } from 'vue';

import NewMovieModal from '@/components/ModalNewMovie.vue';
import { StarIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { items } from './assets/movies.json';

import type { Movie } from './model/movie';
import { generateMovieId } from './utils';

const movies = ref<Movie[]>(items);
const newMovieModalOpen = ref(false);

const avgRating = computed(() => {
  const sum = movies.value.reduce((acc, curr) => acc + (curr.rating || 0), 0);
  return sum / (movies.value.length || 1);
});
const avgRatingFormatted = computed(() =>
  Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(avgRating.value)
);

function onModalClose(payload?: Movie) {
  newMovieModalOpen.value = false;
  if (payload) {
    addMovie(payload);
  }
}

function addMovie(movie: Movie) {
  movie.id = generateMovieId(movies.value);
  console.log(movie.id);
  movies.value.push(movie);
}

function deleteMovie(index: number) {
  if (index >= 0) {
    movies.value.splice(index);
  }
}

function resetRatings() {
  movies.value.forEach((m) => (m.rating = 0));
}
</script>

<template>
  <div class="p-10">
    <div class="w-full flex flex-row items-center justify-between mb-10">
      <div class="">
        <span class="text-lg text-white">
          Average rating:
          <span class="text-yellow-500">{{ avgRatingFormatted }}</span>
          <span class="text-sm pl-2">(of {{ movies.length }} movies)</span>
        </span>
      </div>

      <div class="">
        <button
          type="button"
          class="inline-flex items-center mr-2 text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none dark:focus:ring-amber-800"
          @click="resetRatings"
        >
          <PlusIcon class="w-4 mr-2" />
          Reset ratings
        </button>

        <button
          type="button"
          class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click="newMovieModalOpen = true"
        >
          <PlusIcon class="w-4 mr-2" />
          Add a movie
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-5">
      <div
        v-for="(movie, movieIndex) in movies"
        :key="movie.id"
        class="col-span-full xl:col-span-1"
      >
        <div
          class="relative md:max-h-56 overflow-hidden flex flex-col border rounded-lg shadow md:flex-row md:max-w- border-gray-700 bg-gray-800"
        >
          <div class="absolute left-2 top-2">
            <StarIcon :class="['w-10', movie.rating ? 'text-yellow-300' : 'text-gray-300']" />
            <span class="absolute w-full text-center top-1/2 -translate-y-1/2">
              {{ movie.rating || '-' }}
            </span>
          </div>
          <img
            class="object-contain rounded-t-lg h-96 md:h-auto md:w-40 md:rounded-none md:rounded-l-lg"
            :src="movie.image"
            alt=""
          />

          <div class="flex-1 flex flex-col justify-between p-4 leading-normal">
            <!-- name + delete button + rating -->
            <div>
              <div class="flex justify-between items-center">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {{ movie.name }}
                </h5>

                <button
                  class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
                  @click="deleteMovie(movieIndex)"
                >
                  <TrashIcon class="w-4" />
                </button>
              </div>

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
            </div>

            <!-- genres + description -->
            <div>
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
  </div>

  <NewMovieModal :open="newMovieModalOpen" @close="onModalClose" />
</template>
