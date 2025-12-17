module.exports = {
  '*.{ts,tsx,js,jsx}': ['prettier --write', 'eslint --fix'],
  '*.{json,md,yml,yaml,css,scss,cjs,mjs}': ['prettier --write'],
};
