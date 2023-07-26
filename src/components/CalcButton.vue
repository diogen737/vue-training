<script setup lang="ts">
import { computed, toRef } from 'vue';
import { onKeyStroke } from '@vueuse/core';

import { type CalcButton, RADIX_POINT } from '@/model/calc-buttons';

const props = defineProps<{ btn: CalcButton }>();
const emit = defineEmits<{ (e: 'click'): void }>();

const btn = toRef(props, 'btn');
const targetKey = computed(() => {
  switch (btn.value.type) {
    case 'equals':
      return 'Enter';
    case 'point':
      return '.';
    case 'number':
      return btn.value.str;
    case 'operator':
      return btn.value.operator;
    default:
      return '';
  }
});

if (targetKey.value) {
  onKeyStroke(targetKey.value, () => emit('click'));
}
</script>

<template>
  <template v-if="btn.type !== 'blank'">
    <button
      class="w-full h-16 rounded-md text-center bg-gray-600 text-gray-100 select-none"
      @click="$emit('click')"
    >
      <template v-if="btn.type === 'clear'">C</template>
      <template v-else-if="btn.type === 'equals'">=</template>
      <template v-else-if="btn.type === 'number'">{{ btn.str }}</template>
      <template v-else-if="btn.type === 'operator'">{{ btn.operator }}</template>
      <template v-else-if="btn.type === 'point'">{{ RADIX_POINT }}</template>
    </button>
  </template>
</template>
