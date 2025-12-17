module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['app', 'auth', 'dashboard', 'feed', 'comments', 'favorites', 'shared', 'ui', 'ci', 'docs'],
    ],
  },
};
