import { isProduction } from './is-production';

const OLD_ENV = process.env;

describe('.isProduction', () => {
  let subject;

  describe('when SLS_STAGE is prod', () => {
    beforeAll(async () => {
      process.env = {
        ...OLD_ENV,
        SLS_STAGE: 'prod',
      };
      subject = isProduction();
    });

    afterAll(() => {
      process.env = OLD_ENV;
    });

    test('returns true', () => {
      expect(subject).toBe(true);
    });
  });

  describe('when SLS_STAGE is dev', () => {
    beforeAll(async () => {
      process.env = {
        ...OLD_ENV,
        SLS_STAGE: 'dev',
      };
      subject = isProduction();
    });

    afterAll(() => {
      process.env = OLD_ENV;
    });

    test('returns false', () => {
      expect(subject).toBe(false);
    });
  });
});
