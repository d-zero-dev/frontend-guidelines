import dz from '@d-zero/eslint-config';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
	...dz.configs.standard,
	{
		files: ['.textlintrc.js'],
		...dz.configs.commonjs,
	},
];
