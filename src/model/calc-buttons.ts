// export type Operator = 'plus' | 'minus' | 'multiply' | 'divide';
// export const OPERATOR_SYMBOLS: Record<Operator, string> = {
// 	divide: '/',
// 	minus: '-',
// 	multiply: '*',
// 	plus: '+'
// };

// for simplicity (using eval) use actual operator symbols
export type Operator = '+' | '-' | '*' | '/';

export type OperatorButton = {
	operator: Operator;
	type: 'operator';
};

export type NumberButton = {
	// value: number;
	str: string;
	type: 'number';
};

export type Token = OperatorButton | NumberButton;
export type CalcButton = Token | { type: 'point' | 'clear' | 'blank' | 'equals' };

export const BUTTONS: CalcButton[] = [
	{ type: 'clear' },
	{ type: 'blank' },
	{ type: 'blank' },
	{ type: 'operator', operator: '/' },
	{ type: 'number', str: '7' },
	{ type: 'number', str: '8' },
	{ type: 'number', str: '9' },
	{ type: 'operator', operator: '*' },
	{ type: 'number', str: '6' },
	{ type: 'number', str: '5' },
	{ type: 'number', str: '4' },
	{ type: 'operator', operator: '-' },
	{ type: 'number', str: '3' },
	{ type: 'number', str: '2' },
	{ type: 'number', str: '1' },
	{ type: 'operator', operator: '+' },
	{ type: 'number', str: '0' },
	{ type: 'blank' },
	{ type: 'point' },
	{ type: 'equals' }
];

export const RADIX_POINT = '.';
export const MAX_SIGNIFICANT_DIGITS = 10 + 1;

