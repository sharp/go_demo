import {Map, List, Record, fromJS} from 'immutable';
import randomString from '../utils/randomString';

// Max number of records allowed in store -> list.
export const LIMIT = 20;

// Shape.
// ----------------------------------
export const Model = new Record({
  type: 'default',
  icon: '',
  title: '',
  text: false
});

export const Entry = new Record({
  id: '',
  created_at: Date.now(),
  content: new Model
});

const InitialState = new Record({
  reference: new Map(),
  list: new List()
});

export const initialState = new InitialState;

// Actions types.
// ----------------------------------
export const SET_LIST = 'feed/SET_LIST';
export const ADD = 'feed/ADD';

// Actions.
// ----------------------------------
export const actionSetList =
    msg => ({type: SET_LIST, msg});

export const actionAdd =
    msg => ({type: ADD, msg});

// Methods.
// ----------------------------------

// Even if server side share the same shape, construct each
// entry allow us to get data from externals sources without
// break things.
export const setList =
  (state, value) => {
    const ensureImmutable = fromJS(value);
    return state.set('list',
      new List(ensureImmutable.map(n => {
        return new Entry(n.set('content', new Model(n.get('content'))));
      }))
    );
  };

export const add =
  (state, value) => {
    const entry = new Entry({
      id: randomString(),
      content: new Model(value)
    });

    return state.update('list', new List(),
      list => {
        if (list.size === LIMIT) return list.shift().push(entry);
        return list.push(entry);
      }
    );
  };

// Reducer.
// ----------------------------------
export default function feed(state = initialState, action = {}) {
  if (action.ready === false) return state;

  switch (action.type) {
  case SET_LIST:
    return setList(state, action.msg);
  case ADD:
    return add(state, action.msg);
  default:
    return state;
  }
}
