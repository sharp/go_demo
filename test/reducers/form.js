import expect from 'expect';
import {Map, List, fromJS} from 'immutable';
import form, {
  INITIAL_STATE,
  SET_REFERENCE,
  SET_COLLECTION,
  ADD,
  REMOVE,
  MERGE_IN,
  REMOVE_IN,
  actionSetReference,
  actionSetCollection,
  actionAdd,
  actionRemove,
  actionMergeIn,
  actionRemoveIn,
  setReference,
  setCollection,
  add,
  remove,
  mergeIn,
  removeIn
} from '../../src/shared/reducers/form';

describe('Form', () => {
  describe('Methods', () => {
    describe('set -> reference', () => {
      it('should work', () => {
        const state = new Map();
        const v = new Map({a: 'A'});
        const nextState = setReference(state, v);
        expect(nextState.getIn(['reference', 'a'])).toBe('A');
      });
      it('should convert to immutable', () => {
        const state = new Map();
        const v = {a: 'A'};
        const nextState = setReference(state, v);
        expect(nextState.getIn(['reference', 'a'])).toBe('A');
      });
    });
    describe('set -> collection', () => {
      it('should work', () => {
        const state = new Map();
        const v = new Map({a: 'A'});
        const nextState = setCollection(state, v);
        expect(nextState.getIn(['collection', 'a'])).toBe('A');
      });
      it('should convert to immutable', () => {
        const state = new Map();
        const v = {a: 'A'};
        const nextState = setCollection(state, v);
        expect(nextState.getIn(['collection', 'a'])).toBe('A');
      });
    });
    describe('add', () => {
      it('should work', () => {
        const state = new Map();
        const v = new Map({id: '_1', a: 'A'});
        const nextState = add(state, v);
        const expected = {
          collection: {
            _1: {id: '_1', a: 'A'}
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
      it('should convert to immutable', () => {
        const state = new Map();
        const v = {id: '_1', a: 'A'};
        const nextState = add(state, v);
        const expected = {
          'collection': {
            _1: {id: '_1', a: 'A'}
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
    });
    describe('remove', () => {
      it('should work', () => {
        const state = fromJS({
          collection: {
            _1: {id: '_1', a: 'A'},
            _2: {id: '_2', b: 'B'}
          }
        });
        const v = new Map({id: '_1'});
        const nextState = remove(state, v);
        const expected = {
          collection: {
            _2: {id: '_2', b: 'B'}
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
      it('should convert to immutable', () => {
        const state = fromJS({
          collection: {
            _1: {id: '_1', a: 'A'},
            _2: {id: '_2', b: 'B'}
          }
        });
        const v = {id: '_1'};
        const nextState = remove(state, v);
        const expected = {
          collection: {
            _2: {id: '_2', b: 'B'}
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
    });
    describe('mergeIn', () => {
      it('should work', () => {
        const state = fromJS({
          collection: {
            _1: {
              id: '_1',
              a: {
                _1_1: {id: '_1_1', b: 'B'}
              }
            }
          }
        });
        const path = List.of('_1', 'a', '_1_1');
        const v = Map({c: 'C'});
        const nextState = mergeIn(state, path, v);
        const expected = {
          collection: {
            _1: {
              id: '_1',
              a: {
                _1_1: {id: '_1_1', b: 'B', c: 'C'}
              }
            }
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
      it('should convert to immutable', () => {
        const state = fromJS({
          collection: {
            _1: {
              id: '_1',
              a: {
                _1_1: {id: '_1_1', b: 'B'}
              }
            }
          }
        });
        const path = ['_1', 'a', '_1_1'];
        const v = {c: 'C'};
        const nextState = mergeIn(state, path, v);
        const expected = {
          collection: {
            _1: {
              id: '_1',
              a: {
                _1_1: {id: '_1_1', b: 'B', c: 'C'}
              }
            }
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
    });
    describe('removeIn', () => {
      it('should work', () => {
        const state = fromJS({
          collection: {
            _1: {
              id: '_1',
              a: {
                _1_1: {id: '_1_1', b: 'B', c: 'C'}
              }
            }
          }
        });
        const path = List.of('_1', 'a', '_1_1', 'b');
        const nextState = removeIn(state, path);
        const expected = {
          collection: {
            _1: {
              id: '_1',
              a: {
                _1_1: {id: '_1_1', c: 'C'}
              }
            }
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
      it('should convert to immutable', () => {
        const state = fromJS({
          collection: {
            _1: {
              id: '_1',
              a: {
                _1_1: {id: '_1_1', b: 'B', c: 'C'}
              }
            }
          }
        });
        const path = ['_1', 'a', '_1_1', 'b'];
        const nextState = removeIn(state, path);
        const expected = {
          collection: {
            _1: {
              id: '_1',
              a: {
                _1_1: {id: '_1_1', c: 'C'}
              }
            }
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
    });
  });
  describe('Reducer', () => {
    it('should has an initial state', () => {
      const state = undefined;
      const nextState = form(state);
      expect(nextState).toEqual(INITIAL_STATE);
    });
    it('should ignore not ready action', () => {
      const state = Map();
      const action = {
        type: SET_REFERENCE,
        ready: false,
        msg: {
          a: [{a: 'A'}, {b: 'B'}, {c: 'C'}]
        }
      };
      const nextState = form(state, action);
      expect(nextState.toJS()).toEqual({});
    });
    it(`should handles ${SET_REFERENCE}`, () => {
      const state = Map();
      const action = {
        type: SET_REFERENCE,
        msg: {
          a: [{a: 'A'}, {b: 'B'}, {c: 'C'}]
        }
      };
      const nextState = form(state, action);
      const expected = {
        reference: {
          a: [{a: 'A'}, {b: 'B'}, {c: 'C'}]
        }
      };
      expect(nextState.toJS()).toEqual(expected);
    });
    it(`should handles ${SET_COLLECTION}`, () => {
      const state = Map();
      const action = {
        type: SET_COLLECTION,
        msg: {
          a: [{a: 'A'}, {b: 'B'}, {c: 'C'}]
        }
      };
      const nextState = form(state, action);
      const expected = {
        collection: {
          a: [{a: 'A'}, {b: 'B'}, {c: 'C'}]
        }
      };
      expect(nextState.toJS()).toEqual(expected);
    });
    it(`should handles ${ADD}`, () => {
      const state = Map();
      const action = {
        type: ADD,
        msg: {id: '_1', a: 'A'}
      };
      const nextState = form(state, action);
      const expected = {
        collection: {
          _1: {id: '_1', a: 'A'}
        }
      };
      expect(nextState.toJS()).toEqual(expected);
    });
    it(`should handles ${REMOVE}`, () => {
      const state = fromJS({
        collection: {
          _1: {id: '_1', a: 'A'},
          _2: {id: '_2', b: 'B'}
        }
      });
      const action = {
        type: REMOVE,
        msg: {id: '_1'}
      };
      const nextState = form(state, action);
      const expected = {
        collection: {
          _2: {id: '_2', b: 'B'}
        }
      };
      expect(nextState.toJS()).toEqual(expected);
    });
    it(`should handles ${MERGE_IN}`, () => {
      const state = fromJS({
        collection: {
          _1: {
            id: '_1',
            a: {
              _1_1: {id: '_1_1', b: 'B'}
            }
          }
        }
      });
      const action = {
        type: MERGE_IN,
        msg: {
          path: ['_1', 'a', '_1_1'],
          value: {c: 'C'}
        }
      };
      const nextState = form(state, action);
      const expected = {
        collection: {
          _1: {
            id: '_1',
            a: {
              _1_1: {id: '_1_1', b: 'B', c: 'C'}
            }
          }
        }
      };
      expect(nextState.toJS()).toEqual(expected);
    });
    it(`should handles ${REMOVE_IN}`, () => {
      const state = fromJS({
        collection: {
          _1: {
            id: '_1',
            a: {
              _1_1: {id: '_1_1', b: 'B', c: 'C'}
            }
          }
        }
      });
      const action = {
        type: REMOVE_IN,
        msg: {
          path: ['_1', 'a', '_1_1', 'b']
        }
      };
      const nextState = form(state, action);
      const expected = {
        collection: {
          _1: {
            id: '_1',
            a: {
              _1_1: {id: '_1_1', c: 'C'}
            }
          }
        }
      };
      expect(nextState.toJS()).toEqual(expected);
    });
    it('should works', () => {
      const actions = [
        {type: SET_REFERENCE, msg: {d: [{a: 'A'}, {b: 'B'}, {c: 'C'}]}},
        {type: SET_COLLECTION, msg: {
          _1: {
            id: '_1',
            a: {
              _1_1: {id: '_1_1', key: '__1__', other: '...'}
            }
          }
        }},
        {type: ADD, msg: {
          id: '_2',
          b: {
            _2_1: {id: '_2_1', key: '__2__', other: '...'}
          }
        }},
        {type: REMOVE, msg: {id: '_1'}},
        {type: MERGE_IN, msg: {
          path: ['_2', 'b', '_2_1'],
          value: {key: '__updated__'}
        }},
        {type: REMOVE_IN, msg: {path: ['_2', 'b', '_2_1', 'other']}}
      ];
      const finalState = actions.reduce(form, Map());
      const expected = {
        reference: {
          d: [{a: 'A'}, {b: 'B'}, {c: 'C'}]
        },
        collection: {
          _2: {
            id: '_2',
            b: {
              _2_1: {id: '_2_1', key: '__updated__'}
            }
          }
        }
      };
      expect(finalState.toJS()).toEqual(expected);
    });
  })
});
