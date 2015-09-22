import {List, Record, fromJS} from 'immutable';
import uuid from 'node-uuid';

// Config.
// ----------------------------------
export const Model = new Record({
  id: '',
  date: new Date(),
  type: 'default',
  title: 'Hi !',
  icon: 'messenger',
  msg: false
});

export const INITIAL_STATE = new List();
export const LIMIT = 20;

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
export const setList =
  value => new List(fromJS(value));

export const add =
  (state, value) => {
    const list =
      (state.size === LIMIT)
        ? state.shift()
        : state;
    return list.push(new Model({id: uuid.v4(), value}));
  };

// Utils.
// ----------------------------------
export function hydrate() {
  return new List();
}

// Reducer.
// ----------------------------------
export default function feed(state = INITIAL_STATE, action = {}) {
  if (action.ready === false) return state;

  switch (action.type) {
  case SET_LIST:
    return setList(action.msg);
  case ADD:
    return add(state, action.msg);
  default:
    return state;
  }
}
