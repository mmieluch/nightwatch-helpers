const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf').sync
const rollup = require('rollup')

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
  src: `${root}/src`,
  dist: `${root}/dist`,
}

// Drop dist directory
if (fs.existsSync(paths.dist)) {
  rimraf(paths.dist)
}
// Re-create dist directory
fs.mkdirSync(paths.dist)
// Re-create commands directory
fs.mkdirSync(`${paths.dist}/commands`)
// Re-create assertions directory
fs.mkdirSync(`${paths.dist}/assertions`)

/**
 * Array of files in the commands directory.
 * @type {Array}
 */
const commands = fs.readdirSync(`${paths.src}/commands`)

// Publish commands
commands.forEach(command => {
  return createBuild('commands', command).catch(report)
})

/**
 * Array of files in the assertions directory.
 * @type {Array}
 */
const assertions = fs.readdirSync(`${paths.src}/assertions`)

// Publish assertions
assertions.forEach(assertion => {
  return createBuild('assertions', assertion).catch(report)
})

/**
 * Build a custom module.
 * @param {string} type
 * @param {string} filename
 * @returns {Promise.<TResult>}
 */
async function createBuild (type, filename) {
  const conf = Object.assign({}, config, {
    entry: `${paths.src}/${type}/${filename}`,
    dest: `${paths.dist}/${type}/${filename}`,
  })

  const bundle = await rollup.rollup(conf)
  const code = await bundle.generate(conf).code

  return write(conf.dest, code)
}

/**
 * Write message to console. Handler for promises.
 * @param {*} msg
 */
function report (msg) {
  console.log(msg)
}

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
