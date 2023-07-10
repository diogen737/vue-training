<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue';

import { XMarkIcon } from '@heroicons/vue/24/solid';

import type { Movie } from '@/model/movie';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close', movie?: Movie): void }>();

const movieInitRaw = () => ({
  id: -1,
  name: '',
  description: '',
  genres: [],
  image: '',
  inTheaters: false,
  rating: 0
});

const movie = ref<Movie>(movieInitRaw());
// const errors = ref<Partial<Record<keyof Movie, string>>>({});
const errors = ref<{ [key in keyof Movie]?: string }>({});

watch(toRef(props, 'open'), () => {
  // clear form & errors on both form open and close
  errors.value = {};
  movie.value = movieInitRaw();
});

function validateAndSave() {
  validateForm();
  if (!hasErrors.value) {
    emit('close', movie.value);
  }
}

function validateForm() {
  errors.value.name = movie.value.name ? '' : 'Name is required';
  errors.value.description = movie.value.description ? '' : 'Description is required';
  errors.value.image = movie.value.image ? '' : 'Poster is required';
  errors.value.genres = movie.value.genres.length ? '' : 'Select at least one genre';
}

const hasErrors = computed(() => !!Object.entries(errors.value).filter(([k, v]) => !!v).length);
</script>

<template>
  <div v-if="open">
    <!-- Modal backdrop -->
    <div class="fixed inset-0 bg-gray-900 opacity-60"></div>

    <!-- Modal container -->
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 p-4 overflow-x-hidden w-full max-h-full flex items-center justify-center"
    >
      <div class="w-full md:w-fit max-w-2xl max-h-full rounded-lg overflow-y-auto">
        <!-- Modal content -->
        <form
          class="relative bg-white rounded-lg shadow dark:bg-gray-700"
          @submit.prevent="validateAndSave"
        >
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add a movie to your list
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="$emit('close')"
            >
              <XMarkIcon class="w-6" />
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <!-- Name -->
            <div class="md:w-96">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                id="name"
                v-model="movie.name"
                placeholder="Movie name"
                :class="[
                  'border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700',
                  errors.name
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                ]"
              />
              <p class="mt-1 text-sm text-red-600 dark:text-red-500 empty:hidden">
                {{ errors.name }}
              </p>
            </div>

            <!-- Description -->
            <div class="md:w-96">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                v-model="movie.description"
                placeholder="Movie description"
                rows="5"
                class="border text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                :class="
                  errors.description
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                "
              />
              <p class="-mt-0.5 text-sm text-red-600 dark:text-red-500 empty:hidden">
                {{ errors.description }}
              </p>
            </div>

            <!-- Image URL -->
            <div class="md:w-96">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Poster
              </label>
              <input
                id="image"
                v-model="movie.image"
                placeholder="Image URL"
                :class="[
                  'border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700',
                  errors.image
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                ]"
              />
              <p class="mt-1 text-sm text-red-600 dark:text-red-500 empty:hidden">
                {{ errors.image }}
              </p>
            </div>

            <!-- Genres -->
            <div class="">
              <label
                for="genres"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Select genres</label
              >
              <select
                id="genres"
                v-model="movie.genres"
                multiple
                size="7"
                :class="[
                  'bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                  errors.genres ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                ]"
              >
                <option>Thriller</option>
                <option>Comedy</option>
                <option>Action</option>
                <option>Drama</option>
                <option>Sci-Fi</option>
                <option>Documentary</option>
                <option>Animation</option>
              </select>
              <p class="mt-1 text-sm text-red-600 dark:text-red-500 empty:hidden">
                {{ errors.genres }}
              </p>
            </div>

            <!-- In theaters -->
            <div class="flex items-center">
              <input
                id="inTheaters"
                type="checkbox"
                v-model="movie.inTheaters"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="inTheaters"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >In theaters now</label
              >
            </div>
          </div>

          <!-- Modal footer -->
          <div
            class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              type="submit"
              class="w-52 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
