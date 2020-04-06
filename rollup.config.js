import {terser} from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import buble from '@rollup/plugin-buble';

import {main} from './package.json';

let globals = {
	'babylonjs': 'BABYLON',
};

export default {
	external: Object.keys(globals),
	input: 'src/index.rollup.js',
	plugins: [
		alias({
			entries: [
				{find: /^@babylonjs\/(.*)$/, replacement: 'babylonjs'},
			],
		}),
		buble(),
		terser(),
	],
	output: {
		file: main,
		format: 'umd',
		globals,
	},
};
