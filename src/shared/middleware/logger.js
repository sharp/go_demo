import chalk from 'chalk';

/* eslint-disable no-unused-vars, no-console, spaced-comment */
const logger = store => next => action => {
  console.log(chalk.gray('| action -> type ->', action.type));
  const result = next(action);
  //console.log(chalk.gray('next state'), store.getState());
  return result;
};

export default logger;
