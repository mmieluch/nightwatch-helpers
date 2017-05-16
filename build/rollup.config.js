const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const resolveCommonJS = require('rollup-plugin-commonjs')

/**
 * Rollup config template.
 * @type {{format: string, plugins: [*]}}
 */
const config = {
  format: 'cjs',
  plugins: [
    resolveCommonJS(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}

module.exports = config
