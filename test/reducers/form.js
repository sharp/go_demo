import expect from 'expect';
import {Map, List, fromJS} from 'immutable';
import form, {
  FormEntry,
  FieldEntry,
  initialState,
  SET_REFERENCE,
  SET_COLLECTION,
  ADD,
  REMOVE,
  ADD_FIELD,
  REMOVE_FIELD,
  MERGE_IN,
  REMOVE_IN,
  actionSetReference,
  actionSetCollection,
  actionAdd,
  actionRemove,
  actionAddField,
  actionRemoveField,
  actionMergeIn,
  actionRemoveIn,
  setReference,
  setCollection,
  add,
  remove,
  addField,
  removeField,
  mergeIn,
  removeIn,
  extractShapeFromReference,
  defineFieldModelsFromReference
} from '../../src/shared/reducers/form';
import randomString from '../../src/shared/utils/randomString';

const idReg = /^([a-z0-9]{12})$/;
const timeReg = /^([0-9]{13})$/;

// Helpers.
const form_reference_helper = {
  'type-a': {
    type: '*',
    a:{value: 'A'},
    b:{value: 'B'}
  },
  'type-b': {
    type: '*',
    a:{value: 'A'},
    c:{value: 'C'}
  }
};

const form_collection_helper = {
  '_1': {
    id: '_1',
    fields: {
      _1_1: {
        created_at: 1,
        content: {type: 'type-a'}
      },
      _1_2: {
        created_at: 2,
        content: {type: 'type-b'}
      }
    }
  }
};

const state_helper = setCollection(
  setReference(initialState, form_reference_helper),
  form_collection_helper
);

