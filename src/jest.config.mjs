export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.jsx', '.js'],
  testEnvironment: 'node',
};
