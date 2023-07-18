<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';

defineProps<{ show: boolean }>();
defineEmits(['close']);
</script>

<template>
  <div>
    <!-- Modal backdrop -->
    <Transition name="fade">
      <div v-if="show" class="fixed inset-0 bg-gray-900 opacity-60"></div>
    </Transition>

    <!-- Modal container -->
    <Transition name="slide">
      <div
        v-if="show"
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed inset-0 z-50 p-4 overflow-x-hidden w-full max-h-full flex items-center justify-center"
      >
        <div class="w-full md:w-fit max-w-2xl max-h-full rounded-lg overflow-y-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
            >
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
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to,
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-50px);
}
</style>
