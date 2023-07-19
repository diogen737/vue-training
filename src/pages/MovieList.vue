<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';

import MovieItem from '@/components/MovieItem.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';

import type { Movie } from '@/model/movie';
import { useMovieStore } from '@/stores/movie.store';

const MovieForm = defineAsyncComponent(() => import('@/components/MovieForm.vue'));
const AppModal = defineAsyncComponent(() => import('@/components/AppModal.vue'));

/**
 * state
 */

const movieStore = useMovieStore();
const { movies, avgRatingFormatted } = storeToRefs(movieStore);

const movieToEdit = ref<Movie | null>(null);
const showForm = ref(false);

/**
 * modal functions
 */

function openCreateModal() {
  movieToEdit.value = null;
  showForm.value = true;
}

function openUpdateModal(movie: Movie) {
  movieToEdit.value = movie;
  showForm.value = true;
}

function onModalClose(payload?: Movie) {
  movieToEdit.value = null;
  showForm.value = false;
  if (payload) {
    movieStore.exists(payload) ? movieStore.update(payload) : movieStore.create(payload);
  }
}
</script>

<template>
  <div class="p-10">
    <div class="w-full flex flex-row items-center justify-between mb-10">
      <span class="text-lg text-white">
        Average rating:
        <span class="text-yellow-500">{{ avgRatingFormatted }}</span>
        <span class="text-sm pl-2">(of {{ movies.length }} movies)</span>
      </span>

      <div class="flex">
        <button
          type="button"
          class="inline-flex items-center mr-2 text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none dark:focus:ring-amber-800"
          @click="movieStore.resetRatings"
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
          @delete="movieStore.delete(movie)"
          @update:rating="movie.rating = $event"
        />
      </div>
    </div>
  </div>

  <AppModal :show="showForm" @close="onModalClose">
    <template #title>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add a movie to your list</h3>
    </template>

    <MovieForm :model-value="movieToEdit" @update:model-value="onModalClose" />
  </AppModal>
</template>

<style></style>
