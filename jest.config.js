const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

const aliases = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
})

// ^@assets/(.*)$ = "<rootDir>/assets/$1"
module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.model.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/.storybook/**',
    '!**/stories/**',
    '!capacitor.config.ts',
  ],
  moduleNameMapper: Object.assign(
    {
      // Handle CSS imports (with CSS modules)
      // https://jestjs.io/docs/webpack#mocking-css-modules
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

      // Handle CSS imports (without CSS modules)
      '^.+\\.(css|sass|scss)$': '<rootDir>/tests/mocks/styleMock.js',

      // Handle image imports
      // https://jestjs.io/docs/webpack#handling-static-assets
      '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/tests/mocks/fileMock.js`,
      '^@assets/(.*).svg$': `<rootDir>/tests/mocks/svgMock.js`,
    },
    aliases
  ),
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    // '\\.svg$': 'svg-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
