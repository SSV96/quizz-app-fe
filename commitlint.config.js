module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'security'
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      [
        'api',
        'frontend',
        'backend',
        'deps',
        'config',
        'docs',
        'infra',
        'tests'
      ]
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'],
    'scope-max-length': [2, 'always', 20],
    'subject-empty': [2, 'never'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'references-empty': [2, 'never'],
    'signed-off-by': [1, 'always', 'Signed-off-by'], // Optional rule for DCO compliance
  },
};
