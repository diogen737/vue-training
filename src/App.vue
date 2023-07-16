<script setup lang="ts">
import { computed, ref } from 'vue';

import MovieItem from '@/components/MovieItem.vue';
import ModalMovieUpsert from '@/components/ModalMovieUpsert.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { items } from '@/assets/movies.json';

import type { Movie } from '@/model/movie';
import { generateMovieId } from '@/utils';

/**
 * state
 */

const movies = ref<Movie[]>(items);
const movieToEdit = ref<Movie | null>(null);
const movieModalOpen = ref(false);

/**
 * getters
 */

const avgRating = computed(() => {
  const sum = movies.value.reduce((acc, curr) => acc + (curr.rating || 0), 0);
  return sum / (movies.value.length || 1);
});
const avgRatingFormatted = computed(() =>
  Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(avgRating.value)
);

/**
 * modal functions
 */

function openCreateModal() {
  movieToEdit.value = null;
  movieModalOpen.value = true;
}

function openUpdateModal(movie: Movie) {
  movieToEdit.value = movie;
  movieModalOpen.value = true;
}

function onModalClose(payload?: Movie) {
  movieToEdit.value = null;
  movieModalOpen.value = false;
  if (payload) {
    movieIndex(payload).exists ? updateMovie(payload) : createMovie(payload);
  }
}

/**
 * movies CRUD
 */

function createMovie(movie: Movie) {
  movie.id = generateMovieId(movies.value);
  movies.value.push(movie);
}

function updateMovie(movie: Movie) {
  // redundant check (if crud operations become async in the future)
  const { idx, exists } = movieIndex(movie);
  if (!exists) {
    return;
  }
  Object.assign(movies.value[idx], movie);
}

function deleteMovie(movie: Movie) {
  // redundant check (if crud operations become async in the future)
  const { idx, exists } = movieIndex(movie);
  if (exists) {
    movies.value.splice(idx, 1);
  }
}

function resetRatings() {
  movies.value.forEach((m) => (m.rating = 0));
}

function movieIndex(movie: Movie) {
  const idx = movies.value.findIndex((m) => m.id === movie.id);
  return { idx, exists: idx > -1 };
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
          Reset ratings
        </button>

        <button
          type="button"
          class="inline-flex items-center text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800"
          @click="openCreateModal"
        >
          <PlusIcon class="w-4 mr-2" />
          Add a movie
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-5">
      <div v-for="movie in movies" :key="movie.id" class="col-span-full xl:col-span-1">
        <MovieItem
          :movie="movie"
          @update="openUpdateModal(movie)"
          @delete="deleteMovie(movie)"
          @update:rating="movie.rating = $event"
        />
      </div>
    </div>
  </div>

  <Transition>
    <ModalMovieUpsert
      v-if="movieModalOpen"
      :model-value="movieToEdit"
      @update:model-value="onModalClose"
      @close="onModalClose"
    />
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
