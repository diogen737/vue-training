<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';

defineEmits(['close']);
</script>

<template>
  <div>
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
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <slot name="title"></slot>

            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="$emit('close')"
            >
              <XMarkIcon class="w-6" />
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Modal content -->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
