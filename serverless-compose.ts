const composeConfiguration = {
  services: {
    'public-api': {
      path: 'services/public-api',
      dependsOn: ['example-service'],
    },
    'background-jobs': {
      path: 'services/background-jobs',
    },
    'example-service': {
      path: 'services/example-service',
      dependsOn: ['background-jobs'],
    },
  },
};

module.exports = composeConfiguration;
