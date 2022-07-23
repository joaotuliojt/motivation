
// eslint-disable-next-line @typescript-eslint/no-var-requires


export default {
  displayName: "motivationApi",
  name: "motivationApi",
  verbose: true,
  //testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  coverageReporters: ['lcov', 'html'],
  resetModules: false,
  transform: {
    '^.+\\.(js|ts|tsx)?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
  globalSetup: '<rootDir>/test/globalSetup.ts',
};
