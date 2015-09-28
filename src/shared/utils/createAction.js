const identity = a => a;

const createAction = (action, creator) => {
  const finalCreator =
    typeof creator === 'function'
      ? creator
      : identity;

  return (...args) => {
    const {client, msg, ...other} = action;

    const newAction = {
      ...other,
      msg: {
        ...msg,
        result: finalCreator(...args)
      }
    };

    return newAction;
  };
};

export default createAction;
