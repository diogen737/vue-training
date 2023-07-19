<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import type { Movie } from '@/model/movie';
import { useMovieStore } from '@/stores/movie.store';

const movieStore = useMovieStore();

const movie = ref<Movie>();

const { id } = useRoute().params;
const parsedId = Number(id);
if (parsedId) {
  movie.value = movieStore.get(parsedId);
}
</script>

<template>
  <RouterLink
    to="/"
    class="inline-flex items-center mr-2 text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none dark:focus:ring-amber-800"
  >
    To list
  </RouterLink>

  <div v-if="movie" class="mt-10">
    <h1 class="text-white">{{ movie.name }}</h1>
  </div>

  <h1 class="text-white mt-10">Too lazy to design it, sorry</h1>
</template>

<style></style>
