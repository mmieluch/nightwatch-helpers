# nightwatch-helpers
Testing helpers for the Nightwatch.js framework

## Usage

### NPM
```bash
npm install --save-dev @mmieluch/nightwatch-helpers
```

### Yarn
```bash
yarn add --dev @mmieluch/nightwatch-helpers
```

In the Nightwatch config:

```js
custom_commands_path: [
  'node_modules/@mmieluch/nightwatch-helpers/dist/commands',
],
```

## Assertions

### `checked({string} selector, {string} [message = null])`

Assert a radio button is checked.

### `count({string} selector, {number} expected, {string} [message = null])`

Assert the number of elements found by `document.querySelectorAll(selector)` is equal to `expected`.

### `disabled({string} selector, {string} [message = null])`

Assert that the element is in disabled state.

### `enabled({string} selector, {string} [message = null])`

Assert that the element is in enabled state.

### `unchecked({string} selector, {string} [message = null])`

Assert a radio button is not checked.

## Commands

### `scrollTo({string} selector, {number} offset)`

Uses `window.scroll` to position an element in the view port. Use `offset` argument to adjust the position. Useful when you want to take a screenshot and WebDriver's mouse `move` just wont work.

### `takeScreenshot({string} prefix)`

Uses your config from the Nightwatch config file. Works only if screenshots are enabled in Nightwatch configuration, eg.:

```js
test_settings: {
  default: {
    screenshots: {
      enabled: true,
      path: '/Users/mmieluch/Code/important-project/screenshots',
    },
  },
},
```

The `takeScreenshot` command will take a screenshot and put it in a subtree constructed of module name and step name respectively.

Let's assume your current test file is located under `/Users/mmieluch/Code/important-project/tests/e2e/todos/index.js` and you're running a test case named "User can add a todo". The command will put the screenshot under `/Users/mmieluch/Code/important-project/screenshots/todos/index/user-can-add-a-todo/1495110229891.png`. 

The `1495110229891` bit is the current timestamp. You can add a prefix to the timestamp bit, calling the command like so:

```
browser.takeScreenshot('my-prefix')
```

which will result in a filename like this: `my-prefix-1495110229891.png`.
