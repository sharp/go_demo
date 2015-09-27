const identity = a => a;

const createAction = (type, creator) => {
  const finalCreator =
    typeof creator === 'function'
      ? creator
      : identity;

  return (...args) => {
    const action = {
      type,
      payload: finalCreator(...args)
    };

    return action;
  };
};

export default createAction;
