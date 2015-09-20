import {Map, fromJS} from 'immutable';
import ensure from '../utils/ensureEntryIsValidAndImmutable';

export const INITIAL_STATE = new Map();

// Actions types.
// ----------------------------------
export const SET_REFERENCE = 'form/SET_REFERENCE';
export const SET_COLLECTION = 'form/SET_COLLECTION';
export const ADD = 'form/ADD';
export const REMOVE = 'form/REMOVE';
export const MERGE_IN = 'form/MERGE_IN';
export const REMOVE_IN = 'form/REMOVE_IN';

// Actions.
// ----------------------------------
export const actionSetReference =
    msg => ({type: SET_REFERENCE, msg});

export const actionSetCollection =
    msg => ({type: SET_COLLECTION, msg});

export const actionAdd =
    msg => ({type: ADD, msg});

export const actionRemove =
    msg => ({type: REMOVE, msg});

export const actionMergeIn =
  (path, value) => ({type: MERGE_IN, msg: {path, value}});

export const actionRemoveIn =
  (path, value) => ({type: REMOVE_IN, msg: {path, value}});

// Methods.
// ----------------------------------
export const setReference =
  (state, value) => state.set('reference', fromJS(value));

export const setCollection =
  (state, value) => state.set('collection', fromJS(value));

export const add =
  (state, value) => {
    const result = ensure(value);
    return state.update('collection', new Map(),
      current => current.set(result.get('id'), result)
    );
  };

export const remove =
  (state, value) => {
    const ensureImmutable = fromJS(value);
    return state.update('collection', new Map(),
        current => current.delete(ensureImmutable.get('id'))
    );
  };

export const mergeIn =
  (state, path, value) => {
    const ensureImmutable = fromJS(value);
    return state.updateIn(['collection', ...path], new Map(),
      current => current.merge(ensureImmutable)
    );
  };

export const removeIn =
  (state, path) => state.deleteIn(['collection', ...path]);

// Utils.
// ----------------------------------
export function hydrate() {
  return new Map({
    reference: new Map(),
    collection: new Map()
  });
}

// Reducer.
// ----------------------------------
export default function form(state = INITIAL_STATE, action = {}) {
  if (action.ready === false) return state;

  switch (action.type) {
  case SET_REFERENCE:
    return setReference(state, action.msg);
  case SET_COLLECTION:
    return setCollection(state, action.msg);
  case ADD:
    return add(state, action.msg);
  case REMOVE:
    return remove(state, action.msg);
  case MERGE_IN:
    return mergeIn(state, action.msg.path, action.msg.value);
  case REMOVE_IN:
    return removeIn(state, action.msg.path, action.msg.value);
  default:
    return state;
  }
}
