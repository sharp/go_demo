import chalk from 'chalk';

export const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);

export const vanillaPromise = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action);
  }
  return Promise.resolve(action).then(store.dispatch);
};

export const readyStatePromise = store => next => action => { // eslint-disable-line no-unused-vars
  if (!action.promise) {
    return next(action);
  }
  function makeAction(ready, data) {
    const newAction = Object.assign({}, action, {ready}, data);
    delete newAction.promise;
    return newAction;
  }
  next(makeAction(false));
  return action.promise.then(
      result => next(makeAction(true, {result})),
      error => next(makeAction(true, {error}))
  );
};

export const emitOnRemoteAction = socket => store => next => action => {
  const {remote, ...clean} = action;
  if (remote) {
    socket.emit('action', clean);
  }
  return next(action);
};

/* eslint-disable no-unused-vars, no-console */
export const logger = store => next => action => {
  console.log(chalk.gray('| action -> type ->', action.type));
  const result = next(action);
  // console.log(chalk.gray('next state'), store.getState());
  return result;
};
/* eslint-enable */
