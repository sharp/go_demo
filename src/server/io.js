import Server from 'socket.io';
import fetch from 'node-fetch';
import chalk from 'chalk';
import localtunnel from 'localtunnel';
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
  actionSetList as setFeedList
} from '../shared/reducers/feed';
import {
  thunk,
  vanillaPromise,
  readyStatePromise,
  spreadIo,
  logger
} from '../shared/middlewares';
import {
  TYPEFORM_API_KEY,
  apiVersion,
  submitEndpoint
} from './constants';

let publicUrl = '';

export const formSchema = action => {
  const {fields} = action.msg.value;
  return {
    title: action.msg.value.name,
    webhook_submit_url: publicUrl + submitEndpoint,
    fields: Object.keys(fields).map(current => {
      const {id, formId, name, ...clean} = fields[current];
      return clean;
    })
  };
};

export const fetchForm = schema => {
  return fetch(`https://api.typeform.io/${apiVersion}/forms`, {
    method: 'POST',
    headers: {
      'X-API-TOKEN': TYPEFORM_API_KEY
    },
    body: JSON.stringify(schema)
  }).then(response => response.json());
};

export const handleRemoteAction = action => {
  if (TYPEFORM_API_KEY === undefined) return action;
  if (action.create) {
    const value = formSchema(action);
    return {
      ...action,
      promise: fetchForm(value).then(res => res)
    };
  }

  return action;
};

// TODO: make better warn msg + add typeform link.
const noKey = `
  WARN: You need to set the environment variable TYPEFORM_API_KEY
  for this application to generate forms.
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

  // Set states.
  const fieldReference = require('./fake-db/fields.json');
  const formCollection = require('./fake-db/forms.json');
  const feedCollection = require('./fake-db/feeds.json');
  store.dispatch(setFormReference(fieldReference));
  store.dispatch(setFormCollection(formCollection));
  store.dispatch(setFeedList(feedCollection));

  // Handle new connection.
  io.on('connection', socket => {
    // Send initial state to remote app.
    socket.emit('state', store.getState());

    // Dispatch remote action throw local store.
    socket.on('action', action => store.dispatch(handleRemoteAction(action)));
  });
}

localtunnel(3000, (err, tunnel) => {
  if (err) {
    throw new Error(err);
  }
  publicUrl = tunnel.url;
});
