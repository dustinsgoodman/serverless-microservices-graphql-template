import { config, SharedIniFileCredentials } from 'aws-sdk';

jest.mock('aws-sdk');

beforeEach(() => {
  jest.spyOn(config, 'update');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('config', () => {
  describe('when IS_OFFLINE is true', () => {
    const OLD_ENV = process.env;

    beforeAll(async () => {
      process.env = {
        ...OLD_ENV,
        IS_OFFLINE: 'true',
      };
      require('./aws-api');
    });

    afterAll(() => {
      jest.resetModules();
      process.env = OLD_ENV;
    });

    test('updates AWS config credentials', () => {
      expect(config.update).toHaveBeenCalledWith({
        credentials: expect.any(SharedIniFileCredentials),
      });
    });
  });

  describe('when IS_OFFLINE is false', () => {
    const OLD_ENV = process.env;

    beforeAll(async () => {
      process.env = {
        ...OLD_ENV,
        IS_OFFLINE: 'false',
      };
      require('./aws-api');
    });

    afterAll(() => {
      jest.resetModules();
      process.env = OLD_ENV;
    });

    test('does nothing', () => {
      expect(config.update).not.toHaveBeenCalled();
    });
  });
});
