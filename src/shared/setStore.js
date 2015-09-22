import {createStore, combineReducers, applyMiddleware} from 'redux';
import form, {hydrate as hydrateForm} from './reducers/form';
import answer, {hydrate as hydrateAnswer}  from './reducers/answer';
import feed, {hydrate as hydrateFeed}  from './reducers/feed';

const setStore =
  (middlewares = {}) => {
    const createStoreWithMiddleware =
      applyMiddleware(...middlewares)(createStore);

    return createStoreWithMiddleware(
      combineReducers({form, answer, feed}),
      {
        form: hydrateForm(),
        answer: hydrateAnswer(),
        feed: hydrateFeed()
      }
    );
  };

export default setStore;