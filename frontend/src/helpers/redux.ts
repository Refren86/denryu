import { AnyAction } from '@reduxjs/toolkit';

const isFetching = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const isAuthFetching = (action: AnyAction) => {
  return action.type.endsWith('auth/pending');
};

const isAuthError = (action: AnyAction) => {
  return action.type.endsWith('auth/rejected');
};

export { isFetching, isError, isAuthFetching, isAuthError };
