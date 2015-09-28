const emitClientAction = socket => store => next => action => { // eslint-disable-line no-unused-vars
  const {msg: {send}} = action;
  if (send === true) {
    // TODO: REMOVE THIS.
    action.msg.send = false;
    socket.emit('action', action);
  }
  return next(action);
};

export default emitClientAction;
