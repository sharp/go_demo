import expect from 'expect';
import {Map} from 'immutable';
import ensureEntryIsValidAndImmutable from '../../src/shared/utils/ensureEntryIsValidAndImmutable';

describe('Utils', () => {
  describe('ensureEntryIsValidAndImmutable', () => {
    it('should work', () => {
      const v = new Map({id: 'a'});
      const result = ensureEntryIsValidAndImmutable(v);
      const expected = {id: 'a'};
      expect(result.toJS()).toEqual(expected);
    });
    it('should convert to immutable', () => {
      const v = {id: 'a'};
      const result = ensureEntryIsValidAndImmutable(v);
      const expected = {id: 'a'};
      expect(result.toJS()).toEqual(expected);
    });
    it('should throw for an undefined entry', () => {
      expect(() => {
        ensureEntryIsValidAndImmutable(undefined);
      }).toThrow(
        'entry expected and object, instead received undefined.'
      )
    });
    it('should throw for a null entry', () => {
      expect(() => {
        ensureEntryIsValidAndImmutable(null);
      }).toThrow(
        'entry expected and object, instead received null.'
      )
    });
    it('should throw for a primitive entry', () => {
      expect(() => {
        ensureEntryIsValidAndImmutable('string');
      }).toThrow(
        'entry expected and object, instead received string.'
      );
      expect(() => {
        ensureEntryIsValidAndImmutable(2);
      }).toThrow(
        'entry expected and object, instead received number.'
      )
    });
    it('should throw if result is not an Immutable -> Map', () => {
      expect(() => {
        ensureEntryIsValidAndImmutable(['fail']);
      }).toThrow(
        `Conversion of entry expected to be a Map, ` +
        `instead result in List.`
      )
    });
    it('should throw for a missing entry -> id', () => {
      const v = {fail: '...'};
      expect(() => {
        ensureEntryIsValidAndImmutable(v);
      }).toThrow(
        'entry -> id expected to be defined.'
      );
    });
    it('should throw for an invalid entry -> id', () => {
      const v = {id: {fail: 'type'}};
      expect(() => {
        ensureEntryIsValidAndImmutable(v);
      }).toThrow(
        'entry -> id expected to be a string or a number, instead received object.'
      );
    });
    it('should throw for an empty entry -> id', () => {
      const v = {id: '  '};
      expect(() => {
        ensureEntryIsValidAndImmutable(v);
      }).toThrow(
        'entry -> id can not be empty.'
      );
    });
  });
});
