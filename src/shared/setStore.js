import {createStore, combineReducers, applyMiddleware} from 'redux';

const setStore = (middlewares = [], reducers = {}) => {
  const createStoreWithMiddleware =
    applyMiddleware(...middlewares)(createStore);

  return createStoreWithMiddleware(
    combineReducers(reducers)
  );
};

export default setStore;
