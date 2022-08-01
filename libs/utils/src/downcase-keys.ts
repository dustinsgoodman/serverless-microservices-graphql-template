/**
 * Converts all object keys to lower case versions for case insensitive
 * operations like header checking
 */
export const downcaseKeys = (obj: object): object =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
