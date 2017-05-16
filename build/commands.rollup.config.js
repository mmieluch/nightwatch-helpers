import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';
import resolveCommonJS from 'rollup-plugin-commonjs'

export default {
  entry: 'src/commands/index.js',
  format: 'cjs',
  plugins: [
    resolveCommonJS(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    })
  ],
  dest: 'dist/commands.js',
}
