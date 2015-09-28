export const isPromise =
  value => value && typeof value.then === 'function';

const handlePromise =
  ({dispatch}) => next => action => {
    if (action.msg && !isPromise(action.msg.result)) {
      return next(action);
    }

    // Inform following middleware about the pending action.
    // This will not update the store.
    next({
      type: '@@typeform-builder/PENDING'
    });

    return action.msg && action.msg.result
      .then(
        // TODO: handle result -> status.
        result => result.json(),
        error => dispatch({ ...action, msg: error, error: true })
      )
      .then(
        json => {
          const {msg, ...other} = action;

          return dispatch({
            ...other,
            msg: {
              ...msg,
              result: json
            }
          });
        }
      );
  };

export default handlePromise;