describe('Form', () => {
  describe('Shape', () => {
    it('FieldEntry', () => {
      const result = new FieldEntry();
      expect(result.get('id')).toBe('');
      expect(result.get('formId')).toBe('');
      expect(result.get('required')).toBe(false);
      expect(timeReg.test(result.get('created_at'))).toBe(true);
      expect(Map.isMap(result.get('content'))).toBe(true);
      expect(result.get('content').toObject()).toEqual({});
    });
    it('FormEntry', () => {
      const result = new FormEntry();
      expect(result.get('id')).toBe('');
      expect(result.get('name')).toBe('');
      expect(result.get('description')).toBe(null);
      expect(timeReg.test(result.get('created_at'))).toBe(true);
      expect(Map.isMap(result.get('fields'))).toBe(true);
      expect(Map.isMap(result.get('result'))).toBe(true);
      expect(result.get('fields').toObject()).toEqual({});
      expect(result.get('result').toObject()).toEqual({});
    });
  });
  describe('Utils', () => {
    describe('extractShapeFromReference', () => {
      it('should work', () => {
        const reference = fromJS({
          type: '*',
          a:{value: 'A'},
          b:{value: 'B'}
        });
        const result = extractShapeFromReference(reference, 'entry_type');
        const expected = {
          type: 'entry_type',
          a: 'A',
          b: 'B'
        };
        expect(result.toJS()).toEqual(expected);
      });
    });
    describe('defineFieldModelsFromReference', () => {
      it('should work', () => {
        const reference = fromJS({
          _1: {
            type: '*',
            a:{value: 'A'},
            b:{value: 'B'}
          },
          _2: {
            type: '*',
            a:{value: 'A'},
            c:{value: 'C'}
          }
        });
        const result = defineFieldModelsFromReference(reference);
        const Model_1 = result.get('_1');
        const Model_2 = result.get('_2');
        const model_1 = new Model_1();
        const model_2 = new Model_2();
        expect(model_1.toJS()).toEqual({
          type: '_1',
          a: 'A',
          b: 'B'
        });
        expect(model_2.toJS()).toEqual({
          type: '_2',
          a: 'A',
          c: 'C'
        });
      });
    });
  });
  describe('Methods', () => {
    describe('set -> reference', () => {
      it('should work', () => {
        const state = new Map();
        const v = fromJS({
          _1: {
            type: '*',
            a:{value: 'A'},
            b:{value: 'B'}
          },
          _2: {
            type: '*',
            a:{value: 'A'},
            c:{value: 'C'}
          }
        });
        const nextState = setReference(state, v);
        expect(nextState.getIn(['reference', 'fields'])).toEqual(v);
        expect(nextState.getIn(['reference', 'models', 'fields']).size).toBe(2);
      });
      it('should convert to immutable', () => {
        const state = new Map();
        const v = {
          _1: {
            type: '*',
            a:{value: 'A'},
            b:{value: 'B'}
          },
          _2: {
            type: '*',
            a:{value: 'A'},
            c:{value: 'C'}
          }
        };
        const nextState = setReference(state, v);
        expect(nextState.getIn(['reference', 'fields']).toJS()).toEqual(v);
        expect(nextState.getIn(['reference', 'models', 'fields']).size).toBe(2);
      });
    });
    describe('set -> collection', () => {
      it('should work', () => {
        const state = setReference(new Map(), {
          'type-a': {
            type: '*',
            a:{value: 'A'},
            b:{value: 'B'}
          },
          'type-b': {
            type: '*',
            a:{value: 'A'},
            c:{value: 'C'}
          }
        });
        const v = fromJS({
          '_1': {
            id: '_1',
            fields: {
              _1_1: {
                created_at: 1,
                content: {type: 'type-a'}
              },
              _1_2: {
                created_at: 2,
                content: {type: 'type-b'}
              }
            }
          },
          '_2': {
            id: '_2',
            fields: {
              _2_1: {
                created_at: 3,
                content: {type: 'type-a'}
              },
              _2_2: {
                created_at: 4,
                content: {type: 'type-b'}
              }
            }
          }
        });
        const nextState = setCollection(state, v);
        const expected = {
          _1: {
            id: '_1',
            fields: {
              _1_1: {
                id: '_1_1',
                formId: '_1',
                required: false,
                created_at: 1,
                content: {
                  type: 'type-a',
                  a: 'A',
                  b: 'B'
                }
              },
              _1_2: {
                id: '_1_2',
                formId: '_1',
                required: false,
                created_at: 2,
                content: {
                  type: 'type-b',
                  a: 'A',
                  c: 'C'
                }
              }
            }
          },
          _2: {
            id: '_2',
            fields: {
              _2_1: {
                id: '_2_1',
                formId: '_2',
                required: false,
                created_at: 3,
                content: {
                  type: 'type-a',
                  a: 'A',
                  b: 'B'
                }
              },
              _2_2: {
                id: '_2_2',
                formId: '_2',
                required: false,
                created_at: 4,
                content: {
                  type: 'type-b',
                  a: 'A',
                  c: 'C'
                }
              }
            }
          }
        };
        expect(nextState.get('collection').toJS()).toEqual(expected);
      });
      it('should convert to immutable', () => {
        const state = setReference(new Map(), {
          'type-a': {
            type: '*',
            a:{value: 'A'},
            b:{value: 'B'}
          },
          'type-b': {
            type: '*',
            a:{value: 'A'},
            c:{value: 'C'}
          }
        });
        const v = {
          '_1': {
            id: '_1',
            fields: {
              _1_1: {
                created_at: 1,
                content: {type: 'type-a'}
              },
              _1_2: {
                created_at: 2,
                content: {type: 'type-b'}
              }
            }
          },
          '_2': {
            id: '_2',
            fields: {
              _2_1: {
                created_at: 3,
                content: {type: 'type-a'}
              },
              _2_2: {
                created_at: 4,
                content: {type: 'type-b'}
              }
            }
          }
        };
        const nextState = setCollection(state, v);
        const expected = {
          _1: {
            id: '_1',
            fields: {
              _1_1: {
                id: '_1_1',
                formId: '_1',
                required: false,
                created_at: 1,
                content: {
                  type: 'type-a',
                  a: 'A',
                  b: 'B'
                }
              },
              _1_2: {
                id: '_1_2',
                formId: '_1',
                required: false,
                created_at: 2,
                content: {
                  type: 'type-b',
                  a: 'A',
                  c: 'C'
                }
              }
            }
          },
          _2: {
            id: '_2',
            fields: {
              _2_1: {
                id: '_2_1',
                formId: '_2',
                required: false,
                created_at: 3,
                content: {
                  type: 'type-a',
                  a: 'A',
                  b: 'B'
                }
              },
              _2_2: {
                id: '_2_2',
                formId: '_2',
                required: false,
                created_at: 4,
                content: {
                  type: 'type-b',
                  a: 'A',
                  c: 'C'
                }
              }
            }
          }
        };
        expect(nextState.get('collection').toJS()).toEqual(expected);
      });
    });
    describe('add', () => {
      it('should work', () => {
        const state = new Map();
        const v = fromJS({
          id: '_1',
          name: 'a',
          created_at: 1,
          fields: {}
        });
        const nextState = add(state, v);
        const expected = {
          collection: {
            _1: {
              id: '_1',
              name: 'a',
              description: null,
              created_at: 1,
              fields: {},
              result: {}
            }
          }
        };
        expect(nextState.toJS()).toEqual(expected);
      });
      it('should convert to immutable', () => {
        const state = new Map();
        const v = {
          id: '_1',
          name: 'a',
          created_at: 1
        };
        const nextState = add(state, v);
        const expected = {
          collection: {
            _1: {
              id: '_1',
              name: 'a',
              description: null,
              created_at: 1,
              fields: {},
              result: {}
            }
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
    describe('addField', () => {
      it('should throw if collection do not have required form', () => {
        const state = state_helper;
        expect(() => {
          addField(state, 'fail_id', '*');
        }).toThrow(
          'Form -> collection -> fail_id not found.'
        )
      });
      it('should work', () => {
        const state = state_helper;
        const v = new Map({
          id: '_1_3',
          type: 'type-a',
          a: 'updated_value',
          d: 'will_not_be_keep_by_the_model'
        });
        const nextState = addField(state, '_1', v);
        const result = nextState.getIn(['collection', '_1', 'fields', '_1_3']);
        expect(nextState.getIn(['collection', '_1', 'fields']).size).toBe(3);
        expect(result.get('id')).toBe('_1_3');
        expect(result.get('formId')).toBe('_1');
        expect(result.get('required')).toBe(false);
        expect(timeReg.test(result.get('created_at'))).toBe(true);
        expect(result.get('content').toJS()).toEqual({
          type: 'type-a',
          a: 'updated_value',
          b: 'B'
        });
      });
      it('should convert to immutable', () => {
        const state = state_helper;
        const v = {
          id: '_1_3',
          type: 'type-a',
          a: 'updated_value',
          d: 'will_not_be_keep_by_the_model'
        };
        const nextState = addField(state, '_1', v);
        const result = nextState.getIn(['collection', '_1', 'fields', '_1_3']);
        expect(nextState.getIn(['collection', '_1', 'fields']).size).toBe(3);
        expect(result.get('id')).toBe('_1_3');
        expect(result.get('formId')).toBe('_1');
        expect(result.get('required')).toBe(false);
        expect(timeReg.test(result.get('created_at'))).toBe(true);
        expect(result.get('content').toJS()).toEqual({
          type: 'type-a',
          a: 'updated_value',
          b: 'B'
        });
      });
    });
    describe('removeField', () => {
      it('should work', () => {
        const state = state_helper;
        const nextState = removeField(state, '_1', '_1_1');
        expect(nextState.getIn(['collection', '_1', 'fields']).size).toBe(1);
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
      expect(nextState).toEqual(initialState);
    });
    it('should ignore not ready action', () => {
      const state = Map();
      const action = {
        type: SET_REFERENCE,
        ready: false,
        msg: '*'
      };
      const nextState = form(state, action);
      expect(nextState.toJS()).toEqual({});
    });
    it(`should handles ${SET_REFERENCE}`, () => {
      const state = Map();
      const action = {
        type: SET_REFERENCE,
        msg: {
          _1: {
            type: '*',
            a:{value: 'A'},
            b:{value: 'B'}
          },
          _2: {
            type: '*',
            a:{value: 'A'},
            c:{value: 'C'}
          }
        }
      };
      const nextState = form(state, action);
      expect(nextState.getIn(['reference', 'fields']).toJS()).toEqual(action.msg);
      expect(nextState.getIn(['reference', 'models', 'fields']).size).toBe(2);
    });
    it(`should handles ${SET_COLLECTION}`, () => {
      const state = setReference(new Map(), {
        'type-a': {
          type: '*',
          a:{value: 'A'},
          b:{value: 'B'}
        },
        'type-b': {
          type: '*',
          a:{value: 'A'},
          c:{value: 'C'}
        }
      });
      const action = {
        type: SET_COLLECTION,
        msg: {
          '_1': {
            id: '_1',
            fields: {
              _1_1: {
                created_at: 1,
                content: {type: 'type-a'}
              },
              _1_2: {
                created_at: 2,
                content: {type: 'type-b'}
              }
            }
          },
          '_2': {
            id: '_2',
            fields: {
              _2_1: {
                created_at: 3,
                content: {type: 'type-a'}
              },
              _2_2: {
                created_at: 4,
                content: {type: 'type-b'}
              }
            }
          }
        }
      };
      const nextState = form(state, action);
      const expected = {
        _1: {
          id: '_1',
          fields: {
            _1_1: {
              id: '_1_1',
              formId: '_1',
              required: false,
              created_at: 1,
              content: {
                type: 'type-a',
                a: 'A',
                b: 'B'
              }
            },
            _1_2: {
              id: '_1_2',
              formId: '_1',
              required: false,
              created_at: 2,
              content: {
                type: 'type-b',
                a: 'A',
                c: 'C'
              }
            }
          }
        },
        _2: {
          id: '_2',
          fields: {
            _2_1: {
              id: '_2_1',
              formId: '_2',
              required: false,
              created_at: 3,
              content: {
                type: 'type-a',
                a: 'A',
                b: 'B'
              }
            },
            _2_2: {
              id: '_2_2',
              formId: '_2',
              required: false,
              created_at: 4,
              content: {
                type: 'type-b',
                a: 'A',
                c: 'C'
              }
            }
          }
        }
      };
      expect(nextState.get('collection').toJS()).toEqual(expected);
    });
    it(`should handles ${ADD}`, () => {
      const state = Map();
      const action = {
        type: ADD,
        msg: {
          id: '_1',
          name: 'a',
          created_at: 1
        }
      };
      const nextState = form(state, action);
      const expected = {
        collection: {
          _1: {
            id: '_1',
            name: 'a',
            description: null,
            created_at: 1,
            fields: {},
            result: {}
          }
        }
      };
      expect(nextState.toJS()).toEqual(expected);
    });
    it(`should handles ${ADD_FIELD}`, () => {
      const state = state_helper;
      const action = {
        type: ADD_FIELD,
        msg: {
          id: '_1',
          value: {
            id: '_1_3',
            type: 'type-a',
            a: 'updated_value',
            d: 'will_not_be_keep_by_the_model'
          }
        }
      };
      const nextState = form(state, action);
      const result = nextState.getIn(['collection', '_1', 'fields', '_1_3']);
      expect(nextState.getIn(['collection', '_1', 'fields']).size).toBe(3);
      expect(result.get('id')).toBe('_1_3');
      expect(result.get('formId')).toBe('_1');
      expect(result.get('required')).toBe(false);
      expect(timeReg.test(result.get('created_at'))).toBe(true);
      expect(result.get('content').toJS()).toEqual({
        type: 'type-a',
        a: 'updated_value',
        b: 'B'
      });
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
    it(`should handles ${REMOVE_FIELD}`, () => {
      const state = state_helper;
      const action = {
        type: REMOVE_FIELD,
        msg: {
          formId: '_1',
          fieldId: '_1_1'
        }
      };
      const nextState = form(state, action);
      expect(nextState.getIn(['collection', '_1', 'fields']).size).toBe(1);
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

    // TODO: commented as it's currently broken due to 0.1.2 update.

    //it('should works', () => {
    //  const actions = [
    //    {type: SET_REFERENCE, msg: {d: [{a: 'A'}, {b: 'B'}, {c: 'C'}]}},
    //    {type: SET_COLLECTION, msg: {
    //      _1: {
    //        id: '_1',
    //        a: {
    //          _1_1: {id: '_1_1', key: '__1__', other: '...'}
    //        }
    //      }
    //    }},
    //    {type: ADD, msg: {
    //      id: '_2',
    //      b: {
    //        _2_1: {id: '_2_1', key: '__2__', other: '...'}
    //      }
    //    }},
    //    {type: REMOVE, msg: {id: '_1'}},
    //    {type: MERGE_IN, msg: {
    //      path: ['_2', 'b', '_2_1'],
    //      value: {key: '__updated__'}
    //    }},
    //    {type: REMOVE_IN, msg: {path: ['_2', 'b', '_2_1', 'other']}}
    //  ];
    //  const finalState = actions.reduce(form, Map());
    //  const expected = {
    //    reference: {
    //      d: [{a: 'A'}, {b: 'B'}, {c: 'C'}]
    //    },
    //    collection: {
    //      _2: {
    //        id: '_2',
    //        b: {
    //          _2_1: {id: '_2_1', key: '__updated__'}
    //        }
    //      }
    //    }
    //  };
    //  expect(finalState.toJS()).toEqual(expected);
    //});
  })
});
