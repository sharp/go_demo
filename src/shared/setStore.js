import {createStore, combineReducers, applyMiddleware} from 'redux';
import form, {hydrate as hydrateForm} from './reducers/form';
import answer, {hydrate as hydrateAnswer}  from './reducers/answer';

const setStore =
  middlewares => {
    const createStoreWithMiddleware =
      applyMiddleware(...middlewares)(createStore);

    return createStoreWithMiddleware(
      combineReducers({form, answer}),
      {
        form: hydrateForm(),
        answer: hydrateAnswer()
      }
    );
  };

export default setStore;
