import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from '@rollup/plugin-terser';

export default {
  input: 'src/nhl-score-card.js',
  output: {
    file: 'dist/nhl-score-card.js',
    format: 'es',
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
  ],
};
