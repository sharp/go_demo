import expect from 'expect';
import {fromJS} from 'immutable';
import defineFormReference, {
  defineFieldShape
} from '../../src/shared/utils/defineFormReference';

describe('Utils', () => {
  const base = fromJS({
    properties: {
      a: {value: 'A'},
      b: {value: 'B'},
      c: {value: 'C'}
    },
    fields: {
      _1: ['a', 'b'],
      _2: ['a', 'c']
    }
  });
  describe('defineFieldShape', () => {
    it('should work', () => {
      const result = defineFieldShape(base, '_1');
      const expected = {
        a: {value: 'A'},
        b: {value: 'B'}
      };
      expect(result.toJS()).toEqual(expected);
    });
  });
  describe('defineFormReference', () => {
    it('should work', () => {
      const result = defineFormReference(base);
      const expected = {
        _1: {
          a: {value: 'A'},
          b: {value: 'B'}
        },
        _2: {
          a: {value: 'A'},
          c: {value: 'C'}
        }
      };
    });
  });
});
