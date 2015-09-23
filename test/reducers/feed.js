import expect from 'expect';
import {Map, List, fromJS, Range} from 'immutable';
import feed, {
  Model,
  Entry,
  initialState,
  LIMIT,
  SET_LIST,
  ADD,
  actionSetList,
  actionAdd,
  setList,
  add,
} from '../../src/shared/reducers/feed';
import randomString from '../../src/shared/utils/randomString';

const idReg = /^([a-z0-9]{12})$/;
const timeReg = /^([0-9]{13})$/;

describe('Feed', () => {
  describe('Methods', () => {
    describe('setList', () => {
      it('should work', () => {
        const v = [
          {id: '_1', created_at: 123, content: {title: 'a'}},
          {id: '_2', created_at: 123, content: {title: 'b'}}
        ];
        const nextState = setList(initialState, v);
        const expected = {
          reference: {},
          list: [
            {
              id: '_1',
              created_at: 123,
              content: {
                type: 'default',
                title: 'a',
                text: '',
                icon: ''
              }
            },
            {
              id: '_2',
              created_at: 123,
              content: {
                type: 'default',
                title: 'b',
                text: '',
                icon: ''
              }
            }
          ]};
        expect(nextState.toJS()).toEqual(expected);
      });
      it('should handle an immutable value', () => {
        const v = new List([
          new Map({id: '_1', created_at: 123, content: {title: 'a'}}),
          new Map({id: '_2', created_at: 123, content: {title: 'b'}})
        ]);
        const nextState = setList(initialState, v);
        const expected = {
          reference: {},
          list: [
            {
              id: '_1',
              created_at: 123,
              content: {
                type: 'default',
                title: 'a',
                text: '',
                icon: ''
              }
            },
            {
              id: '_2',
              created_at: 123,
              content: {
                type: 'default',
                title: 'b',
                text: '',
                icon: ''
              }
            }
          ]};
        expect(nextState.toJS()).toEqual(expected);
      });
    });
    describe('add', () => {
      it('should work', () => {
        const v = {title: 'a', icon: 'b'};
        const nextState = add(initialState, v);
        const newRecordedEntry = nextState.get('list').first();
        expect(nextState.get('list').size).toBe(1);
        expect(idReg.test(newRecordedEntry.get('id'))).toBe(true);
        expect(timeReg.test(newRecordedEntry.get('created_at'))).toBe(true);
        expect(newRecordedEntry.get('content').toJS()).toEqual({
          type: 'default',
          title: 'a',
          text: '',
          icon: 'b'
        });
      });
      it('should handle an immutable value', () => {
        const v = new Map({title: 'a', icon: 'b'});
        const nextState = add(initialState, v);
        const newRecordedEntry = nextState.get('list').first();
        expect(nextState.get('list').size).toBe(1);
        expect(idReg.test(newRecordedEntry.get('id'))).toBe(true);
        expect(timeReg.test(newRecordedEntry.get('created_at'))).toBe(true);
        expect(newRecordedEntry.get('content').toJS()).toEqual({
          type: 'default',
          title: 'a',
          text: '',
          icon: 'b'
        });
      });
    });
  });
  describe('Reducer', () => {
    it('should has an initial state', () => {
      const state = undefined;
      const nextState = feed(state);
      expect(nextState.toJS()).toEqual(initialState.toJS());
    });
    it('should ignore not ready action', () => {
      const state = initialState;
      const action = {
        type: SET_LIST,
        ready: false,
        content: [{a: 'A'}]
      };
      const nextState = feed(state, action);
      expect(nextState.toJS()).toEqual(initialState.toJS());
    });
    it(`should handle ${SET_LIST}`, () => {
      const state = initialState;
      const action = {
        type: SET_LIST,
        msg: [{a: 'A'}, {b: 'B'}, {c: 'C'}]
      };
      const nextState = feed(state, action);
      expect(nextState.get('list').size).toBe(3);
    });
    it(`should handle ${ADD}`, () => {
      const state = initialState;
      const action = {
        type: ADD
      };
      const nextState = feed(state, action);
      expect(nextState.get('list').size).toBe(1);
    });
    it('should works', () => {
      const hydrate = Range(0, LIMIT - 1).map(() => {
        return new Entry({
          id: randomString(),
          content: new Model()
        })
      }).toArray();
      const actions = [
        {type: SET_LIST, msg: hydrate},
        {type: ADD},
        {type: ADD},
        {type: ADD}
      ];
      const finalState = actions.reduce(feed, initialState);
      expect(finalState.get('list').size).toEqual(LIMIT);
    });
  });
});
