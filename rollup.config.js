import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import externals from 'rollup-plugin-node-externals';
import pkg from './package.json';

const { default: babelConfig } = require('./babel.config');

export default [
    {
        input: './src/index.js',
        plugins: [
            externals({ deps: true }),
            nodeResolve({
                extensions: ['.js', '.ts'],
            }),
            commonjs(),
            babel({
                babelHelpers: 'runtime',
                exclude: '**/node_modules/**',
                ...babelConfig,
            }),
        ],
        output: [
            { file: pkg.main, format: 'cjs', exports: 'named' },
            { file: pkg.module, format: 'es', exports: 'named' },
        ],
    },
];
