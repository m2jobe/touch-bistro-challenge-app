module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@ui-kitten/components|@ui-kitten/eva-icons)',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/Components/**/*.jsx',
    '<rootDir>/src/App.jsx',
    '<rootDir>/src/Components/**/*.tsx',
    '<rootDir>/src/App.tsx',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/docs',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/src/showcases/',
    '<rootDir>/src/template-js/',
    '<rootDir>/src/template-ts/',
  ],

  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  testMatch: ['**/*.test.ts?(x)', '**/*.test.js?(x)'],
};
