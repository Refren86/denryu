import { AnyAction } from '@reduxjs/toolkit';

const isFetching = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

export { isFetching };
