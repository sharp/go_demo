import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import {
  TYPEFORM_API_KEY
} from './constants';

// Store.
import ioStore from './ioStore';

// Reducers.
import feed, {
  actionSetList as setFeedList
} from './../shared/reducers/feed';
import form, {
  actionSetReference as setFormReference,
  actionSetCollection as sefFormCollection
} from './../shared/reducers/form';

// Utils.
import defineFormReference from './../shared/utils/defineFormReference';

// Middleware.
import handleClientAction from '../shared/middleware/handleClientAction';
import handlePromise from '../shared/middleware/handlePromise';
import logger from '../shared/middleware/logger';

import feedsDB from './fake-db/feeds.json';
import fieldsDB from './fake-db/fields.json';
import formsDB from './fake-db/forms.json';

// TODO: make better warn msg + add typeform link.
const noKey = `
  WARN: You need to set the environment variable TYPEFORM_API_KEY
  for this application to generate forms.
`;

if (TYPEFORM_API_KEY === undefined) {
  console.log(chalk.bold.red(noKey)); // eslint-disable-line no-console
}

// Define a new store w/ middleware & reducers.
const ioPort = 8090;
const store = ioStore([
  logger,
  handleClientAction,
  handlePromise
], {feed, form}, ioPort);

console.log(chalk.bold.green(`ioStore listening at http://localhost:${ioPort}`)); // eslint-disable-line no-console

store.dispatch(setFormReference(defineFormReference(fieldsDB)));
store.dispatch(sefFormCollection(formsDB));
store.dispatch(setFeedList(feedsDB));

const app = express();

// Webpack
// ----------------------------------
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

// Api.
// ----------------------------------
app.use(bodyParser.json());

// Static server.
// ----------------------------------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'shared', 'index.html'));
});

app.listen(3000, 'localhost', err => {
  if (err) {
    console.log(chalk.bold.red(err)); // eslint-disable-line no-console
    return;
  }

  console.log(chalk.bold.green('Listening at http://localhost:3000')); // eslint-disable-line no-console
});
