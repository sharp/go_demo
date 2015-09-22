import {
  UPDATE
} from './actionTypes';

const REMOTE = {remote: true};
const CREATE = {create: true};

// Server
export const update =
  msg => ({
    type: UPDATE,
    ...msg,
    ...REMOTE,
    ...CREATE
  });
