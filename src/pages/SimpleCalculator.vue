<script setup lang="ts">
import { computed, ref } from 'vue';

import CalcButtonComponent from '@/components/CalcButton.vue';

import {
	BUTTONS,
	MAX_SIGNIFICANT_DIGITS,
	RADIX_POINT,
	type CalcButton,
	type Token
} from '@/model/calc-buttons';

/**
 * state
 */

const currentToken = ref<Token | null>(null);
const result = ref<number | null>(null);
const error = ref<string | null>(null);

const pastTokens = ref<Token[]>([]);
const pastTokensStr = computed(() => pastTokens.value.map((t) => tokenStr(t)).join(''));

/**
 * calculation logic
 */

function onClick(btn: CalcButton) {
	// reset error/result on each click
	result.value = null;
	error.value = null;

	switch (btn.type) {
		case 'clear':
			pastTokens.value.length = 0;
			currentToken.value = null;
			break;
		case 'equals':
			calculateResult();
			break;
		case 'number':
		case 'point':
			pushOperatorToken();
			numberInputToToken(btn);
			break;
		case 'operator':
			pushNumberToken();
			currentToken.value = btn;
			break;
	}
}

function pushNumberToken() {
	if (currentToken.value?.type === 'number') {
		pastTokens.value.push(currentToken.value);
	}
}

function pushOperatorToken() {
	if (currentToken.value?.type === 'operator') {
		pastTokens.value.push(currentToken.value);
	}
}

function numberInputToToken(token: CalcButton) {
	if (!currentToken.value || currentToken.value.type !== 'number') {
		currentToken.value = { type: 'number', str: '' };
	}

	let numberStr = currentToken.value.str;
	if (token.type === 'point' && !numberStr.includes(RADIX_POINT)) {
		// only one radix point allowed
		numberStr += RADIX_POINT;
	} else if (
		token.type === 'number' &&
		numberStr.replace(RADIX_POINT, '').length < MAX_SIGNIFICANT_DIGITS
	) {
		// only MAX_SIGNIFICANT_DIGITS (excluding RADIX_POINT) allowed
		numberStr += token.str;
	}

	currentToken.value = { type: 'number', str: numberStr };
}

function calculateResult() {
	try {
		if (currentToken.value?.type !== 'number') {
			throw '';
		}

		// leaving the last number token in 'currentToken' for users to be able to continue input after hitting '='
		const strToCalculate = pastTokensStr.value + currentToken.value.str;
		error.value = null;
		result.value = numberToPrecision(eval(strToCalculate));
	} catch (e) {
		result.value = null;
		error.value = 'Current input is not valid for calculation';
	}
}

/**
 * render functions
 */

function tokenStr(token: Token | null) {
	if (token === null) {
		return '';
	}
	return token.type === 'number' ? token.str : token.operator;
}

function numberToPrecision(x: number) {
	const exp = 10_000_000_000;
	return Math.round(x * exp) / exp;
}
</script>

<template>
	<div class="max-w-sm mx-auto">
		<div class="pt-16 space-y-2">
			<p v-if="error !== null" class="text-red-600">
				Error: <span class="font-bold">{{ error }}</span>
			</p>
			<p class="text-2xl tracking-widest p-6 rounded-md bg-gray-700 text-gray-200">
				{{ pastTokensStr + tokenStr(currentToken) || '&nbsp;' }}
			</p>
			<p class="text-xl text-right text-gray-200" :class="result === null ? 'opacity-0' : 'opacity-100'">
				= <span class="font-bold">{{ result }}</span>
			</p>
		</div>

		<div class="mt-16 grid grid-cols-4">
			<div v-for="btn of BUTTONS" class="p-2">
				<CalcButtonComponent :btn="btn" @click="onClick(btn)" />
			</div>
		</div>
	</div>
</template>
