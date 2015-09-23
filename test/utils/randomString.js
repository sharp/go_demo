import expect from 'expect';
import randomString from '../../src/shared/utils/randomString';

describe('Utils', () => {
  describe('randomString', () => {
    it('should work', () => {
      const result = randomString();
      expect(/^([a-z0-9]{12})$/.test(result)).toBe(true);
    });
  });
});
