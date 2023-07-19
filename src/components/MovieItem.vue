<script setup lang="ts">
import { ArrowRightIcon, StarIcon, TrashIcon, PencilIcon } from '@heroicons/vue/24/solid';

import type { Movie } from '@/model/movie';

defineProps<{ movie: Movie }>();
defineEmits<{
  (e: 'update'): void;
  (e: 'delete'): void;
  (e: 'update:rating', rating: number): void;
}>();
</script>

<template>
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

          <div class="space-x-2 shrink-0">
            <RouterLink
              class="text-sky-700 border border-sky-700 hover:bg-sky-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:focus:ring-sky-800 dark:hover:bg-sky-500"
              title="See details"
              :to="'/' + movie.id"
            >
              <ArrowRightIcon class="w-3" />
            </RouterLink>
            <button
              class="text-sky-700 border border-sky-700 hover:bg-sky-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:focus:ring-sky-800 dark:hover:bg-sky-500"
              title="Edit movie"
              @click="$emit('update')"
            >
              <PencilIcon class="w-3" />
            </button>
            <button
              class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
              title="Delete movie"
              @click="$emit('delete')"
            >
              <TrashIcon class="w-3" />
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-1 mb-6">
          <button
            v-for="ratingIdx in 5"
            :key="ratingIdx"
            :disabled="movie.rating === ratingIdx"
            class="disabled:cursor-not-allowed"
            @click="$emit('update:rating', ratingIdx)"
          >
            <StarIcon
              class="w-4"
              :class="[ratingIdx > movie.rating ? 'text-gray-500' : 'text-yellow-500']"
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
</template>
