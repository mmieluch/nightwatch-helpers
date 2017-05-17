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

```json
custom_commands_path: [
  'node_modules/@mmieluch/nightwatch-helpers/dist/commands',
],
```

## Assertions

- count({string} selector, {number} expected, {string} [message = null])

## Commands

- scrollTo({string} selector, {number} offset)
- takeScreenshot({string} prefix)
