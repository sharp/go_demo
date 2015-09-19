import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import createIoServer from './io';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';

createIoServer();

const app = express();

// Webpack
// ----------------------------------
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

  console.log(chalk.bold.black('Listening at http://localhost:3000')); // eslint-disable-line no-console
});
