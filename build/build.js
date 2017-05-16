const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf').sync
const rollup = require('rollup')
const uglify = require('uglify-js')
const zlib = require('zlib')

/**
 * Rollup configuration template.
 * @type {Object}
 */
const config = require('./rollup.config.js')

/**
 * Establish current working directory.
 * @type {string}
 */
const root = process.cwd()

/**
 * Collection of paths.
 * @type {{build: string, commands: string, dist: string}}
 */
const paths = {
  build: `${root}/build`,
  commands: `${root}/src/commands`,
  dist: `${root}/dist`,
}

/**
 * Array of files in the commands directory.
 * @type {Array}
 */
const commands = fs.readdirSync(paths.commands)

// Drop dist directory
if (fs.existsSync(paths.dist)) {
  rimraf(paths.dist)
}
// Re-create dist directory
fs.mkdirSync(paths.dist)
// Publish commands
commands.forEach(command => {
  const conf = Object.assign({}, config, {
    entry: `${paths.commands}/${command}`,
    dest: `${paths.dist}/${command}`,
  })

  return rollup.rollup(conf).then(bundle => {
    const code = bundle.generate(conf).code
    const minified = uglify.minify(code).code

    return write(conf.dest, minified)
  })
})

/**
 * Write minified code to file.
 * @param {string} dest
 * @param {string} code
 * @returns {Promise}
 */
function write (dest, code) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)

      zlib.gzip(code, (err, zipped) => {
        if (err) return reject(err)
        report(' (gzipped: ' + getSize(zipped) + ')')
      })
    })
  })
}

/**
 * Get the size of generated code in kilobytes.
 * Shamelessly stolen from https://github.com/vuejs/vue/blob/v2.3.3/build/build.js
 * @param {string} code
 * @returns {string}
 */
function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

/**
 * Output in bold & blue.
 * Shamelessly stolen from https://github.com/vuejs/vue/blob/v2.3.3/build/build.js
 * @param {string} str
 * @returns {string}
 */
function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
