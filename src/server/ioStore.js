import Server from 'socket.io';
import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

// Helpers.
// ----------------------------------
const addTags =
  action => ({
    ...action,
    client: true,
    spread: true
  });

const removeTags =
  ({client, spread, ...clean}) => clean; // eslint-disable-line no-unused-vars

const setStore =
  (middlewares, reducers) => {
    const createStoreWithMiddleware =
      applyMiddleware(...middlewares)(createStore);

    return createStoreWithMiddleware(
      combineReducers(reducers)
    );
  };

// Middleware.
// ----------------------------------
const spread = io => store => next => action => { // eslint-disable-line no-unused-vars
  const value = next(action);
  if (action.spread !== true) return value;
  return io.emit('action', removeTags(action));
};

// Store.
// ----------------------------------
const ioStore = (middleware = [], reducers = {}, port = 8090) => {
  const io = new Server().attach(port);

  const store = setStore(
    [
      ...middleware,
      spread(io)
    ],
    reducers
  );

  io.on('connection', socket => {
    socket.emit('hydrate', store.getState());
    socket.on('action', action => store.dispatch(addTags(action)));
  });

  return store;
};

export default ioStore;
