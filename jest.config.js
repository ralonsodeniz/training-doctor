module.exports = {
  verbose: true,
  modulePaths: ['/shared/vendor/modules'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    // webpack aliases
    '^components(.*)$': '<rootDir>/src/components$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^redux(.*)$': '<rootDir>/src/redux$1',
    '^reducers(.*)$': '<rootDir>/src/redux/reducers$1',
    '^actions(.*)$': '<rootDir>/src/redux/actions$1',
    '^types(.*)$': '<rootDir>/src/redux/types$1',
    '^sagas(.*)$': '<rootDir>/src/redux/sagas$1',
    '^selectors(.*)$': '<rootDir>/src/redux/selectors$1',
    '^helpers(.*)$': '<rootDir>/src/redux/helpers$1',
    '^assets(.*)$': '<rootDir>/appAssets$1',
  },
};
