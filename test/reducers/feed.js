import expect from 'expect';
import {Map, List, fromJS, Range} from 'immutable';
import feed, {
  Model,
  INITIAL_STATE,
  LIMIT,
  SET_LIST,
  ADD,
  actionSetList,
  actionAdd,
  setList,
  add,
} from '../../src/shared/reducers/feed';

describe('Feed', () => {
  describe('Methods', () => {
    describe('set', () => {
      it('should work', () => {
        const v = List.of({a: 'A'});
        const nextState = setList(v);
        const expected = [{a: 'A'}];
        expect(nextState.toJS()).toEqual(expected);
      });
      it('should convert to immutable', () => {
        const v = [{a: 'A'}];
        const nextState = setList(v);
        const expected = [{a: 'A'}];
        expect(nextState.toJS()).toEqual(expected);
      });
    });
    describe('add', () => {
      it('should work', () => {
        const state = INITIAL_STATE;
        const v = new Map();
        const nextState = add(state, v);
        const expected = new Model().toJS();
        // `remove` due to uuid.
        expect(nextState.first().remove('id').toJS()).toEqual(expected);
        expect(nextState.size).toBe(1);
      });
      it('should convert to immutable', () => {
        const state = INITIAL_STATE;
        const v = {};
        const nextState = add(state, v);
        const expected = new Model().toJS();
        // `remove` due to uuid.
        expect(nextState.first().remove('id').toJS()).toEqual(expected);
        expect(nextState.size).toBe(1);
      });
      it('should not exced Feed -> LIMIT', () => {
        const state = fromJS(new Array(LIMIT));
        const v = new Map();
        const nextState = add(state, v);
        expect(nextState.size).toBe(LIMIT);
      });
    });
  });
  describe('Reducer', () => {
    it('should has an initial state', () => {
      const state = undefined;
      const nextState = feed(state);
      expect(nextState.toJS()).toEqual(INITIAL_STATE.toJS());
    });
    it('should ignore not ready action', () => {
      const state = INITIAL_STATE;
      const action = {
        type: SET_LIST,
        ready: false,
        msg: [{a: 'A'}]
      };
      const nextState = feed(state, action);
      expect(nextState.toJS()).toEqual(INITIAL_STATE.toJS());
    });
    it(`should handle ${SET_LIST}`, () => {
      const state = INITIAL_STATE;
      const action = {
        type: SET_LIST,
        msg: [{a: 'A'}]
      };
      const nextState = feed(state, action);
      const expected = [{a: 'A'}];
      expect(nextState.toJS()).toEqual(expected);
    });
    it(`should handle ${ADD}`, () => {
      const state = INITIAL_STATE;
      const action = {
        type: ADD
      };
      const nextState = feed(state, action);
      const expected = new Model().toJS();
      // `remove` due to uuid.
      expect(nextState.first().remove('id').toJS()).toEqual(expected);
      expect(nextState.size).toBe(1);
    });
    it('should works', () => {
      const msg = Range(0, LIMIT - 1).toArray().map(n => {
        return new Model();
      });
      const initialState = List();
      const actions = [
        {type: SET_LIST, msg},
        {type: ADD},
        {type: ADD},
        {type: ADD}
      ];
      const finalState = actions.reduce(feed, initialState);
      expect(finalState.size).toEqual(LIMIT);
    });
  });
});
