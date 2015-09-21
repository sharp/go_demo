import Server from 'socket.io';
import fetch from 'node-fetch';
import chalk from 'chalk';
import setStore from '../shared/setStore';
import {
  actionSetReference as setFormReference,
  actionSetCollection as setFormCollection
} from '../shared/reducers/form';
import {
  actionSetReference as setAnswerReference,
  actionSetCollection as setAnswerCollection
} from '../shared/reducers/answer';
import {
  thunk,
  vanillaPromise,
  readyStatePromise,
  logger
} from '../shared/middlewares';
import {
  TYPEFORM_API_KEY,
  apiVersion,
  submitEndpoint
} from './constants';

const spreadIo = io => store => next => action => { // eslint-disable-line no-unused-vars
  return next(action);
};

// TODO: make better warn msg + add typeform link.
const noKey = `
  WARN: You need to set the environment variable TYPEFORM_API_KEY
  for this application to see forms previews.
`;

export default function createIoServer() {
  if (TYPEFORM_API_KEY === undefined) {
    console.log(chalk.bold.red(noKey)); // eslint-disable-line no-console
  }

  // TODO: check key validity using typeform api.

  const io = new Server().attach(8090);
  console.log(chalk.bold.black('IO listening at http://localhost:8090')); // eslint-disable-line no-console

  // Build a new store.
  const store = setStore([
    thunk,
    vanillaPromise,
    readyStatePromise,
    spreadIo(io),
    logger
  ]);
  const fieldReference = require('./fake-db/fields.json');
  const formCollection = require('./fake-db/forms.json');
  store.dispatch(setFormReference(fieldReference));
  store.dispatch(setFormCollection(formCollection));

  // store <-> io.
  // ----------------------------------

  // Listen to store change and dispatch update using io.
  store.subscribe(() => {
    console.log(chalk.gray('store -> update')); // eslint-disable-line no-console

    // TODO: fine tuning io.emit(s)
    return io.emit('state', store.getState());
  });

  // Handle new connection.
  io.on('connection', socket => {
    // Send initial state to remote app.
    socket.emit('state', store.getState());
  });
}
