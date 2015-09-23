import {
  UPDATE
} from './actionTypes';

const CLIENT = {client: true};
const SPREAD = {spread: true};

// Server
export const update =
  msg => ({
    type: UPDATE,
    ...msg,
    ...CLIENT,
    ...SPREAD
  });
